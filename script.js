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

function loadFixtures() {
  document.getElementById("fixtures-content").innerHTML = "<p style='padding:1rem;'>Loading Fixtures...</p>";
  fetch(`${BASE_URL}/Fixtures`)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.length) {
        document.getElementById("fixtures-content").innerHTML = "<p style='padding:1rem;'>No Fixtures Available</p>";
        return;
      }
      const accentColor = getComputedStyle(document.documentElement)
                            .getPropertyValue('--accent').trim();
      const html = data.map(match => `
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
      `).join('');
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
  showRandomQuote();
  setInterval(() => {
    loadFixtures();
    showRandomQuote();
  }, 30000);
});
