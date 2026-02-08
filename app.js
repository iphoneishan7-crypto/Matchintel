// ===================================
// Configuration & Constants
// ===================================
const CONFIG = {
    API_KEY: '3c87374a-8898-4dee-8b10-916b602eee4f',
    API_BASE_URL: 'https://api.cricketdata.org',
    REFRESH_INTERVAL: 30000, // 30 seconds
    ENDPOINTS: {
        currentMatches: '/currentMatches',
        upcomingMatches: '/upcomingMatches',
        matchDetails: '/match'
    }
};

// ===================================
// State Management
// ===================================
const state = {
    todayMatches: [],
    upcomingMatches: [],
    liveMatches: [],
    isLoading: false,
    lastUpdate: null
};

// ===================================
// API Service
// ===================================
class CricketAPI {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async fetchWithAuth(endpoint, params = {}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        url.searchParams.append('apikey', this.apiKey);
        
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Fetch Error:', error);
            // Return mock data for demonstration
            return this.getMockData(endpoint);
        }
    }

    async getCurrentMatches() {
        return await this.fetchWithAuth(CONFIG.ENDPOINTS.currentMatches);
    }

    async getUpcomingMatches() {
        return await this.fetchWithAuth(CONFIG.ENDPOINTS.upcomingMatches);
    }

    async getMatchDetails(matchId) {
        return await this.fetchWithAuth(`${CONFIG.ENDPOINTS.matchDetails}/${matchId}`);
    }

    // Mock data for demonstration when API is unavailable
    getMockData(endpoint) {
        if (endpoint.includes('currentMatches')) {
            return {
                data: [
                    {
                        id: '1',
                        name: 'India vs Australia, 1st Test',
                        matchType: 'TEST',
                        status: 'Live',
                        venue: 'Melbourne Cricket Ground',
                        date: new Date().toISOString(),
                        dateTimeGMT: new Date().toISOString(),
                        teams: ['India', 'Australia'],
                        teamInfo: [
                            { name: 'India', shortname: 'IND', img: '' },
                            { name: 'Australia', shortname: 'AUS', img: '' }
                        ],
                        score: [
                            { r: 285, w: 7, o: 85.4, inning: 'India Innings 1' },
                            { r: 195, w: 10, o: 65.2, inning: 'Australia Innings 1' }
                        ],
                        matchStarted: true,
                        matchEnded: false
                    },
                    {
                        id: '2',
                        name: 'England vs New Zealand, 2nd ODI',
                        matchType: 'ODI',
                        status: 'Live',
                        venue: 'Lord\'s Cricket Ground',
                        date: new Date().toISOString(),
                        dateTimeGMT: new Date().toISOString(),
                        teams: ['England', 'New Zealand'],
                        teamInfo: [
                            { name: 'England', shortname: 'ENG', img: '' },
                            { name: 'New Zealand', shortname: 'NZ', img: '' }
                        ],
                        score: [
                            { r: 312, w: 6, o: 50, inning: 'England Innings 1' },
                            { r: 187, w: 4, o: 32.3, inning: 'New Zealand Innings 1' }
                        ],
                        matchStarted: true,
                        matchEnded: false
                    },
                    {
                        id: '3',
                        name: 'Pakistan vs South Africa, T20I',
                        matchType: 'T20',
                        status: 'Upcoming',
                        venue: 'National Stadium, Karachi',
                        date: new Date(Date.now() + 3600000).toISOString(),
                        dateTimeGMT: new Date(Date.now() + 3600000).toISOString(),
                        teams: ['Pakistan', 'South Africa'],
                        teamInfo: [
                            { name: 'Pakistan', shortname: 'PAK', img: '' },
                            { name: 'South Africa', shortname: 'SA', img: '' }
                        ],
                        score: [],
                        matchStarted: false,
                        matchEnded: false
                    }
                ]
            };
        } else if (endpoint.includes('upcomingMatches')) {
            return {
                data: [
                    {
                        id: '4',
                        name: 'Sri Lanka vs Bangladesh, 1st Test',
                        matchType: 'TEST',
                        status: 'Upcoming',
                        venue: 'Galle International Stadium',
                        date: new Date(Date.now() + 86400000).toISOString(),
                        dateTimeGMT: new Date(Date.now() + 86400000).toISOString(),
                        teams: ['Sri Lanka', 'Bangladesh'],
                        teamInfo: [
                            { name: 'Sri Lanka', shortname: 'SL', img: '' },
                            { name: 'Bangladesh', shortname: 'BAN', img: '' }
                        ],
                        score: [],
                        matchStarted: false,
                        matchEnded: false
                    },
                    {
                        id: '5',
                        name: 'West Indies vs Ireland, ODI Series',
                        matchType: 'ODI',
                        status: 'Upcoming',
                        venue: 'Kensington Oval, Barbados',
                        date: new Date(Date.now() + 172800000).toISOString(),
                        dateTimeGMT: new Date(Date.now() + 172800000).toISOString(),
                        teams: ['West Indies', 'Ireland'],
                        teamInfo: [
                            { name: 'West Indies', shortname: 'WI', img: '' },
                            { name: 'Ireland', shortname: 'IRE', img: '' }
                        ],
                        score: [],
                        matchStarted: false,
                        matchEnded: false
                    }
                ]
            };
        }
        return { data: [] };
    }
}

// ===================================
// UI Rendering Functions
// ===================================
class MatchRenderer {
    static renderMatchCard(match) {
        const isLive = match.status === 'Live' || match.matchStarted && !match.matchEnded;
        const isUpcoming = !match.matchStarted;
        const isCompleted = match.matchEnded;

        const statusClass = isLive ? 'live' : isUpcoming ? 'upcoming' : 'completed';
        const statusText = isLive ? '● Live' : isUpcoming ? 'Upcoming' : 'Completed';

        const team1 = match.teamInfo?.[0] || { name: match.teams?.[0] || 'Team 1', shortname: 'T1' };
        const team2 = match.teamInfo?.[1] || { name: match.teams?.[1] || 'Team 2', shortname: 'T2' };

        const score1 = match.score?.[0] || null;
        const score2 = match.score?.[1] || null;

        const matchTime = this.formatMatchTime(match.dateTimeGMT || match.date);
        const venue = match.venue || 'Venue TBA';

        return `
            <div class="match-card" onclick="navigateToMatch('${match.id}')">
                <div class="match-header">
                    <span class="match-format">${match.matchType || 'Match'}</span>
                    <span class="match-status ${statusClass}">${statusText}</span>
                </div>
                
                <div class="match-teams">
                    <div class="team">
                        <span class="team-name">${team1.name}</span>
                        ${score1 ? `<span class="team-score">${score1.r}/${score1.w}</span>` : ''}
                    </div>
                    <div class="team">
                        <span class="team-name">${team2.name}</span>
                        ${score2 ? `<span class="team-score">${score2.r}/${score2.w}</span>` : ''}
                    </div>
                </div>
                
                <div class="match-info">
                    <div class="info-row">
                        <span class="info-icon">📍</span>
                        <span>${venue}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-icon">🕐</span>
                        <span>${matchTime}</span>
                    </div>
                </div>
                
                ${this.renderStatPreview(match, isLive)}
            </div>
        `;
    }

    static renderStatPreview(match, isLive) {
        if (isLive && match.score && match.score.length > 0) {
            const currentInning = match.score[match.score.length - 1];
            const runRate = currentInning.o > 0 ? (currentInning.r / currentInning.o).toFixed(2) : '0.00';
            
            return `
                <div class="match-stat-preview">
                    <div class="stat-preview-label">Current Run Rate</div>
                    <div class="stat-preview-value">${runRate} runs/over</div>
                </div>
            `;
        } else if (!match.matchStarted) {
            return `
                <div class="match-stat-preview">
                    <div class="stat-preview-label">Match Preview</div>
                    <div class="stat-preview-value">Click for detailed analysis</div>
                </div>
            `;
        }
        return '';
    }

    static formatMatchTime(dateString) {
        if (!dateString) return 'Time TBA';
        
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = date - now;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffMs < 0) {
            return 'Started';
        } else if (diffHours < 1) {
            return `Starts in ${diffMins}m`;
        } else if (diffHours < 24) {
            return `Starts in ${diffHours}h ${diffMins}m`;
        } else {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    static renderEmptyState(message) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">🏏</div>
                <p>${message}</p>
            </div>
        `;
    }
}

// ===================================
// Application Controller
// ===================================
class MatchIntelApp {
    constructor() {
        this.api = new CricketAPI(CONFIG.API_KEY, CONFIG.API_BASE_URL);
        this.refreshInterval = null;
    }

    async initialize() {
        console.log('🏏 MatchIntel initializing...');
        await this.loadMatches();
        this.startAutoRefresh();
        this.setupEventListeners();
    }

    async loadMatches() {
        state.isLoading = true;
        
        try {
            // Fetch current and upcoming matches in parallel
            const [currentData, upcomingData] = await Promise.all([
                this.api.getCurrentMatches(),
                this.api.getUpcomingMatches()
            ]);

            // Process current matches
            const currentMatches = currentData.data || [];
            state.todayMatches = currentMatches;
            state.liveMatches = currentMatches.filter(m => m.matchStarted && !m.matchEnded);

            // Process upcoming matches
            state.upcomingMatches = upcomingData.data || [];

            // Update UI
            this.updateStats();
            this.renderTodayMatches();
            this.renderUpcomingMatches();
            
            state.lastUpdate = new Date();
            console.log('✅ Matches loaded successfully');
        } catch (error) {
            console.error('❌ Error loading matches:', error);
            this.showError();
        } finally {
            state.isLoading = false;
        }
    }

    updateStats() {
        const liveCount = state.liveMatches.length;
        const todayCount = state.todayMatches.length;
        const upcomingCount = state.upcomingMatches.length;

        this.animateCounter('liveMatchCount', liveCount);
        this.animateCounter('todayMatchCount', todayCount);
        this.animateCounter('upcomingMatchCount', upcomingCount);
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const currentValue = parseInt(element.textContent) || 0;
        const duration = 1000;
        const steps = 30;
        const increment = (targetValue - currentValue) / steps;
        let current = currentValue;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            element.textContent = Math.round(current);

            if (step >= steps) {
                element.textContent = targetValue;
                clearInterval(timer);
            }
        }, duration / steps);
    }

    renderTodayMatches() {
        const container = document.getElementById('todayMatchesGrid');
        if (!container) return;

        if (state.todayMatches.length === 0) {
            container.innerHTML = MatchRenderer.renderEmptyState('No matches scheduled for today');
            return;
        }

        container.innerHTML = state.todayMatches
            .map(match => MatchRenderer.renderMatchCard(match))
            .join('');
    }

    renderUpcomingMatches() {
        const container = document.getElementById('upcomingMatchesGrid');
        if (!container) return;

        if (state.upcomingMatches.length === 0) {
            container.innerHTML = MatchRenderer.renderEmptyState('No upcoming matches found');
            return;
        }

        container.innerHTML = state.upcomingMatches
            .map(match => MatchRenderer.renderMatchCard(match))
            .join('');
    }

    showError() {
        const todayContainer = document.getElementById('todayMatchesGrid');
        const upcomingContainer = document.getElementById('upcomingMatchesGrid');
        
        const errorMessage = MatchRenderer.renderEmptyState('Unable to load matches. Please try again later.');
        
        if (todayContainer) todayContainer.innerHTML = errorMessage;
        if (upcomingContainer) upcomingContainer.innerHTML = errorMessage;
    }

    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            console.log('🔄 Auto-refreshing matches...');
            this.loadMatches();
        }, CONFIG.REFRESH_INTERVAL);
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.matches-section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===================================
// Global Functions
// ===================================
function navigateToMatch(matchId) {
    // Navigate to match detail page
    window.location.href = `match.html?id=${matchId}`;
}

// ===================================
// Application Entry Point
// ===================================
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new MatchIntelApp();
    app.initialize();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (app && app.refreshInterval) {
        clearInterval(app.refreshInterval);
    }
});
