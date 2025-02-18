const sheetId = "1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo";
const groups = ["Group A", "Group B", "Group C"];
const fixturesSheet = "Fixtures";

// Fetch and display groups in correct order
async function fetchPoints() {
    const container = document.getElementById("groups");
    container.innerHTML = "";

    for (let group of groups) {
        const url = `https://opensheet.elk.sh/${sheetId}/${group}`;
        const response = await fetch(url);
        const data = await response.json();

        let tableHTML = `<h2>${group}</h2><table><tr>
            <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr>`;

        data.forEach(team => {
            tableHTML += `<tr>
                <td>${team.Team}</td>
                <td>${team.P}</td>
                <td>${team.W}</td>
                <td>${team.D}</td>
                <td>${team.L}</td>
                <td>${team.GF}</td>
                <td>${team.GA}</td>
                <td>${team.GD}</td>
                <td>${team.Pts}</td>
            </tr>`;
        });

        tableHTML += `</table>`;
        container.innerHTML += tableHTML;
    }
}

// Fetch and display fixtures
async function fetchFixtures() {
    const url = `https://opensheet.elk.sh/${sheetId}/${fixturesSheet}`;
    const response = await fetch(url);
    const data = await response.json();
    
    let fixturesHTML = `<h2>Fixtures</h2>`;

    data.forEach((match, index) => {
        fixturesHTML += `<div class="match">
            <p><strong>(${index + 1}) ${match.Team1}</strong> vs <strong>${match.Team2}</strong></p>
            <p>⏰ ${match.Time} | 📍 ${match.Venue}</p>
            <p>Score: <strong>${match.Score || "TBD"}</strong></p>
        </div>`;
    });

    document.getElementById("fixtures-list").innerHTML = fixturesHTML;
}

// Switch tabs
function showTab(tab) {
    document.getElementById("points").style.display = tab === "points" ? "block" : "none";
    document.getElementById("fixtures").style.display = tab === "fixtures" ? "block" : "none";
}

// Random quote generator for footer
const quotes = [
    "Champions keep playing until they get it right.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Success is no accident. It’s hard work and persistence.",
    "Football is a game of mistakes. Whoever makes the fewest wins."
];
document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];

// Fetch data on load
fetchPoints();
fetchFixtures();
