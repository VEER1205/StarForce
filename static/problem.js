async function loadProblems() {
  const tableBody = document.getElementById('problemsBody');

  try {
    const response = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await response.json();

    if (data.status !== "OK") {
      tableBody.innerHTML = `<tr><td colspan="4">Failed to load problems.</td></tr>`;
      return;
    }

    const problems = data.result.problems.slice(0, 200); // show first 200 for speed

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
    tableBody.innerHTML = `<tr><td colspan="4">Error loading problems.</td></tr>`;
  }
}

// Search filter
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll('#problemsBody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});

document.getElementById('tagFilter').addEventListener('change', (e) => {
  const tag = e.target.value;
  loadProblems(tag || null);
});

window.onload = loadProblems;
