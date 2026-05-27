class Player {
  constructor(name, healthId, resId, handId) {
    this.name = name;
    this.health = 15;
    this.resources = 0;
    this.deck = [];
    this.hand = [];
    this.healthEl = document.getElementById(healthId);
    this.resEl = document.getElementById(resId);
    this.handEl = document.getElementById(handId);
  }

  updateStats() {
    this.healthEl.textContent = this.health;
    this.resEl.textContent = this.resources;
  }

  drawCards(num = 3) {
    for (let i = 0; i < num; i++) {
      if (this.deck.length > 0) {
        this.hand.push(this.deck.shift());
      }
    }
    this.renderHand();
  }

  renderHand() {
    this.handEl.innerHTML = "";
    this.hand.forEach((card, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = card.name;
      div.onclick = () => playCard(this, card, index);
      this.handEl.appendChild(div);
    });
  }
}

const cardTypes = {
  ATTACK: "attack",
  DEFENSE: "defense",
  RESOURCE: "resource",
  RAID: "raid",
  ALLIANCE: "alliance"
};

const cards = [
  { name: "Rusty Blade", type: cardTypes.ATTACK, effect: (self, opp) => opp.health -= 1 },
  { name: "Scavenged Rifle", type: cardTypes.ATTACK, effect: (self, opp) => opp.health -= 2 },
  { name: "Makeshift Armor", type: cardTypes.DEFENSE, effect: (self, opp) => self.health += 0 }, // block logic later
  { name: "Water Cache", type: cardTypes.RESOURCE, effect: (self) => self.resources += 2 },
  { name: "Supply Raid", type: cardTypes.RAID, effect: (self, opp) => { opp.resources -= 2; self.resources += 2; } },
  { name: "Raiders Alliance", type: cardTypes.ALLIANCE, cost: 3, effect: (self, opp) => { if (self.resources >= 3) { self.resources -= 3; opp.health -= 4; } } }
];

const p1 = new Player("Nomads", "p1-health", "p1-res", "p1-hand");
const p2 = new Player("Raiders", "p2-health", "p2-res", "p2-hand");

// Give decks (simple clone for now)
p1.deck = [...cards, ...cards];
p2.deck = [...cards, ...cards];

p1.drawCards();
p2.drawCards();

function playCard(player, card, index) {
  const opponent = player === p1 ? p2 : p1;
  card.effect(player, opponent);
  log(`${player.name} played ${card.name}`);
  player.hand.splice(index, 1);
  player.updateStats();
  opponent.updateStats();
  player.renderHand();
  opponent.renderHand();
  checkWin();
}

function log(msg) {
  const logEl = document.getElementById("log");
  logEl.innerHTML += "<br>" + msg;
}

function checkWin() {
  if (p1.health <= 0) {
    log("Raiders win!");
  } else if (p2.health <= 0) {
    log("Nomads win!");
  }
}
