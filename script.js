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
  const groups = ["Group A", "Group B", "Group C"];
  // Create an array of promises for each group fetch.
  const promises = groups.map(group => {
    return fetch(`${BASE_URL}/${group}`)
      .then(response => response.json())
      .then(data => {
        if (!data.length) return "";
        // Sort teams so that the highest points (PTS) comes first.
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
        return `
          <div class="group-card">
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
          </div>
        `;
      })
      .catch(error => {
        console.error('Error loading standings:', error);
        return "";
      });
  });
  // Once all promises resolve, join the results in the order of the groups array.
  Promise.all(promises).then(results => {
    document.getElementById("standings-content").innerHTML = results.join('');
  });
}

function loadFixtures() {
  fetch(`${BASE_URL}/Fixtures`)
    .then(response => response.json())
    .then(data => {
      if (!data.length) return;
      const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      const html = data.map(match => `
        <div class="fixture-card">
          <!-- Left column: Team 1 -->
          <div style="text-align: right; font-size: 1.1rem;">
            ${match['Team 1']}
          </div>
          <!-- Center column: vs badge, time/venue, and score -->
          <div style="text-align: center;">
            <div class="vs-badge">VS</div>
            <!-- Additional spacing between time & venue -->
            <div style="color: ${accentColor}; margin: 0.3rem 0;">
              ${match['Time']} &nbsp;&nbsp;⚽&nbsp;&nbsp;${match['Venue']}
            </div>
            <!-- Margin added above the score for clearer spacing -->
            <div style="font-size: 1.1rem; margin-top: 0.3rem;">
              ${match['Score']}
            </div>
          </div>
          <!-- Right column: Team 2 -->
          <div style="text-align: left; font-size: 1.1rem;">
            ${match['Team 2']}
          </div>
        </div>
      `).join('');
      document.getElementById("fixtures-content").innerHTML = html;
    })
    .catch(error => console.error('Error loading fixtures:', error));
}

function showRandomQuote() {
  const randomQuote = FOOTBALL_QUOTES[Math.floor(Math.random() * FOOTBALL_QUOTES.length)];
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  document.getElementById('quote-container').innerHTML = `
    <p class="pulse">"${randomQuote.quote}"</p>
    <p style="margin-top: 0.5rem; color: ${accentColor};">– ${randomQuote.author}</p>
    <p style="font-size: 0.9rem; margin-top: 1rem; font-family: 'Lora', serif; font-style: normal;">
      The scoreboard refreshes automatically every 30 seconds. If the latest scores are not visible, please refresh your browser.
    </p>
  `;
}

function showTab(tab) {
  document.querySelectorAll('.content').forEach(el => el.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute("onclick").includes(tab));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadStandings();
  loadFixtures();
  showRandomQuote();
  showTab('standings');
  setInterval(() => {
    loadStandings();
    loadFixtures();
    showRandomQuote();
  }, 30000);
});
