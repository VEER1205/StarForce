const backendBase = window.location.origin; // works for local & render.com

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

async function loadProblems(tag = null) {
  const tableBody = document.getElementById('problemsBody');
  tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Loading problems...</td></tr>`;

  try {
    const endpoint = tag 
      ? `${backendBase}/api/problemsbytag/${encodeURIComponent(tag)}`
      : `${backendBase}/api/allproblems/`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (!Array.isArray(data)) {
      tableBody.innerHTML = `<tr><td colspan="4">Error: Invalid data format.</td></tr>`;
      return;
    }

    // Limit for speed
    const problems = data.slice(0, 200);

    tableBody.innerHTML = "";
    problems.forEach(p => {
      const row = document.createElement('tr');
      const tags = p.tags.length > 0 ? p.tags.join(', ') : '—';
      const link = `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`;
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.rating || '—'}</td>
        <td>${tags}</td>
        <td><a class="problem-link" href="${link}" target="_blank">Solve</a></td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error(error);
    tableBody.innerHTML = `<tr><td colspan="4">Failed to load problems.</td></tr>`;
  }
}

// Search bar filter
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll('#problemsBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});

// Tag filter
document.getElementById('tagFilter').addEventListener('change', function() {
  const selectedTag = this.value;
  if (selectedTag) {
    loadProblems(selectedTag);
  } else {
    loadProblems();
  }
});

window.onload = () => loadProblems();