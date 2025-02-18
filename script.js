const SHEET_ID = "1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo";
const BASE_URL = `https://opensheet.elk.sh/${SHEET_ID}`;

// Load Standings in Correct Order
async function loadStandings() {
    try {
        const groups = ["Group A", "Group B", "Group C"];
        let html = '<div class="groups-container">';

        for (const group of groups) {
            const response = await fetch(`${BASE_URL}/${group}`);
            if (!response.ok) throw new Error(`Failed to fetch data for ${group}`);
            
            const data = await response.json();

            const tableRows = data.map(team => `
                <tr>
                    <td>${team['Team Name']}</td>
                    <td>${team.P}</td>
                    <td>${team.W}</td>
                    <td>${team.D}</td>
                    <td>${team.L}</td>
                    <td>${team.GF}</td>
                    <td>${team.GA}</td>
                    <td>${team.GD}</td>
                    <td>${team.PTS}</td>
                </tr>
            `).join('');

            html += `
                <div class="group-card">
                    <h3>${group}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th style="min-width: 100px;">Team</th>
                                <th style="min-width: 40px;">P</th>
                                <th style="min-width: 40px;">W</th>
                                <th style="min-width: 40px;">D</th>
                                <th style="min-width: 40px;">L</th>
                                <th style="min-width: 40px;">GF</th>
                                <th style="min-width: 40px;">GA</th>
                                <th style="min-width: 40px;">GD</th>
                                <th style="min-width: 40px;">PTS</th>
                            </tr>
                        </thead>
                        <tbody>${tableRows}</tbody>
                    </table>
                </div>
            `;
        }
        
        html += '</div>';
        document.getElementById("standings-content").innerHTML = html;

    } catch (error) {
        console.error('Error loading standings:', error);
    }
}

// Load Fixtures
async function loadFixtures() {
    try {
        const response = await fetch(`${BASE_URL}/Fixtures`);
        if (!response.ok) throw new Error("Failed to fetch fixtures data");

        const data = await response.json();

        const html = data.map(match => `
            <div class="fixture-card">
                <div style="text-align: right; font-size: 1.1rem;">${match['Team 1']}</div>
                <div style="text-align: center">
                    <div class="vs-badge">VS</div>
                    <div style="margin-top: 8px; color: var(--accent);">
                        ${match['Time']} ⚽ ${match['Venue']}
                    </div>
                </div>
                <div style="text-align: left; font-size: 1.1rem;">${match['Team 2']}</div>
            </div>
        `).join('');

        document.getElementById("fixtures-content").innerHTML = html;

    } catch (error) {
        console.error('Error loading fixtures:', error);
    }
}

// Show Random Quote
function showRandomQuote() {
    const randomQuote = FOOTBALL_QUOTES[Math.floor(Math.random() * FOOTBALL_QUOTES.length)];
    document.getElementById('quote-container').innerHTML = `
        <p class="pulse">"${randomQuote.quote}"</p>
        <p style="margin-top: 0.5rem; color: var(--accent);">– ${randomQuote.author}</p>
    `;
}

// Tab Navigation
function showTab(tab) {
    document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
    document.getElementById(tab).style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.textContent.toLowerCase() === tab);
    });
}

// Ensure everything loads only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadStandings();
    loadFixtures();
    showRandomQuote();
    showTab('standings');

    // Refresh every 30 seconds
    setInterval(() => {
        loadStandings();
        loadFixtures();
        showRandomQuote();
    }, 30000);
});
