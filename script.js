const SHEET_ID = "1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo";
const BASE_URL = `https://opensheet.elk.sh/${SHEET_ID}`;

// Load Standings
function loadStandings() {
    const groups = ['A', 'B', 'C'];
    let standingsHtml = '';

    groups.forEach(group => {
        $.getJSON(`${BASE_URL}/Group%20${group}`, data => {
            let tableHtml = `
                <div class="card">
                    <h3>Group ${group}</h3>
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th>
                                <th>GF</th><th>GA</th><th>GD</th><th>PTS</th>
                            </tr>
                        </thead>
                        <tbody>`;

            data.forEach(team => {
                tableHtml += `
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
                    </tr>`;
            });

            tableHtml += `</tbody></table></div>`;
            standingsHtml += tableHtml;
            $("#groups").html(standingsHtml);
        });
    });
}

// Load Fixtures
function loadFixtures() {
    $.getJSON(`${BASE_URL}/Fixtures`, data => {
        let fixturesHtml = '';

        data.forEach(match => {
            fixturesHtml += `
                <div class="fixture">
                    <strong>${match["Team 1"]}</strong> vs <strong>${match["Team 2"]}</strong>
                    <br>Time: ${match["Time"]}
                    <br>Venue: ${match["Venue"]}
                    <br>Score: ${match["Score"] || "TBD"}
                </div>`;
        });

        $("#fixturesList").html(fixturesHtml);
    });
}

// Load Data
$(document).ready(() => {
    loadStandings();
    loadFixtures();
    setInterval(() => {
        loadStandings();
        loadFixtures();
    }, 30000);
});
