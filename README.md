# StarForce - Codeforces Dashboard

![StarForce Banner](https://img.shields.io/badge/StarForce-Codeforces%20Dashboard-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A modern, elegant web application to track and analyze Codeforces competitive programming statistics. StarForce provides beautiful insights into your coding journey with real-time data visualization, user comparisons, contest tracking, and problem browsing.

## ✨ Features

### 🏠 **Home Dashboard**
- **User Statistics**: View current rating, peak rating, problems solved, and contests participated
- **Rating Journey Chart**: Interactive line chart showing rating progression over time
- **Beautiful UI**: Modern glassmorphism design with animated star background
- **Real-time Data**: Fetches live data from Codeforces API

### 🔄 **Compare Users**
- **Head-to-Head Comparison**: Compare two Codeforces users side by side
- **Visual Analytics**: Dual line charts showing rating progression comparison
- **Performance Metrics**: Bar charts comparing ratings, problems solved, and contests
- **Winner Badge**: Automatic trophy display for the user with higher rating
- **VS Badge**: Eye-catching visual separator between users

### 🏆 **Contests**
- **Upcoming Contests**: Browse all upcoming Codeforces contests
- **Pagination**: View 10 contests per page with easy navigation
- **Contest Details**: See start time, duration, and contest type
- **Direct Links**: Quick access to contest registration pages
- **Animated Background**: Dynamic star field animation

### 📚 **Problems**
- **Problem Browser**: Explore Codeforces problems with ratings and tags
- **Search Functionality**: Real-time search by problem name or tags
- **Tag Filtering**: Filter problems by categories (DP, Greedy, Math, etc.)
- **Problem Details**: View problem ratings, tags, and direct links
- **Limit Display**: Shows first 200 problems for optimal performance
- **Animated Background**: Floating star particles with smooth animations

## 🎨 Design Features

- **Consistent Theme**: Pure black background with orange (#ffa500) accents
- **Glassmorphism**: Modern frosted glass effect on cards and containers
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Fully mobile-responsive with hamburger navigation
- **Typography**: Clean Inter font family for excellent readability
- **Visual Feedback**: Loading states, error messages, and interactive elements

## 🚀 Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations, flexbox, and grid
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation
- **Chart.js**: Interactive data visualization
- **Canvas API**: Animated star backgrounds

### Backend Integration
- **Codeforces API**: Live data fetching
- **Custom Backend**: `https://starforce.onrender.com`
- **RESTful Endpoints**: Clean API structure

## 📁 Project Structure

```
starforce/
├── static/
│   ├── index.html          # Home dashboard
│   ├── index.css           # Home styles
│   ├── index.js            # Home logic
│   ├── compare.html        # User comparison page
│   ├── compare.css         # Compare styles
│   ├── compare.js          # Compare logic
│   ├── contest.html        # Contests page
│   ├── contest.css         # Contest styles
│   ├── contest.js          # Contest logic
│   ├── problem.html        # Problems browser
│   ├── problem.css         # Problems styles
│   ├── problem.js          # Problems logic
│   └── favicon.ico         # Site icon
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- (Optional) Local server for development

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/VEER1205/starforce.git
   cd starforce
   ```

2. **Option A: Open directly in browser**
   - Navigate to the project folder
   - Open `index.html` in your web browser

3. **Option B: Use a local server (recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   Then open `http://localhost:8000` in your browser

4. **Start exploring!**
   - Enter a Codeforces handle on the home page
   - Compare users on the Compare page
   - Browse upcoming contests
   - Search for problems to solve

## 🔧 Configuration

### API Endpoints

The application uses the following API endpoints:

```javascript
// User data
GET https://starforce.onrender.com/api/user/{handle}

// All problems
GET https://starforce.onrender.com/allproblems/

// Problems by tag
GET https://starforce.onrender.com/problemsbytag/{tag}

// Contests
GET https://starforce.onrender.com/api/contests/
```

### Customization

**Change items per page:**
```javascript
// In contest.js or problem.js
const itemsPerPage = 10; // Change this value
```

**Modify color scheme:**
```css
/* Primary color */
#ffa500  /* Orange */

/* Background */
#000000  /* Pure black */
```

**Adjust star animation:**
```javascript
// In contest.js
const starCount = 120; // Number of stars
const speed = Math.random() * 0.3; // Star speed
```

## 📱 Mobile Support

StarForce is fully responsive with:
- **Hamburger menu** for mobile navigation
- **Touch-friendly** buttons and interactive elements
- **Optimized layouts** for tablets and phones
- **Responsive breakpoints** at 768px and 480px
- **Mobile-first** approach for better performance

## 🎯 Usage Examples

### Search for a User
1. Go to the Home page
2. Enter a Codeforces handle (e.g., "tourist")
3. Click "Analyze"
4. View comprehensive statistics and rating graph

### Compare Two Users
1. Navigate to the Compare page
2. Enter first user's handle
3. Enter second user's handle
4. Click "Compare Now"
5. View side-by-side comparison with charts

### Browse Contests
1. Visit the Contests page
2. View upcoming contests (10 per page)
3. Use Previous/Next buttons to navigate
4. Click "Go to Contest" to register

### Search Problems
1. Go to the Problems page
2. Use search bar to filter by name or tag
3. Or select a tag from dropdown
4. Click "Solve" to attempt the problem

## 🐛 Troubleshooting

**Charts not displaying:**
- Ensure Chart.js CDN is loading
- Check browser console for errors
- Verify internet connection

**API errors:**
- Backend server might be down
- Check network connectivity
- Verify API endpoints are accessible

**Pagination not showing:**
- Ensure there are more than 10 items
- Check browser console logs
- Verify JavaScript is enabled

**Mobile menu not working:**
- Clear browser cache
- Ensure JavaScript is enabled
- Try a different browser

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Ensure mobile responsiveness
- Add comments for complex logic
- Update documentation as needed

## 📊 Performance

- **Fast Loading**: Optimized assets and minimal dependencies
- **Efficient Rendering**: Pagination for large datasets
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **API Caching**: Smart data fetching to reduce API calls
- **Responsive**: Adapts to any screen size

## 🔒 Security

- No user data stored locally
- HTTPS API calls
- No authentication required
- Public data only (from Codeforces API)
- No cookies or tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Codeforces**: For providing the amazing API
- **Chart.js**: For beautiful, responsive charts
- **Inter Font**: For clean, modern typography

## 📞 Contact

- **Project Link**: [https://github.com/VEER1205/starforce](https://github.com/VEER1205/starforce)
- **Live Demo**: [https://starforce.onrender.com](https://starforce.onrender.com)
- **Issues**: [GitHub Issues](https://github.com/VEER1205/starforce/issues)

## 🗺️ Roadmap

- [ ] Add user authentication
- [ ] Save favorite problems
- [ ] Problem difficulty recommendations
- [ ] Virtual contest feature
- [ ] Dark/Light theme toggle
- [ ] Export statistics as PDF
- [ ] Social sharing features
- [ ] Problem submission history
- [ ] Contest reminders
- [ ] Advanced filtering options

---

**Developed by VEER DODIYA**

*Track your progress, reach for the stars!* ⭐
