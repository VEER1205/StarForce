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

    let ratingChart = null;
    let metricsChart = null;

    async function fetchUserData(handle) {
      const res = await fetch(`http://127.0.0.1:8000/api/user/${handle}`);
      if (!res.ok) throw new Error(`User '${handle}' not found`);
      return await res.json();
    }

    async function compareUsers() {
      const handle1 = document.getElementById('handle1').value.trim();
      const handle2 = document.getElementById('handle2').value.trim();

      if (!handle1 || !handle2) {
        showError('Please enter both handles');
        return;
      }

      hideError();
      showLoading();
      document.getElementById('comparison').style.display = 'none';

      try {
        const [data1, data2] = await Promise.all([
          fetchUserData(handle1),
          fetchUserData(handle2)
        ]);

        hideLoading();
        displayComparison(data1, data2);
      } catch (err) {
        hideLoading();
        showError(err.message);
      }
    }

    function displayComparison(data1, data2) {
      document.getElementById('name1').textContent = data1.handle;
      document.getElementById('rank1').textContent = `${data1.rank || 'Unrated'} • ${data1.rating || 'N/A'}`;
      document.getElementById('avatar1').textContent = data1.handle.charAt(0).toUpperCase();
      document.getElementById('rating1').textContent = data1.rating || 'N/A';
      document.getElementById('maxRating1').textContent = data1.maxRating || 'N/A';
      document.getElementById('problems1').textContent = data1.problemsSolved || 0;
      document.getElementById('contests1').textContent = data1.ratingHistory?.length || 0;

      document.getElementById('name2').textContent = data2.handle;
      document.getElementById('rank2').textContent = `${data2.rank || 'Unrated'} • ${data2.rating || 'N/A'}`;
      document.getElementById('avatar2').textContent = data2.handle.charAt(0).toUpperCase();
      document.getElementById('rating2').textContent = data2.rating || 'N/A';
      document.getElementById('maxRating2').textContent = data2.maxRating || 'N/A';
      document.getElementById('problems2').textContent = data2.problemsSolved || 0;
      document.getElementById('contests2').textContent = data2.ratingHistory?.length || 0;

      const rating1 = data1.rating || 0;
      const rating2 = data2.rating || 0;
      
      document.getElementById('user1Card').classList.remove('winner');
      document.getElementById('user2Card').classList.remove('winner');
      
      if (rating1 > rating2) {
        document.getElementById('user1Card').classList.add('winner');
      } else if (rating2 > rating1) {
        document.getElementById('user2Card').classList.add('winner');
      }

      createCharts(data1, data2);
      document.getElementById('comparison').style.display = 'block';
    }

    function createCharts(data1, data2) {
      createRatingChart(data1, data2);
      createMetricsChart(data1, data2);
    }

    function createRatingChart(data1, data2) {
      if (ratingChart) ratingChart.destroy();

      const maxLength = Math.max(
        data1.ratingHistory?.length || 0,
        data2.ratingHistory?.length || 0
      );

      const labels = Array.from({ length: maxLength }, (_, i) => i + 1);
      const ratings1 = data1.ratingHistory?.map(h => h.newRating) || [];
      const ratings2 = data2.ratingHistory?.map(h => h.newRating) || [];

      const ctx = document.getElementById('ratingChart').getContext('2d');
      
      const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient1.addColorStop(0, 'rgba(255, 165, 0, 0.4)');
      gradient1.addColorStop(1, 'rgba(255, 165, 0, 0.01)');

      const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient2.addColorStop(0, 'rgba(255, 204, 0, 0.4)');
      gradient2.addColorStop(1, 'rgba(255, 204, 0, 0.01)');

      ratingChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: data1.handle,
              data: ratings1,
              borderColor: '#ffa500',
              backgroundColor: gradient1,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 7,
              pointBackgroundColor: '#ffa500',
              pointBorderColor: '#000',
              pointBorderWidth: 2
            },
            {
              label: data2.handle,
              data: ratings2,
              borderColor: '#ffcc00',
              backgroundColor: gradient2,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 7,
              pointBackgroundColor: '#ffcc00',
              pointBorderColor: '#000',
              pointBorderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { 
                color: 'rgba(255, 165, 0, 0.7)', 
                font: { size: 12, weight: '500' }
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
                font: { size: 11, weight: '500' }
              },
              grid: { 
                color: 'rgba(255, 165, 0, 0.05)',
                drawBorder: false
              },
              border: { display: false }
            }
          },
          plugins: {
            legend: {
              labels: { 
                color: '#ffa500',
                font: { size: 13, weight: '600' },
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              titleColor: '#ffa500',
              bodyColor: '#fff',
              borderColor: '#ffa500',
              borderWidth: 2,
              padding: 12,
              cornerRadius: 12
            }
          }
        }
      });
    }

    function createMetricsChart(data1, data2) {
      if (metricsChart) metricsChart.destroy();

      const ctx = document.getElementById('metricsChart').getContext('2d');

      metricsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Current Rating', 'Max Rating', 'Problems Solved', 'Contests'],
          datasets: [
            {
              label: data1.handle,
              data: [
                data1.rating || 0,
                data1.maxRating || 0,
                data1.problemsSolved || 0,
                data1.ratingHistory?.length || 0
              ],
              backgroundColor: 'rgba(255, 165, 0, 0.7)',
              borderColor: '#ffa500',
              borderWidth: 2,
              borderRadius: 8
            },
            {
              label: data2.handle,
              data: [
                data2.rating || 0,
                data2.maxRating || 0,
                data2.problemsSolved || 0,
                data2.ratingHistory?.length || 0
              ],
              backgroundColor: 'rgba(255, 204, 0, 0.7)',
              borderColor: '#ffcc00',
              borderWidth: 2,
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { 
                color: 'rgba(255, 165, 0, 0.7)', 
                font: { size: 12, weight: '500' }
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
                font: { size: 11, weight: '500' }
              },
              grid: { display: false },
              border: { display: false }
            }
          },
          plugins: {
            legend: {
              labels: { 
                color: '#ffa500',
                font: { size: 13, weight: '600' },
                padding: 15
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              titleColor: '#ffa500',
              bodyColor: '#fff',
              borderColor: '#ffa500',
              borderWidth: 2,
              padding: 12,
              cornerRadius: 12
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

    document.getElementById('handle1').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') document.getElementById('handle2').focus();
    });

    document.getElementById('handle2').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') compareUsers();
    });