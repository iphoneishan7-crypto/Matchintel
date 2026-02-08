// ===================================
// Configuration & Constants
// ===================================
const CONFIG = {
    API_KEY: '3c87374a-8898-4dee-8b10-916b602eee4f',
    API_BASE_URL: 'https://cricketdata.org/api',
    REFRESH_INTERVAL: 30000
};

// ===================================
// Utils
// ===================================
function getMatchIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// ===================================
// API Service
// ===================================
class CricketAPI {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    async fetchMatchDetails(matchId) {
        try {
            // CricketData reliable approach:
            // fetch matches list → find match by id
            const url = `${this.baseUrl}/matches?apikey=${this.apiKey}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error('Failed to fetch matches');

            const data = await res.json();
            if (!data || !data.matches) throw new Error('Invalid API response');

            const match = data.matches.find(
                m => String(m.id) === String(matchId)
            );

            if (!match) {
                console.warn('Match not found, using mock data');
                return this.getMockMatchData(matchId);
            }

            return {
                id: match.id,
                name: match.name,
                matchType: match.matchType || 'Match',
                venue: match.venue || 'TBA',
                date: match.date,
                dateTimeGMT: match.dateTimeGMT,
                teams: match.teams,
                teamInfo: match.teamInfo || [
                    { name: match.teams[0] },
                    { name: match.teams[1] }
                ],
                score: match.score || [],
                matchStarted: match.matchStarted,
                matchEnded: match.matchEnded,
                toss: match.toss,
                series: match.series || ''
            };
        } catch (err) {
            console.error('API error:', err);
            return this.getMockMatchData(matchId);
        }
    }

    getMockMatchData(matchId) {
        return {
            id: matchId,
            name: 'India vs Australia, 1st Test',
            matchType: 'TEST',
            venue: 'Melbourne Cricket Ground',
            dateTimeGMT: new Date().toISOString(),
            teams: ['India', 'Australia'],
            teamInfo: [
                { name: 'India' },
                { name: 'Australia' }
            ],
            score: [
                { r: 285, w: 7, o: 85.4, inning: 'India Innings' }
            ],
            matchStarted: true,
            matchEnded: false,
            toss: { text: 'India won the toss and elected to bat' },
            series: 'Border-Gavaskar Trophy 2026'
        };
    }
}

// ===================================
// Renderer
// ===================================
class MatchRenderer {
    static scoreCard(match) {
        if (!match.score.length) {
            return `<div class="empty-state">Match not started</div>`;
        }

        return match.score.map(s => `
            <div class="score-row">
                <strong>${s.inning}</strong>
                <span>${s.r}/${s.w} (${s.o})</span>
            </div>
        `).join('');
    }

    static matchInfo(match) {
        const d = new Date(match.dateTimeGMT);
        return `
            <div class="info-card"><b>Venue</b><span>${match.venue}</span></div>
            <div class="info-card"><b>Date</b><span>${d.toDateString()}</span></div>
            <div class="info-card"><b>Time</b><span>${d.toLocaleTimeString()}</span></div>
            ${match.toss ? `<div class="info-card"><b>Toss</b><span>${match.toss.text}</span></div>` : ''}
            ${match.series ? `<div class="info-card"><b>Series</b><span>${match.series}</span></div>` : ''}
        `;
    }
}

// ===================================
// App Controller
// ===================================
class MatchApp {
    constructor() {
        this.api = new CricketAPI(CONFIG.API_KEY, CONFIG.API_BASE_URL);
        this.matchId = getMatchIdFromURL();
        this.interval = null;
    }

    async init() {
        if (!this.matchId) {
            this.showError('No match ID provided');
            return;
        }

        await this.load();

        if (this.match.matchStarted && !this.match.matchEnded) {
            this.interval = setInterval(() => this.load(), CONFIG.REFRESH_INTERVAL);
        }
    }

    async load() {
        this.match = await this.api.fetchMatchDetails(this.matchId);
        this.render();
    }

    render() {
        document.title = `${this.match.name} - MatchIntel`;
        document.getElementById('matchTitle').textContent = this.match.name;

        document.getElementById('scoreCard').innerHTML =
            MatchRenderer.scoreCard(this.match);

        document.getElementById('matchInfoGrid').innerHTML =
            MatchRenderer.matchInfo(this.match);

        document.getElementById('matchFormat').textContent =
            this.match.matchType;

        const status = document.getElementById('matchStatus');
        const live = this.match.matchStarted && !this.match.matchEnded;
        status.textContent = live ? '● Live' : 'Completed';
        status.className = `match-status-badge ${live ? 'live' : 'completed'}`;
    }

    showError(msg) {
        document.getElementById('scoreCard').innerHTML = `
            <div class="empty-state">${msg}</div>
        `;
    }
}

// ===================================
// Boot
// ===================================
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new MatchApp();
    app.init();
});

window.addEventListener('beforeunload', () => {
    if (app && app.interval) clearInterval(app.interval);
});
