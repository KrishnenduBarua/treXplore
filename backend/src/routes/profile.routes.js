const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { pool } = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const uploadsDir = path.join(__dirname, "..", "uploads", "avatars");
fs.mkdirSync(uploadsDir, { recursive: true });

const avatarUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname || "").toLowerCase();
      const safeExtension = extension || ".jpg";
      cb(null, `avatar-${req.user.id}-${Date.now()}${safeExtension}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed"));
  },
});

router.use(requireAuth);

router.post("/avatar", avatarUpload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Avatar image is required" });
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;

    await pool.query("UPDATE users SET avatar_url = ? WHERE id = ?", [
      avatarUrl,
      req.user.id,
    ]);

    const [rows] = await pool.query(
      `SELECT id, name, email, phone, avatar_url AS avatarUrl, bio, location, created_at AS createdAt
       FROM users
       WHERE id = ?`,
      [req.user.id],
    );

    return res.json({ message: "Avatar updated", user: rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to upload avatar", error: error.message });
  }
});

router.get("/me", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, avatar_url AS avatarUrl, bio, location, created_at AS createdAt
       FROM users
       WHERE id = ?`,
      [req.user.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load profile", error: error.message });
  }
});

router.put("/me", async (req, res) => {
  try {
    const { name, phone, bio, location, avatarUrl } = req.body;

    await pool.query(
      `UPDATE users
       SET name = COALESCE(?, name),
           phone = COALESCE(?, phone),
           bio = COALESCE(?, bio),
           location = COALESCE(?, location),
           avatar_url = COALESCE(?, avatar_url)
       WHERE id = ?`,
      [name, phone, bio, location, avatarUrl, req.user.id],
    );

    const [rows] = await pool.query(
      `SELECT id, name, email, phone, avatar_url AS avatarUrl, bio, location, created_at AS createdAt
       FROM users
       WHERE id = ?`,
      [req.user.id],
    );

    return res.json({ message: "Profile updated", user: rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
});

router.put("/password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "currentPassword and newPassword are required" });
    }

    const [rows] = await pool.query(
      "SELECT password_hash FROM users WHERE id = ?",
      [req.user.id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const ok = await bcrypt.compare(currentPassword, rows[0].password_hash);

    if (!ok) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const nextHash = await bcrypt.hash(newPassword, 10);

    await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [
      nextHash,
      req.user.id,
    ]);

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update password", error: error.message });
  }
});

router.get("/blogs", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        b.id,
        b.place_id AS placeId,
        p.name AS placeName,
        b.title,
        b.content,
        b.rating,
        b.created_at AS date
      FROM blogs b
      INNER JOIN places p ON p.id = b.place_id
      WHERE b.user_id = ?
      ORDER BY b.created_at DESC`,
      [req.user.id],
    );

    return res.json({ count: rows.length, blogs: rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load user blogs", error: error.message });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        p.id, p.name, p.division, p.district, p.category, p.description,
        p.image_url AS image, p.rating, p.best_time AS bestTime,
        p.entry_fee AS entryFee, p.parking, p.food, p.accommodation,
        p.getting_there AS gettingThere,
        f.created_at AS favoriteAt
      FROM favorites f
      INNER JOIN places p ON p.id = f.place_id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC`,
      [req.user.id],
    );

    return res.json({ count: rows.length, favorites: rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load favorites", error: error.message });
  }
});

router.post("/favorites/:placeId", async (req, res) => {
  try {
    const placeId = Number(req.params.placeId);

    const [placeRows] = await pool.query("SELECT id FROM places WHERE id = ?", [
      placeId,
    ]);

    if (placeRows.length === 0) {
      return res.status(404).json({ message: "Place not found" });
    }

    await pool.query(
      `INSERT INTO favorites (user_id, place_id)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE place_id = VALUES(place_id)`,
      [req.user.id, placeId],
    );

    return res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add favorite", error: error.message });
  }
});

router.delete("/favorites/:placeId", async (req, res) => {
  try {
    const placeId = Number(req.params.placeId);

    const [result] = await pool.query(
      "DELETE FROM favorites WHERE user_id = ? AND place_id = ?",
      [req.user.id, placeId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.json({ message: "Favorite removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to remove favorite", error: error.message });
  }
});

module.exports = router;
