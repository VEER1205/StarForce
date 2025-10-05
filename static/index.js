 // Create animated stars
    function createStars() {
      const starsContainer = document.getElementById('stars');
      const starCount = 100;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        starsContainer.appendChild(star);
      }
    }
    
    createStars();

    let statsChart = null;

    async function fetchUserData(handle) {
      const res = await fetch(`http://127.0.0.1:8000/api/user/${handle}`);
      if (!res.ok) throw new Error('User not found or API error');
      return await res.json();
    }

    async function loadUserData() {
      const handle = document.getElementById('handleInput').value.trim();
      if (!handle) {
        showError('Please enter a handle');
        return;
      }

      hideError();
      showLoading();
      document.getElementById('userInfo').style.display = 'none';

      try {
        const data = await fetchUserData(handle);
        hideLoading();
        displayUserData(data);
      } catch (err) {
        hideLoading();
        showError(err.message);
      }
    }

    function displayUserData(data) {
      document.getElementById('userName').textContent = data.handle;
      document.getElementById('userRank').textContent = `${data.rank || 'Unrated'} • ${data.rating || 'N/A'} rating`;
      document.getElementById('userAvatar').textContent = data.handle.charAt(0).toUpperCase();
      
      document.getElementById('statRating').textContent = data.rating || 'N/A';
      document.getElementById('statMaxRating').textContent = data.maxRating || 'N/A';
      document.getElementById('statProblems').textContent = data.problemsSolved || 0;
      document.getElementById('statContests').textContent = data.ratingHistory?.length || 0;

      createChart(data);
      document.getElementById('userInfo').style.display = 'block';
    }

    function createChart(data) {
      if (!data.ratingHistory || data.ratingHistory.length === 0) return;

      const labels = data.ratingHistory.map((item, idx) => `Contest ${idx + 1}`);
      const ratings = data.ratingHistory.map(item => item.newRating);

      if (statsChart) statsChart.destroy();

      const ctx = document.getElementById('statsChart').getContext('2d');
      
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 165, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(255, 165, 0, 0.01)');

      statsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Rating',
            data: ratings,
            borderColor: '#ffa500',
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#ffa500',
            pointBorderColor: '#000',
            pointBorderWidth: 3,
            pointHoverBackgroundColor: '#ffa500',
            pointHoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { 
                color: 'rgba(255, 165, 0, 0.7)', 
                font: { size: 12, weight: '500' },
                padding: 10
              },
              grid: { 
                color: 'rgba(255, 165, 0, 0.1)',
                drawBorder: false
              },
              border: { display: false }
            },
            x: {
              ticks: { 
                color: 'rgba(255, 165, 0, 0.7)',
                font: { size: 11, weight: '500' },
                maxRotation: 45,
                minRotation: 45
              },
              grid: { 
                color: 'rgba(255, 165, 0, 0.05)',
                drawBorder: false
              },
              border: { display: false }
            }
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              titleColor: '#ffa500',
              bodyColor: '#fff',
              borderColor: '#ffa500',
              borderWidth: 2,
              padding: 16,
              displayColors: false,
              titleFont: { size: 14, weight: '600' },
              bodyFont: { size: 13, weight: '500' },
              cornerRadius: 12,
              callbacks: {
                title: function(context) {
                  return data.ratingHistory[context[0].dataIndex].contestName;
                },
                label: function(context) {
                  return `Rating: ${context.parsed.y}`;
                }
              }
            }
          }
        }
      });
    }

    function showLoading() {
      document.getElementById('loadingMsg').style.display = 'flex';
    }

    function hideLoading() {
      document.getElementById('loadingMsg').style.display = 'none';
    }

    function showError(message) {
      const errorEl = document.getElementById('errorMsg');
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }

    function hideError() {
      document.getElementById('errorMsg').style.display = 'none';
    }

    document.getElementById('handleInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') loadUserData();
    });