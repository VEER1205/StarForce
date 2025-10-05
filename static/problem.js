const backendBase = window.location.origin;

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

    const problems = data.slice(0, 200);
    tableBody.innerHTML = "";
    problems.forEach(p => {
      const row = document.createElement('tr');
      const tags = p.tags.length ? p.tags.join(', ') : '—';
      const link = `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`;
      row.innerHTML = `
        <td>${p.name}</td>
        <td>${p.rating || '—'}</td>
        <td>${tags}</td>
        <td><a class="problem-link" href="${link}" target="_blank">Solve</a></td>
      `;
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error(err);
    tableBody.innerHTML = `<tr><td colspan="4">Failed to load problems.</td></tr>`;
  }
}

// Search bar
document.getElementById('searchInput').addEventListener('keyup', function () {
  const filter = this.value.toLowerCase();
  document.querySelectorAll('#problemsBody tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  });
});

// Tag filter
document.getElementById('tagFilter').addEventListener('change', e => {
  const tag = e.target.value;
  loadProblems(tag || null);
});

window.onload = () => loadProblems();
