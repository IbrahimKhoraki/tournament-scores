const SHEET_ID = "1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo"; // Your Google Sheet ID
const BASE_URL = `https://opensheet.elk.sh/${SHEET_ID}`;

// Load Standings
function loadStandings() {
    const groups = ["Group A", "Group B", "Group C"];
    let html = "";

    groups.forEach(group => {
        fetch(`${BASE_URL}/${group}`)
            .then(response => response.json())
            .then(data => {
                let tableRows = "";
                data.forEach(team => {
                    tableRows += `
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
                    `;
                });

                html += `
                    <div class="group-card">
                        <h3>${group}</h3>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th>
                                    <th>GF</th><th>GA</th><th>GD</th><th>PTS</th>
                                </tr>
                            </thead>
                            <tbody>${tableRows}</tbody>
                        </table>
                    </div>
                `;

                document.getElementById("standings-content").innerHTML = html;
            });
    });
}

// Load Fixtures
function loadFixtures() {
    fetch(`${BASE_URL}/Fixtures`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            data.forEach(match => {
                html += `
                    <div class="fixture-card">
                        <div class="match">
                            <span class="team">${match['Team 1']}</span> 
                            <span class="vs">vs</span> 
                            <span class="team">${match['Team 2']}</span>
                        </div>
                        <div class="details">
                            <span class="time">${match['Time']}</span> |
                            <span class="venue">${match['Venue']}</span>
                        </div>
                    </div>
                `;
            });

            document.getElementById("fixtures-content").innerHTML = html;
        });
}

// Tab switching function
function showTab(tab) {
    document.getElementById("standings").style.display = tab === 'standings' ? "block" : "none";
    document.getElementById("fixtures").style.display = tab === 'fixtures' ? "block" : "none";
}

// Load Data on Startup
document.addEventListener("DOMContentLoaded", () => {
    loadStandings();
    loadFixtures();
    showTab('standings'); // Default to standings
    setInterval(loadStandings, 30000);
    setInterval(loadFixtures, 30000);
});
