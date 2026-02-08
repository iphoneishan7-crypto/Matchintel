# MatchIntel - Premium Cricket Intelligence Platform

A modern, data-driven cricket website that focuses exclusively on today's and upcoming matches. Built with vanilla HTML, CSS, and JavaScript, featuring a premium dark UI with glassmorphism effects and real-time data integration.

## 🎯 Core Purpose

MatchIntel explains cricket matches using real data, stats, and visuals. No news articles, no opinions, no betting tips, no fantasy advice - just pure cricket intelligence.

## ✨ Features

### Homepage
- **Hero Section** with live match statistics
- **Today's Matches** - Real-time scores and match status
- **Upcoming Matches** - Future match schedules with detailed info
- **Auto-refresh** - Updates every 30 seconds for live matches
- **Responsive Design** - Mobile-first, works on all devices

### Match Detail Pages
- **Live Score Card** - Real-time score updates
- **Match Overview** - Teams, venue, date, time, toss info
- **Pitch Analysis** - Visual indicators for pace, spin, and batting conditions
- **Weather Impact** - Temperature, humidity, wind, rain probability
- **Head-to-Head Stats** - Historical performance between teams
- **Recent Form** - Visual bar charts showing last 5 matches
- **Playing XI** - Complete team lineups with player roles
- **Key Players** - Stat-based player highlights
- **FAQ Section** - SEO-optimized frequently asked questions

## 🎨 Design Features

### Visual Style
- **Dark Premium UI** - Deep charcoal/black background
- **Neon Accents** - Teal (#00f5d4), Electric Blue (#00d9ff), Soft Lime (#b8ff57)
- **Glassmorphism** - Frosted glass panels with backdrop blur
- **Smooth Animations** - Micro-interactions and transitions
- **Modern Typography** - Inter font family

### UI Components
- Animated stat cards
- Progress bars with shimmer effects
- Mini comparison charts
- Icon-based indicators
- Clean responsive tables
- Loading states with spinners
- Empty states with helpful messages

## 🔌 API Integration

### Data Source
**CricketData.org API**
- API Key: `3c87374a-8898-4dee-8b10-916b602eee4f`
- Base URL: `https://api.cricketdata.org`

### Endpoints Used
- `/currentMatches` - Today's and live matches
- `/upcomingMatches` - Future scheduled matches
- `/match/{id}` - Detailed match information

### Fallback System
The application includes mock data fallback for demonstration purposes when the API is unavailable or during development.

## 📁 Project Structure

```
new1234/
├── index.html          # Homepage with match listings
├── match.html          # Match detail page
├── styles.css          # Main stylesheet with design system
├── match.css           # Match detail page specific styles
├── app.js              # Homepage JavaScript logic
├── match.js            # Match detail page JavaScript logic
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for best experience)

### Running Locally

#### Option 1: Simple File Open
1. Navigate to the project folder
2. Double-click `index.html` to open in your browser

#### Option 2: Using Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

#### Option 3: Using Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000

# Then open http://localhost:8000 in your browser
```

#### Option 4: Using Live Server (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

## 🎯 SEO Optimization

### Implemented Best Practices
- ✅ Semantic HTML5 structure
- ✅ Proper heading hierarchy (H1 → H2 → H3)
- ✅ Meta descriptions and keywords
- ✅ SEO-friendly URLs (match.html?id=xxx)
- ✅ Fast loading with optimized CSS/JS
- ✅ Mobile-responsive design
- ✅ FAQ sections for rich snippets
- ✅ Unique page titles per match

## 🎨 Color Palette

```css
/* Background Colors */
--color-bg-primary: #0a0e14      /* Deep charcoal */
--color-bg-secondary: #121820    /* Dark slate */
--color-bg-card: rgba(20, 26, 36, 0.6)  /* Glassmorphism */

/* Accent Colors */
--color-accent-teal: #00f5d4     /* Primary neon teal */
--color-accent-blue: #00d9ff     /* Electric blue */
--color-accent-lime: #b8ff57     /* Soft lime */

/* Text Colors */
--color-text-primary: #ffffff    /* Pure white */
--color-text-secondary: #a0aec0  /* Light gray */
--color-text-muted: #718096      /* Muted gray */
```

## 🔧 Customization

### Changing API Key
Edit the `CONFIG` object in `app.js` and `match.js`:
```javascript
const CONFIG = {
    API_KEY: 'your-api-key-here',
    // ...
};
```

### Adjusting Refresh Interval
Modify the `REFRESH_INTERVAL` in the CONFIG object (in milliseconds):
```javascript
const CONFIG = {
    REFRESH_INTERVAL: 30000, // 30 seconds
    // ...
};
```

### Customizing Colors
Edit CSS custom properties in `styles.css`:
```css
:root {
    --color-accent-teal: #00f5d4;
    /* Change to your preferred color */
}
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- Lazy loading of match data
- Efficient DOM updates
- CSS animations using GPU acceleration
- Minimal JavaScript bundle size
- No external dependencies (except Google Fonts)

## 🔮 Future Enhancements

Potential features for future versions:
- Player profile pages
- Team statistics pages
- Match predictions based on data
- Historical match archive
- Advanced filtering and search
- Push notifications for live matches
- Dark/light theme toggle
- Multiple language support

## 📄 License

This project is open source and available for educational and personal use.

## 🙏 Credits

- **Data Provider**: CricketData.org
- **Fonts**: Google Fonts (Inter)
- **Icons**: Unicode emoji characters

## 📞 Support

For issues or questions about the platform, please refer to the CricketData.org API documentation for data-related queries.

---

**Built with ❤️ for cricket fans who love data**
