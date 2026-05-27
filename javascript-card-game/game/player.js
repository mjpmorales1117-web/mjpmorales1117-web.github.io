export class Player {
  constructor(name, id, healthId, resId, handId) {
    this.name = name;
    this.id = id; // 👈 store player id ("p1" or "p2")
    this.health = 15;
    this.resources = 0;
    this.deck = [];
    this.hand = [];
    this.block = 0; // 🛡️ defense shield
    this.discard = []; // ♻️ discard pile

    this.healthEl = document.getElementById(healthId);
    this.resEl = document.getElementById(resId);
    this.handEl = document.getElementById(handId);
  }

  // ♻️ Render discard pile
  renderDiscard() {
    const discardEl = document.getElementById(this.id + "-discard");
    discardEl.innerHTML = this.discard
      .map(card => `<div class="card">${card.name}</div>`)
      .join("");
  }

  // 🔄 Update stats on screen
  updateStats() {
    this.healthEl.textContent = this.health;
    this.resEl.textContent = this.resources;
  }

  // 🎴 Draw cards from deck into hand
  drawCards(num = 3, playCardFn) {
    for (let i = 0; i < num; i++) {
      if (this.deck.length > 0) {
        this.hand.push(this.deck.shift());
      }
    }
    this.renderHand(playCardFn);
  }

  // 🎨 Render hand visually with clickable cards
  renderHand(playCardFn) {
    this.handEl.innerHTML = "";
    this.hand.forEach((card, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = card.name;
      div.onclick = () => playCardFn(this, card, index);
      this.handEl.appendChild(div);
    });
  }
}
