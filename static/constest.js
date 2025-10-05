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
      ctx.fillStyle = "#ffb300";
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

    // Fetch Contests
    async function fetchContests() {
      const container = document.getElementById("contest-container");
      try {
        const res = await fetch("https://starforce.onrender.com/contests/");
        const data = await res.json();

        if (!Array.isArray(data)) {
          container.innerHTML = `<p style="color:red;text-align:center;">Unexpected data format.</p>`;
          console.error("Invalid response:", data);
          return;
        }

        if (data.length === 0) {
          container.innerHTML = "<p style='text-align:center;'>No upcoming contests found.</p>";
          return;
        }

        container.innerHTML = "";
        data.forEach((contest) => {
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
      } catch (err) {
        container.innerHTML = `<p style='color:red;text-align:center;'>Error loading contests: ${err.message}</p>`;
      }
    }

    fetchContests();