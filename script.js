// Main JavaScript file for TreXplore

const API_BASE_URL =
  window.TREXPLORE_API_BASE_URL || "http://localhost:5000/api";
const STORAGE_TOKEN_KEY = "trexplore_token";
const STORAGE_USER_KEY = "trexplore_user";

let currentUser = null;
let currentPlaceId = null;
let allPlaces = [];
let filteredPlaces = [];

function getStaticPlaces() {
  return typeof placesData !== "undefined" ? placesData : [];
}

function getStaticBlogs() {
  return typeof blogsData !== "undefined" ? blogsData : [];
}

function getDistrictMap() {
  return typeof districtData !== "undefined" ? districtData : {};
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildAvatarUrl(name, background = "4f46e5") {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "User",
  )}&background=${background.replace("#", "")}&color=fff`;
}

function getStoredToken() {
  return localStorage.getItem(STORAGE_TOKEN_KEY);
}

function getStoredUser() {
  const rawUser = localStorage.getItem(STORAGE_USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

function setSession(session) {
  if (!session) return;

  if (session.token) {
    localStorage.setItem(STORAGE_TOKEN_KEY, session.token);
  }

  if (session.user) {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(session.user));
    currentUser = session.user;
  }

  refreshNavigationAuthState();
}

function clearSession() {
  localStorage.removeItem(STORAGE_TOKEN_KEY);
  localStorage.removeItem(STORAGE_USER_KEY);
  currentUser = null;
  refreshNavigationAuthState();
}

function isAuthenticated() {
  return Boolean(getStoredToken());
}

function getPageName() {
  const path = window.location.pathname;
  return path.substring(path.lastIndexOf("/") + 1) || "index.html";
}

function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect") || "profile.html";
}

function getPlaceIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = Number.parseInt(urlParams.get("id"), 10);
  return Number.isNaN(placeId) ? null : placeId;
}

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  console.log(`[API Request] ${options.method || "GET"} ${url}`);

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      ...(options.auth === false
        ? {}
        : getStoredToken()
          ? { Authorization: `Bearer ${getStoredToken()}` }
          : {}),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    body: options.body,
  });

  console.log(`[API Response] ${response.status} ${response.statusText}`);

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const errorMessage =
      payload && typeof payload === "object" && payload.message
        ? payload.message
        : response.statusText || "Request failed";
    console.error(`[API Error] ${errorMessage}`);
    throw new Error(errorMessage);
  }

  console.log(`[API Data] Received:`, payload);
  return payload;
}

async function fetchPlaces(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/places${query ? `?${query}` : ""}`, {
    auth: false,
  });

  return Array.isArray(response.places) ? response.places : [];
}

async function fetchPlaceById(placeId) {
  try {
    return await apiRequest(`/places/${placeId}`, { auth: false });
  } catch {
    return (
      getStaticPlaces().find((place) => Number(place.id) === Number(placeId)) ||
      null
    );
  }
}

async function ensurePlacesCache() {
  if (allPlaces.length > 0) {
    return allPlaces;
  }

  try {
    console.log("[API] Fetching places from:", API_BASE_URL);
    allPlaces = await fetchPlaces({ limit: 1000 });
    console.log("[API] ✅ Places loaded from API:", allPlaces.length, "places");
  } catch (error) {
    console.error(
      "[API] ❌ Failed to fetch from API, falling back to demo data:",
      error,
    );
    allPlaces = [...getStaticPlaces()];
  }

  filteredPlaces = [...allPlaces];
  return allPlaces;
}

function updateNavigationAuthState() {
  const loginLinks = document.querySelectorAll(".btn-login");
  const token = getStoredToken();

  loginLinks.forEach((link) => {
    if (token) {
      link.textContent = "Logout";
      link.href = "#";
      link.dataset.authAction = "logout";
    } else {
      link.textContent = "Login";
      link.href = "login.html";
      delete link.dataset.authAction;
    }
  });
}

function refreshNavigationAuthState() {
  updateNavigationAuthState();
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  currentUser = getStoredUser();
  initNavigation();
  refreshNavigationAuthState();
  void initPage();
});

// ===== NAVIGATION =====
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  document.querySelectorAll(".btn-login").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.authAction === "logout") {
        event.preventDefault();
        logoutUser();
      }
    });
  });
}

function logoutUser() {
  clearSession();
  window.location.href = "login.html";
}

// ===== PAGE-SPECIFIC INITIALIZATION =====
async function initPage() {
  const page = getPageName();

  switch (page) {
    case "index.html":
    case "":
      await initHomePage();
      break;
    case "places.html":
      await initPlacesPage();
      break;
    case "place-detail.html":
      await initPlaceDetailPage();
      break;
    case "profile.html":
      await initProfilePage();
      break;
    case "login.html":
      initLoginPage();
      break;
  }
}

// ===== HOME PAGE =====
async function initHomePage() {
  await ensurePlacesCache();
  initHeroSlideshow();
  await loadFeaturedPlaces();
  initHomeSearch();
  initDivisionFilters();
}

function initHeroSlideshow() {
  const slideA = document.getElementById("heroSlideA");
  const slideB = document.getElementById("heroSlideB");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");

  if (!slideA || !slideB || !prevBtn || !nextBtn) return;

  const wallpaperSource = allPlaces.length ? allPlaces : getStaticPlaces();
  const wallpapers = wallpaperSource
    .map((place) => place.image || place.image_url)
    .filter((image) => typeof image === "string" && image.trim() !== "");

  if (!wallpapers.length) return;

  const slides = [slideA, slideB];
  let currentSlideIndex = 0;
  let currentWallpaperIndex = 0;

  slideA.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
  slideA.classList.add("active");

  function changeWallpaper(direction) {
    const nextWallpaperIndex =
      (currentWallpaperIndex + direction + wallpapers.length) %
      wallpapers.length;
    const nextSlideIndex = currentSlideIndex === 0 ? 1 : 0;
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[nextSlideIndex];

    nextSlide.style.backgroundImage = `url('${wallpapers[nextWallpaperIndex]}')`;
    nextSlide.classList.add("active");
    currentSlide.classList.remove("active");

    currentWallpaperIndex = nextWallpaperIndex;
    currentSlideIndex = nextSlideIndex;
  }

  prevBtn.addEventListener("click", () => changeWallpaper(-1));
  nextBtn.addEventListener("click", () => changeWallpaper(1));
}

async function loadFeaturedPlaces() {
  const container = document.getElementById("featuredPlaces");
  if (!container) return;

  const featured = (allPlaces.length ? allPlaces : getStaticPlaces()).slice(
    0,
    6,
  );
  container.innerHTML = featured
    .map((place) => createPlaceCard(place))
    .join("");
}

function initHomeSearch() {
  const searchBtn = document.querySelector(".btn-search");
  const searchInput = document.getElementById("heroSearch");

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `places.html?search=${encodeURIComponent(query)}`;
      }
    });

    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        searchBtn.click();
      }
    });
  }
}

function initDivisionFilters() {
  const filterCards = document.querySelectorAll(".filter-card");
  filterCards.forEach((card) => {
    card.addEventListener("click", () => {
      const division = card.dataset.division;
      window.location.href = `places.html?division=${encodeURIComponent(division)}`;
    });
  });
}

// ===== PLACES PAGE =====
async function initPlacesPage() {
  await ensurePlacesCache();
  initPlacesSearch();
  initPlacesFilters();
  await applyURLFilters();
}

function loadAllPlaces() {
  const container = document.getElementById("placesGrid");
  if (!container) return;

  displayPlaces(filteredPlaces.length ? filteredPlaces : allPlaces);
}

function displayPlaces(places) {
  const container = document.getElementById("placesGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");

  if (!container || !noResults || !resultsCount) return;

  if (places.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    resultsCount.textContent = "No places found";
    return;
  }

  container.innerHTML = places.map((place) => createPlaceCard(place)).join("");
  noResults.style.display = "none";
  resultsCount.textContent = `Showing ${places.length} place${places.length > 1 ? "s" : ""}`;
}

function createPlaceCard(place) {
  const description = String(place.description || "");
  const image = place.image || place.image_url || "";
  return `
        <div class="place-card" onclick="goToPlaceDetail(${Number(place.id)})">
            <div class="place-image">
                <img src="${escapeHtml(image)}" alt="${escapeHtml(place.name)}">
                <span class="place-badge">${escapeHtml(place.category)}</span>
            </div>
            <div class="place-content">
                <h3>${escapeHtml(place.name)}</h3>
                <p class="place-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${escapeHtml(place.district)}, ${escapeHtml(place.division)}
                </p>
                <p class="place-description">${escapeHtml(description.substring(0, 100))}...</p>
            </div>
        </div>
    `;
}

function goToPlaceDetail(placeId) {
  window.location.href = `place-detail.html?id=${placeId}`;
}

function initPlacesSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".btn-search");

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      void applyFilters();
    });
    searchInput.addEventListener("input", () => {
      void applyFilters();
    });
  }
}

function initPlacesFilters() {
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");
  const resetBtn = document.getElementById("resetFilters");

  if (divisionFilter) {
    divisionFilter.addEventListener("change", () => {
      updateDistrictFilter();
      void applyFilters();
    });
  }

  if (districtFilter) {
    districtFilter.addEventListener("change", () => {
      void applyFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }
}

function updateDistrictFilter() {
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");
  if (!divisionFilter || !districtFilter) return;

  const selectedDivision = divisionFilter.value;
  const districts = getDistrictMap();

  districtFilter.innerHTML = '<option value="">All Districts</option>';

  if (selectedDivision && districts[selectedDivision]) {
    districts[selectedDivision].forEach((district) => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtFilter.appendChild(option);
    });
    districtFilter.disabled = false;
  } else {
    districtFilter.disabled = true;
  }
}

async function applyFilters() {
  await ensurePlacesCache();

  const searchInput = document.getElementById("searchInput");
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");

  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedDivision = divisionFilter ? divisionFilter.value : "";
  const selectedDistrict = districtFilter ? districtFilter.value : "";

  filteredPlaces = (allPlaces.length ? allPlaces : getStaticPlaces()).filter(
    (place) => {
      const name = String(place.name || "").toLowerCase();
      const description = String(place.description || "").toLowerCase();
      const category = String(place.category || "").toLowerCase();

      const matchesSearch =
        !searchTerm ||
        name.includes(searchTerm) ||
        description.includes(searchTerm) ||
        category.includes(searchTerm);

      const matchesDivision =
        !selectedDivision || place.division === selectedDivision;
      const matchesDistrict =
        !selectedDistrict || place.district === selectedDistrict;

      return matchesSearch && matchesDivision && matchesDistrict;
    },
  );

  displayPlaces(filteredPlaces);
}

function resetFilters() {
  const searchInput = document.getElementById("searchInput");
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");

  if (searchInput) searchInput.value = "";
  if (divisionFilter) divisionFilter.value = "";
  if (districtFilter) {
    districtFilter.value = "";
    districtFilter.disabled = true;
  }

  filteredPlaces = [...(allPlaces.length ? allPlaces : getStaticPlaces())];
  displayPlaces(filteredPlaces);
}

async function applyURLFilters() {
  await ensurePlacesCache();

  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  const division = urlParams.get("division");
  const district = urlParams.get("district");

  const searchInput = document.getElementById("searchInput");
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");

  if (searchInput && search) {
    searchInput.value = search;
  }

  if (divisionFilter && division) {
    divisionFilter.value = division;
    updateDistrictFilter();
  }

  if (districtFilter && district) {
    districtFilter.value = district;
  }

  if (search || division || district) {
    await applyFilters();
  } else {
    filteredPlaces = [...allPlaces];
    displayPlaces(filteredPlaces);
  }
}

// ===== PLACE DETAIL PAGE =====
async function initPlaceDetailPage() {
  currentPlaceId = getPlaceIdFromUrl();
  await loadPlaceDetails();
  initBlogForm();
}

async function loadPlaceDetails() {
  if (!currentPlaceId) {
    const placeName = document.getElementById("placeName");
    if (placeName) placeName.textContent = "Place not found";
    return;
  }

  const place = await fetchPlaceById(currentPlaceId);

  if (!place) {
    const placeName = document.getElementById("placeName");
    if (placeName) placeName.textContent = "Place not found";
    return;
  }

  document.getElementById("placeName").textContent = place.name || "";
  document.getElementById("placeLocation").textContent =
    `${place.district || ""}, ${place.division || ""}`;
  document.getElementById("placeRating").textContent = place.rating ?? "4.5";

  const hero = document.getElementById("placeHero");
  const imageUrl = place.image || place.image_url || "";
  if (hero && imageUrl) {
    hero.style.background = `url('${imageUrl}') center/cover`;
  }

  document.getElementById("placeDescription").textContent =
    place.description || "";
  document.getElementById("placeDivision").textContent = place.division || "";
  document.getElementById("placeDistrict").textContent = place.district || "";
  document.getElementById("placeCategory").textContent = place.category || "";
  document.getElementById("placeBestTime").textContent = place.bestTime || "";

  document.getElementById("entryFee").textContent = place.entryFee || "";
  document.getElementById("parking").textContent = place.parking || "";
  document.getElementById("food").textContent = place.food || "";
  document.getElementById("accommodation").textContent =
    place.accommodation || "";
  document.getElementById("gettingThere").textContent =
    place.gettingThere || "";

  await loadPlaceBlogs(currentPlaceId);
}

async function loadPlaceBlogs(placeId) {
  const blogsList = document.getElementById("blogsList");
  if (!blogsList) return;

  try {
    const response = await apiRequest(`/places/${placeId}/blogs`, {
      auth: false,
    });
    const placeBlogs = Array.isArray(response.blogs) ? response.blogs : [];

    if (placeBlogs.length === 0) {
      blogsList.innerHTML =
        '<p style="color: var(--text-light); text-align: center;">No blogs yet. Be the first to share your experience!</p>';
      return;
    }

    blogsList.innerHTML = placeBlogs
      .map(
        (blog) => `
          <div class="blog-item">
              <div class="blog-author">
                  <img src="${escapeHtml(blog.authorAvatar || buildAvatarUrl(blog.author))}" alt="${escapeHtml(blog.author)}">
                  <div>
                      <h4>${escapeHtml(blog.author)}</h4>
                      <span style="color: var(--text-light); font-size: 0.9rem;">${formatDate(blog.date)}</span>
                  </div>
              </div>
              <h3>${escapeHtml(blog.title)}</h3>
              <p>${escapeHtml(blog.content)}</p>
              <div class="blog-meta">
                  <span><i class="fas fa-star" style="color: #fbbf24;"></i> ${escapeHtml(blog.rating)}</span>
              </div>
          </div>
      `,
      )
      .join("");
  } catch {
    const fallbackBlogs = getStaticBlogs().filter(
      (blog) => Number(blog.placeId) === Number(placeId),
    );

    if (fallbackBlogs.length === 0) {
      blogsList.innerHTML =
        '<p style="color: var(--text-light); text-align: center;">No blogs yet. Be the first to share your experience!</p>';
      return;
    }

    blogsList.innerHTML = fallbackBlogs
      .map(
        (blog) => `
          <div class="blog-item">
              <div class="blog-author">
                  <img src="${escapeHtml(blog.authorAvatar || buildAvatarUrl(blog.author))}" alt="${escapeHtml(blog.author)}">
                  <div>
                      <h4>${escapeHtml(blog.author)}</h4>
                      <span style="color: var(--text-light); font-size: 0.9rem;">${formatDate(blog.date)}</span>
                  </div>
              </div>
              <h3>${escapeHtml(blog.title)}</h3>
              <p>${escapeHtml(blog.content)}</p>
              <div class="blog-meta">
                  <span><i class="fas fa-star" style="color: #fbbf24;"></i> ${escapeHtml(blog.rating)}</span>
              </div>
          </div>
      `,
      )
      .join("");
  }
}

function initBlogForm() {
  const writeBlogBtn = document.getElementById("writeBlogBtn");
  const blogForm = document.getElementById("blogForm");
  const cancelBtn = document.getElementById("cancelBlogBtn");
  const submitForm = document.getElementById("blogSubmitForm");
  const stars = document.querySelectorAll(".star-rating i");

  let selectedRating = 0;

  if (writeBlogBtn && blogForm) {
    writeBlogBtn.addEventListener("click", () => {
      if (!isAuthenticated()) {
        window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
      }

      blogForm.style.display = "block";
      blogForm.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (cancelBtn && blogForm && submitForm) {
    cancelBtn.addEventListener("click", () => {
      blogForm.style.display = "none";
      submitForm.reset();
      selectedRating = 0;
      stars.forEach((star) => star.classList.remove("active"));
    });
  }

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = Number.parseInt(star.dataset.rating, 10);
      stars.forEach((item) => {
        if (Number.parseInt(item.dataset.rating, 10) <= selectedRating) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  });

  if (submitForm) {
    submitForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!currentPlaceId) {
        alert("Place not found");
        return;
      }

      if (selectedRating === 0) {
        alert("Please select a rating");
        return;
      }

      const title = document.getElementById("blogTitle").value.trim();
      const content = document.getElementById("blogContent").value.trim();

      if (!title || !content) {
        alert("Please complete the blog form");
        return;
      }

      try {
        await apiRequest(`/places/${currentPlaceId}/blogs`, {
          method: "POST",
          body: JSON.stringify({
            title,
            content,
            rating: selectedRating,
          }),
        });

        await loadPlaceBlogs(currentPlaceId);
        alert("Blog posted successfully!");
        blogForm.style.display = "none";
        submitForm.reset();
        selectedRating = 0;
        stars.forEach((item) => item.classList.remove("active"));
      } catch (error) {
        alert(error.message || "Failed to post blog");
      }
    });
  }
}

function formatDate(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return String(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function resolveAvatarFromUser(user) {
  return (
    user?.avatarUrl ||
    user?.avatar_url ||
    buildAvatarUrl(user?.name || user?.email)
  );
}

function applyAvatarPreview(urlValue) {
  const profileAvatar = document.getElementById("profileAvatar");
  if (!profileAvatar) return;

  profileAvatar.src =
    urlValue ||
    buildAvatarUrl(currentUser?.name || currentUser?.email || "User");
}

async function uploadAvatarFromGallery(file) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Please select an image smaller than 5MB.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
      method: "POST",
      headers: {
        ...(getStoredToken()
          ? { Authorization: `Bearer ${getStoredToken()}` }
          : {}),
      },
      body: formData,
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || "Failed to upload avatar");
    }

    currentUser = payload.user;
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));
    applyAvatarPreview(resolveAvatarFromUser(currentUser));
    alert("Avatar updated successfully!");
  } catch (error) {
    alert(error.message || "Failed to upload avatar");
  }
}

// ===== PROFILE PAGE =====
async function initProfilePage() {
  if (!isAuthenticated()) {
    window.location.href = `login.html?redirect=${encodeURIComponent("profile.html")}`;
    return;
  }

  initProfileTabs();
  initProfileForms();
  await loadProfileData();
  await loadUserBlogs();
  await loadFavoritePlaces();
}

async function loadProfileData() {
  try {
    currentUser = await apiRequest("/profile/me");
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const profileAvatar = document.getElementById("profileAvatar");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const location = document.getElementById("location");
    const bio = document.getElementById("bio");
    const resolvedAvatar = resolveAvatarFromUser(currentUser);

    if (profileName) profileName.textContent = currentUser.name || "";
    if (profileEmail) profileEmail.textContent = currentUser.email || "";
    if (profileAvatar) {
      profileAvatar.src = resolvedAvatar;
    }

    if (fullName) fullName.value = currentUser.name || "";
    if (email) email.value = currentUser.email || "";
    if (phone) phone.value = currentUser.phone || "";
    if (location) location.value = currentUser.location || "";
    if (bio) bio.value = currentUser.bio || "";

    refreshNavigationAuthState();
  } catch (error) {
    alert(error.message || "Failed to load profile");
  }
}

async function loadUserBlogs() {
  const container = document.getElementById("myBlogsGrid");
  if (!container) return;

  try {
    const response = await apiRequest("/profile/blogs");
    const blogs = Array.isArray(response.blogs) ? response.blogs : [];

    if (blogs.length === 0) {
      container.innerHTML =
        '<p style="color: var(--text-light); text-align: center;">You have not written any blogs yet.</p>';
      return;
    }

    container.innerHTML = blogs
      .map(
        (blog) => `
          <div class="blog-item">
            <h3>${escapeHtml(blog.title)}</h3>
            <p>${escapeHtml(blog.content)}</p>
            <div class="blog-meta">
              <span><i class="fas fa-calendar"></i> ${formatDate(blog.date)}</span>
              <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(blog.placeName || "")}</span>
              <span><i class="fas fa-star"></i> ${escapeHtml(blog.rating)}</span>
            </div>
          </div>
        `,
      )
      .join("");
  } catch (error) {
    container.innerHTML =
      '<p style="color: var(--text-light); text-align: center;">Unable to load your blogs.</p>';
  }
}

async function loadFavoritePlaces() {
  const container = document.getElementById("favoritePlaces");
  if (!container) return;

  try {
    const response = await apiRequest("/profile/favorites");
    const favorites = Array.isArray(response.favorites)
      ? response.favorites
      : [];

    if (favorites.length === 0) {
      container.innerHTML =
        '<p style="color: var(--text-light); text-align: center;">No favorite places yet.</p>';
      return;
    }

    container.innerHTML = favorites
      .map((place) => createPlaceCard(place))
      .join("");
  } catch (error) {
    container.innerHTML =
      '<p style="color: var(--text-light); text-align: center;">Unable to load favorites.</p>';
  }
}

function initProfileTabs() {
  const menuItems = document.querySelectorAll(".menu-item:not(.logout)");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabName = item.dataset.tab;

      menuItems.forEach((menuItem) => menuItem.classList.remove("active"));
      item.classList.add("active");

      document.querySelectorAll(".profile-tab").forEach((tab) => {
        tab.style.display = "none";
        tab.classList.remove("active");
      });

      const activeTab = document.getElementById(`${tabName}Tab`);
      if (activeTab) {
        activeTab.style.display = "block";
        activeTab.classList.add("active");
      }
    });
  });

  const logoutBtn = document.querySelector(".menu-item.logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        logoutUser();
      }
    });
  }
}

function initProfileForms() {
  const profileForm = document.getElementById("profileForm");
  const settingsForm = document.getElementById("settingsForm");
  const avatarEditBtn = document.getElementById("avatarEditBtn");
  const avatarFileInput = document.getElementById("avatarFileInput");

  if (avatarEditBtn && avatarFileInput) {
    avatarEditBtn.addEventListener("click", () => {
      avatarFileInput.click();
    });
  }

  if (avatarFileInput) {
    avatarFileInput.addEventListener("change", async (event) => {
      const file = event.target.files && event.target.files[0];
      await uploadAvatarFromGallery(file);
      avatarFileInput.value = "";
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const payload = {
          name: document.getElementById("fullName").value.trim(),
          phone: document.getElementById("phone").value.trim(),
          bio: document.getElementById("bio").value.trim(),
          location: document.getElementById("location").value.trim(),
        };

        const updatedUser = await apiRequest("/profile/me", {
          method: "PUT",
          body: JSON.stringify(payload),
        });

        currentUser = updatedUser.user;
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(currentUser));

        const profileName = document.getElementById("profileName");
        const profileEmail = document.getElementById("profileEmail");
        const profileAvatar = document.getElementById("profileAvatar");

        if (profileName) profileName.textContent = currentUser.name || "";
        if (profileEmail) profileEmail.textContent = currentUser.email || "";
        if (profileAvatar) {
          profileAvatar.src = resolveAvatarFromUser(currentUser);
        }

        alert("Profile updated successfully!");
      } catch (error) {
        alert(error.message || "Failed to update profile");
      }
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }

      try {
        await apiRequest("/profile/password", {
          method: "PUT",
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        alert("Password updated successfully!");
        settingsForm.reset();
      } catch (error) {
        alert(error.message || "Failed to update password");
      }
    });
  }
}

// ===== LOGIN PAGE =====
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");
  const loginBox = loginForm ? loginForm.closest(".auth-box") : null;
  const signupBox = document.getElementById("signupBox");
  const redirectTarget = getRedirectTarget();

  if (showSignup && loginBox && signupBox) {
    showSignup.addEventListener("click", (event) => {
      event.preventDefault();
      loginBox.style.display = "none";
      signupBox.style.display = "block";
    });
  }

  if (showLogin && loginBox && signupBox) {
    showLogin.addEventListener("click", (event) => {
      event.preventDefault();
      signupBox.style.display = "none";
      loginBox.style.display = "block";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await apiRequest("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          auth: false,
        });

        setSession(response);
        window.location.href = redirectTarget;
      } catch (error) {
        alert(error.message || "Login failed");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = document.getElementById("signupEmail").value.trim();
      const phone = document.getElementById("signupPhone").value.trim();
      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword",
      ).value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const agreed = document.getElementById("agreeTerms").checked;
      if (!agreed) {
        alert("Please agree to the Terms & Conditions");
        return;
      }

      try {
        const response = await apiRequest("/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, phone, password }),
          auth: false,
        });

        setSession(response);
        window.location.href = redirectTarget;
      } catch (error) {
        alert(error.message || "Signup failed");
      }
    });
  }
}
