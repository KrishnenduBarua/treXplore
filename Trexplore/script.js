// Main JavaScript file for TreXplore

// Global state
let currentUser = null;
let filteredPlaces = [...placesData];

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initPage();
});

// ===== NAVIGATION =====
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
}

// ===== PAGE-SPECIFIC INITIALIZATION =====
function initPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  switch (page) {
    case "index.html":
    case "":
      initHomePage();
      break;
    case "places.html":
      initPlacesPage();
      break;
    case "place-detail.html":
      initPlaceDetailPage();
      break;
    case "profile.html":
      initProfilePage();
      break;
    case "login.html":
      initLoginPage();
      break;
  }
}

// ===== HOME PAGE =====
function initHomePage() {
  loadFeaturedPlaces();
  initHomeSearch();
  initDivisionFilters();
}

function loadFeaturedPlaces() {
  const container = document.getElementById("featuredPlaces");
  if (!container) return;

  const featured = placesData.slice(0, 6);
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
        window.location.href = `places.html?search=${encodeURIComponent(
          query
        )}`;
      }
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
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
      window.location.href = `places.html?division=${encodeURIComponent(
        division
      )}`;
    });
  });
}

// ===== PLACES PAGE =====
function initPlacesPage() {
  loadAllPlaces();
  initPlacesSearch();
  initPlacesFilters();
  applyURLFilters();
}

function loadAllPlaces() {
  const container = document.getElementById("placesGrid");
  if (!container) return;

  displayPlaces(filteredPlaces);
}

function displayPlaces(places) {
  const container = document.getElementById("placesGrid");
  const noResults = document.getElementById("noResults");
  const resultsCount = document.getElementById("resultsCount");

  if (places.length === 0) {
    container.innerHTML = "";
    noResults.style.display = "block";
    resultsCount.textContent = "No places found";
  } else {
    container.innerHTML = places
      .map((place) => createPlaceCard(place))
      .join("");
    noResults.style.display = "none";
    resultsCount.textContent = `Showing ${places.length} place${
      places.length > 1 ? "s" : ""
    }`;
  }
}

function createPlaceCard(place) {
  return `
        <div class="place-card" onclick="goToPlaceDetail(${place.id})">
            <div class="place-image">
                <img src="${place.image}" alt="${place.name}">
                <span class="place-badge">${place.category}</span>
            </div>
            <div class="place-content">
                <h3>${place.name}</h3>
                <p class="place-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${place.district}, ${place.division}
                </p>
                <p class="place-description">${place.description.substring(
                  0,
                  100
                )}...</p>
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
    searchBtn.addEventListener("click", applyFilters);
    searchInput.addEventListener("input", applyFilters);
  }
}

function initPlacesFilters() {
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");
  const resetBtn = document.getElementById("resetFilters");

  if (divisionFilter) {
    divisionFilter.addEventListener("change", () => {
      updateDistrictFilter();
      applyFilters();
    });
  }

  if (districtFilter) {
    districtFilter.addEventListener("change", applyFilters);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }
}

function updateDistrictFilter() {
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");
  const selectedDivision = divisionFilter.value;

  districtFilter.innerHTML = '<option value="">All Districts</option>';

  if (selectedDivision && districtData[selectedDivision]) {
    districtData[selectedDivision].forEach((district) => {
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

function applyFilters() {
  const searchInput = document.getElementById("searchInput");
  const divisionFilter = document.getElementById("divisionFilter");
  const districtFilter = document.getElementById("districtFilter");

  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const selectedDivision = divisionFilter ? divisionFilter.value : "";
  const selectedDistrict = districtFilter ? districtFilter.value : "";

  filteredPlaces = placesData.filter((place) => {
    const matchesSearch =
      !searchTerm ||
      place.name.toLowerCase().includes(searchTerm) ||
      place.description.toLowerCase().includes(searchTerm) ||
      place.category.toLowerCase().includes(searchTerm);

    const matchesDivision =
      !selectedDivision || place.division === selectedDivision;
    const matchesDistrict =
      !selectedDistrict || place.district === selectedDistrict;

    return matchesSearch && matchesDivision && matchesDistrict;
  });

  displayPlaces(filteredPlaces);
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("divisionFilter").value = "";
  document.getElementById("districtFilter").value = "";
  document.getElementById("districtFilter").disabled = true;

  filteredPlaces = [...placesData];
  displayPlaces(filteredPlaces);
}

function applyURLFilters() {
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");
  const division = urlParams.get("division");

  if (search) {
    document.getElementById("searchInput").value = search;
  }

  if (division) {
    document.getElementById("divisionFilter").value = division;
    updateDistrictFilter();
  }

  if (search || division) {
    applyFilters();
  }
}

// ===== PLACE DETAIL PAGE =====
function initPlaceDetailPage() {
  loadPlaceDetails();
  initBlogForm();
}

function loadPlaceDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = parseInt(urlParams.get("id"));

  const place = placesData.find((p) => p.id === placeId);

  if (!place) {
    document.getElementById("placeName").textContent = "Place not found";
    return;
  }

  // Update hero section
  document.getElementById("placeName").textContent = place.name;
  document.getElementById(
    "placeLocation"
  ).textContent = `${place.district}, ${place.division}`;
  document.getElementById("placeRating").textContent = place.rating;

  const hero = document.getElementById("placeHero");
  hero.style.background = `url('${place.image}') center/cover`;

  // Update details
  document.getElementById("placeDescription").textContent = place.description;
  document.getElementById("placeDivision").textContent = place.division;
  document.getElementById("placeDistrict").textContent = place.district;
  document.getElementById("placeCategory").textContent = place.category;
  document.getElementById("placeBestTime").textContent = place.bestTime;

  // Update sidebar
  document.getElementById("entryFee").textContent = place.entryFee;
  document.getElementById("parking").textContent = place.parking;
  document.getElementById("food").textContent = place.food;
  document.getElementById("accommodation").textContent = place.accommodation;
  document.getElementById("gettingThere").textContent = place.gettingThere;

  // Load blogs for this place
  loadPlaceBlogs(placeId);
}

function loadPlaceBlogs(placeId) {
  const blogsList = document.getElementById("blogsList");
  const placeBlogs = blogsData.filter((blog) => blog.placeId === placeId);

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
                <img src="${blog.authorAvatar}" alt="${blog.author}">
                <div>
                    <h4>${blog.author}</h4>
                    <span style="color: var(--text-light); font-size: 0.9rem;">${formatDate(
                      blog.date
                    )}</span>
                </div>
            </div>
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <div class="blog-meta">
                <span><i class="fas fa-star" style="color: #fbbf24;"></i> ${
                  blog.rating
                }</span>
            </div>
        </div>
    `
    )
    .join("");
}

function initBlogForm() {
  const writeBlogBtn = document.getElementById("writeBlogBtn");
  const blogForm = document.getElementById("blogForm");
  const cancelBtn = document.getElementById("cancelBlogBtn");
  const submitForm = document.getElementById("blogSubmitForm");
  const stars = document.querySelectorAll(".star-rating i");

  let selectedRating = 0;

  if (writeBlogBtn) {
    writeBlogBtn.addEventListener("click", () => {
      blogForm.style.display = "block";
      blogForm.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      blogForm.style.display = "none";
      submitForm.reset();
      selectedRating = 0;
      stars.forEach((star) => star.classList.remove("active"));
    });
  }

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.rating);
      stars.forEach((s) => {
        if (parseInt(s.dataset.rating) <= selectedRating) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });

  if (submitForm) {
    submitForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (selectedRating === 0) {
        alert("Please select a rating");
        return;
      }

      const title = document.getElementById("blogTitle").value;
      const content = document.getElementById("blogContent").value;

      // In a real app, this would send data to a server
      alert("Blog posted successfully! (This is a demo)");

      blogForm.style.display = "none";
      submitForm.reset();
      selectedRating = 0;
      stars.forEach((star) => star.classList.remove("active"));
    });
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// ===== PROFILE PAGE =====
function initProfilePage() {
  initProfileTabs();
  initProfileForms();
  loadFavoritePlaces();
}

function initProfileTabs() {
  const menuItems = document.querySelectorAll(".menu-item:not(.logout)");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tabName = item.dataset.tab;

      // Update active menu item
      menuItems.forEach((mi) => mi.classList.remove("active"));
      item.classList.add("active");

      // Show corresponding tab
      document.querySelectorAll(".profile-tab").forEach((tab) => {
        tab.style.display = "none";
        tab.classList.remove("active");
      });

      const activeTab = document.getElementById(tabName + "Tab");
      if (activeTab) {
        activeTab.style.display = "block";
        activeTab.classList.add("active");
      }
    });
  });

  // Logout button
  const logoutBtn = document.querySelector(".menu-item.logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "login.html";
      }
    });
  }
}

function initProfileForms() {
  const profileForm = document.getElementById("profileForm");
  const settingsForm = document.getElementById("settingsForm");

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile updated successfully! (This is a demo)");
    });
  }

  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const currentPassword = document.getElementById("currentPassword").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (newPassword !== confirmPassword) {
        alert("New passwords do not match!");
        return;
      }

      alert("Password updated successfully! (This is a demo)");
      settingsForm.reset();
    });
  }
}

function loadFavoritePlaces() {
  const container = document.getElementById("favoritePlaces");
  if (!container) return;

  const favorites = placesData.slice(0, 4);
  container.innerHTML = favorites
    .map((place) => createPlaceCard(place))
    .join("");
}

// ===== LOGIN PAGE =====
function initLoginPage() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");
  const loginBox = loginForm.closest(".auth-box");
  const signupBox = document.getElementById("signupBox");

  if (showSignup) {
    showSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginBox.style.display = "none";
      signupBox.style.display = "block";
    });
  }

  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupBox.style.display = "none";
      loginBox.style.display = "block";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      alert(`Login successful! Welcome back. (This is a demo)`);
      window.location.href = "index.html";
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const password = document.getElementById("signupPassword").value;
      const confirmPassword = document.getElementById(
        "signupConfirmPassword"
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

      alert("Account created successfully! (This is a demo)");
      window.location.href = "index.html";
    });
  }
}
