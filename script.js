const SHEET_ID = "1iIvuXpvHRg0nVquJ38LVQZAjpFYjampoVGiK-5fwmQo";
const BASE_URL = `https://opensheet.elk.sh/${SHEET_ID}`;

// Football quotes array
const FOOTBALL_QUOTES = [
  { quote: "The harder the battle, the sweeter the victory.", author: "Unknown" },
  { quote: "Success is no accident. It is hard work, perseverance, learning, sacrifice and most of all, love of what you are doing.", author: "Pelé" },
  { quote: "You can't get anywhere without sacrifice. I sacrificed many things - but when you achieve your goals, it's all worth it.", author: "Cristiano Ronaldo" },
  { quote: "Talent without working hard is nothing.", author: "Lionel Messi" },
  { quote: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
  { quote: "If you don't believe you're the best, then you will never achieve all that you're capable of.", author: "Cristiano Ronaldo" },
  { quote: "I always work hard, no matter who I'm facing. I never underestimate any opponent.", author: "Neymar Jr." },
  { quote: "The difference between the impossible and the possible lies in a person's determination.", author: "Tommy Lasorda" },
  { quote: "Persistence can change failure into extraordinary achievement.", author: "Maradona" },
  { quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it.", author: "Lionel Messi" }
];

function loadStandings() {
  document.getElementById("standings-content").innerHTML = "<p style='padding:1rem;'>Loading Standings...</p>";
  const groups = ["Group A", "Group B", "Group C"];
  const promises = groups.map(group => {
    return fetch(`${BASE_URL}/${group}`)
      .then(response => response.json())
      .then(data => {
        if (!data || !data.length) {
          return `<div class="group-card">
                    <h3 style="padding: 1rem; margin: 0; font-size: 2rem;">${group}</h3>
                    <p style="padding: 1rem;">No Data Available</p>
                  </div>`;
        }
        data.sort((a, b) => parseInt(b.PTS) - parseInt(a.PTS));
        const tableRows = data.map(team => `
          <tr>
            <td class="team-name">${team['Team Name']}</td>
            <td>${team.P}</td>
            <td>${team.W}</td>
            <td>${team.D}</td>
            <td>${team.L}</td>
            <td>${team.GF}</td>
            <td>${team.GA}</td>
            <td>${team.GD}</td>
            <td class="pts-cell">${team.PTS}</td>
          </tr>
        `).join('');
        return `<div class="group-card">
                  <h3 style="padding: 1rem; margin: 0; font-size: 2rem;">${group}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th>
                        <th>GF</th><th>GA</th><th>GD</th><th>PTS</th>
                      </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                  </table>
                </div>`;
      })
      .catch(error => {
        console.error('Error loading standings for', group, error);
        return `<div class="group-card">
                  <h3 style="padding: 1rem; margin: 0; font-size: 2rem;">${group}</h3>
                  <p style="padding: 1rem;">Error loading data</p>
                </div>`;
      });
  });
  Promise.all(promises).then(results => {
    let content = results.join('');
    if (!content.trim()) {
      content = "<p style='padding:1rem;'>No Standings Data Available</p>";
    }
    document.getElementById("standings-content").innerHTML = content;
  });
}

function loadFixtures() {
  document.getElementById("fixtures-content").innerHTML = "<p style='padding:1rem;'>Loading Fixtures...</p>";
  fetch(`${BASE_URL}/Fixtures`)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.length) {
        document.getElementById("fixtures-content").innerHTML = "<p style='padding:1rem;'>No Fixtures Available</p>";
        return;
      }
      // Display only the first fixture card
      const match = data[0];
      const accentColor = getComputedStyle(document.documentElement)
                            .getPropertyValue('--accent').trim();
      const html = `
        <div class="fixture-card">
          <!-- Left column: Team 1 -->
          <div style="text-align: right; font-size: 1.1rem;">
            ${match['Team 1']}
          </div>
          <!-- Center column: wrapped in center-container -->
          <div class="center-column" style="text-align: center;">
            <div class="center-container">
              <div style="color: ${accentColor};">
                ${match['Time']} &nbsp;&nbsp;⚽&nbsp;&nbsp;${match['Venue']}
              </div>
              <div class="score" style="font-size: 1.1rem; margin-top: 0.3rem;">
                ${match['Score']}
              </div>
            </div>
          </div>
          <!-- Right column: Team 2 -->
          <div style="text-align: left; font-size: 1.1rem;">
            ${match['Team 2']}
          </div>
        </div>
      `;
      document.getElementById("fixtures-content").innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading fixtures:', error);
      document.getElementById("fixtures-content").innerHTML = "<p style='padding:1rem;'>Error loading fixtures</p>";
    });
}

function showRandomQuote() {
  const randomQuote = FOOTBALL_QUOTES[Math.floor(Math.random() * FOOTBALL_QUOTES.length)];
  const accentColor = getComputedStyle(document.documentElement)
                        .getPropertyValue('--accent').trim();
  document.getElementById('quote-container').innerHTML = `
    <p class="pulse">"${randomQuote.quote}"</p>
    <p style="margin-top: 0.5rem; color: ${accentColor};">– ${randomQuote.author}</p>
    <p style="font-size: 0.9rem; margin-top: 1rem; font-family: 'Lora', serif; font-style: normal;">
      The scoreboard refreshes automatically every 30 seconds. If the latest scores are not visible, please refresh your browser.
    </p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  loadFixtures();
  loadStandings();
  showRandomQuote();
  setInterval(() => {
    loadFixtures();
    loadStandings();
    showRandomQuote();
  }, 30000);
});
