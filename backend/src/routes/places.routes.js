const express = require("express");
const { pool } = require("../config/db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      division = "",
      district = "",
      category = "",
      limit,
    } = req.query;

    let sql = `
      SELECT
        id, name, division, district, category, description,
        image_url AS image, rating, best_time AS bestTime,
        entry_fee AS entryFee, parking, food, accommodation,
        getting_there AS gettingThere, created_at AS createdAt
      FROM places
      WHERE 1 = 1
    `;

    const params = [];

    if (search) {
      sql += " AND (name LIKE ? OR description LIKE ? OR category LIKE ?)";
      const wildcard = `%${search}%`;
      params.push(wildcard, wildcard, wildcard);
    }

    if (division) {
      sql += " AND division = ?";
      params.push(division);
    }

    if (district) {
      sql += " AND district = ?";
      params.push(district);
    }

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    sql += " ORDER BY rating DESC, name ASC";

    if (limit) {
      sql += " LIMIT ?";
      params.push(Number(limit));
    }

    const [rows] = await pool.query(sql, params);
    return res.json({ count: rows.length, places: rows });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load places", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT
        id, name, division, district, category, description,
        image_url AS image, rating, best_time AS bestTime,
        entry_fee AS entryFee, parking, food, accommodation,
        getting_there AS gettingThere, created_at AS createdAt
      FROM places
      WHERE id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Place not found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load place", error: error.message });
  }
});

router.get("/:id/blogs", async (req, res) => {
  try {
    const { id } = req.params;

    const [blogs] = await pool.query(
      `SELECT
        b.id,
        b.place_id AS placeId,
        p.name AS placeName,
        b.user_id AS userId,
        u.name AS author,
        u.avatar_url AS authorAvatar,
        b.title,
        b.content,
        b.rating,
        b.created_at AS date
      FROM blogs b
      INNER JOIN users u ON u.id = b.user_id
      INNER JOIN places p ON p.id = b.place_id
      WHERE b.place_id = ?
      ORDER BY b.created_at DESC`,
      [id],
    );

    return res.json({ count: blogs.length, blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to load blogs", error: error.message });
  }
});

router.post("/:id/blogs", requireAuth, async (req, res) => {
  try {
    const placeId = Number(req.params.id);
    const { title, content, rating } = req.body;

    if (!title || !content || !rating) {
      return res
        .status(400)
        .json({ message: "title, content and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "rating must be between 1 and 5" });
    }

    const [places] = await pool.query("SELECT id FROM places WHERE id = ?", [
      placeId,
    ]);

    if (places.length === 0) {
      return res.status(404).json({ message: "Place not found" });
    }

    const [result] = await pool.query(
      `INSERT INTO blogs (place_id, user_id, title, content, rating)
       VALUES (?, ?, ?, ?, ?)`,
      [placeId, req.user.id, title, content, rating],
    );

    const [rows] = await pool.query(
      `SELECT
        b.id,
        b.place_id AS placeId,
        p.name AS placeName,
        b.user_id AS userId,
        u.name AS author,
        u.avatar_url AS authorAvatar,
        b.title,
        b.content,
        b.rating,
        b.created_at AS date
      FROM blogs b
      INNER JOIN users u ON u.id = b.user_id
      INNER JOIN places p ON p.id = b.place_id
      WHERE b.id = ?`,
      [result.insertId],
    );

    return res.status(201).json({ message: "Blog created", blog: rows[0] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create blog", error: error.message });
  }
});

module.exports = router;
