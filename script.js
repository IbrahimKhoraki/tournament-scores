document.addEventListener("DOMContentLoaded", function() {
    fetchStandings();
    fetchFixtures();
});

// ✅ Fetch Standings from Google Sheets
function fetchStandings() {
    fetch("https://opensheet.elk.sh/1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo/Group%20A")
        .then(response => response.json())
        .then(data => renderStandings(data, "A"));

    fetch("https://opensheet.elk.sh/1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo/Group%20B")
        .then(response => response.json())
        .then(data => renderStandings(data, "B"));

    fetch("https://opensheet.elk.sh/1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo/Group%20C")
        .then(response => response.json())
        .then(data => renderStandings(data, "C"));
}

// ✅ Render Standings
function renderStandings(data, group) {
    const container = document.getElementById("group-standings");
    const card = document.createElement("div");
    card.classList.add("group-card");
    card.setAttribute("data-group", group);
    
    let tableHTML = `<h2>Group ${group}</h2><table><tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th></tr>`;
    
    data.forEach(team => {
        tableHTML += `<tr><td>${team.Team}</td><td>${team.P}</td><td>${team.W}</td><td>${team.D}</td><td>${team.L}</td><td>${team.GF}</td><td>${team.GA}</td><td>${team.Pts}</td></tr>`;
    });

    tableHTML += `</table>`;
    card.innerHTML = tableHTML;
    container.appendChild(card);
}

// ✅ Fetch Fixtures from Google Sheets
function fetchFixtures() {
    fetch("https://opensheet.elk.sh/1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo/Fixtures")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("fixtures-list");
            data.forEach((match, index) => {
                const fixtureHTML = `<div class="fixture"><span class="fixture-number">(${index + 1})</span> ${match.Team1} vs ${match.Team2} - ${match.Time} @ ${match.Venue}</div>`;
                container.innerHTML += fixtureHTML;
            });
        });
}

// ✅ Tab Switching
function showTab(tab) {
    document.getElementById("groups").style.display = tab === "groups" ? "block" : "none";
    document.getElementById("fixtures").style.display = tab === "fixtures" ? "block" : "none";
}
