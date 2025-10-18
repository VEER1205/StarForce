// Starfield Animation
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.3,
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffa500";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
animate();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when clicking on a link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// Fetch Contests
let allContests = [];
let currentPage = 1;
const contestsPerPage = 10;

async function fetchContests() {
  const container = document.getElementById("contest-container");
  try {
    const res = await fetch("/api/contests/");
    const data = await res.json();

    console.log("Fetched contests:", data.length);

    if (!Array.isArray(data)) {
      container.innerHTML = `<p style="color:red;text-align:center;">Unexpected data format.</p>`;
      console.error("Invalid response:", data);
      return;
    }

    if (data.length === 0) {
      container.innerHTML = "<p style='text-align:center;color:rgba(255,255,255,0.6);'>No upcoming contests found.</p>";
      return;
    }

    allContests = data;
    renderContests();
  } catch (err) {
    container.innerHTML = `<p style='color:#ff6b6b;text-align:center;'>Error loading contests: ${err.message}</p>`;
  }
}

function renderContests() {
  const container = document.getElementById("contest-container");
  const pagination = document.getElementById("pagination");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  console.log("Total contests:", allContests.length);
  
  const totalPages = Math.ceil(allContests.length / contestsPerPage);
  const startIndex = (currentPage - 1) * contestsPerPage;
  const endIndex = startIndex + contestsPerPage;
  const contestsToShow = allContests.slice(startIndex, endIndex);

  // console.log("Total pages:", totalPages);
  // console.log("Current page:", currentPage);
  // console.log("Showing contests:", contestsToShow.length);
  // console.log("totalContests length:", allContests.length);

  container.innerHTML = "";
  contestsToShow.forEach((contest) => {
    const div = document.createElement("div");
    div.classList.add("contest");
    div.innerHTML = `
      <h3>${contest.name}</h3>
      <p>🕒 Start: ${contest.startTimeSeconds}</p>
      <p>⏳ Duration: ${contest.duration} minutes</p>
      <a href="https://codeforces.com/contest/${contest.id}" target="_blank">Go to Contest</a>
    `;
    container.appendChild(div);
  });

  // Show pagination if there are contests
  if (allContests.length > 0) {
    console.log("Should show pagination");
    pagination.style.display = "flex";
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
}

// Pagination event listeners
document.getElementById("prevBtn").addEventListener("click", () => {
  console.log("Previous clicked");
  if (currentPage > 1) {
    currentPage--;
    renderContests();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  console.log("Next clicked");
  const totalPages = Math.ceil(allContests.length / contestsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderContests();
  }
});

fetchContests();