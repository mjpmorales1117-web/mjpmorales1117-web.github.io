export class Player {
  constructor(name, healthId, resId, handId) {
    this.name = name;
    this.health = 15;
    this.resources = 0;
    this.deck = [];
    this.hand = [];
    this.block = 0; // 🛡️ defense shield
    this.healthEl = document.getElementById(healthId);
    this.resEl = document.getElementById(resId);
    this.handEl = document.getElementById(handId);
    this.discard = [];
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
    // Render hand after drawing
    this.renderHand(playCardFn);
  }

  // 🎨 Render hand visually with clickable cards
  renderHand(playCardFn) {
    this.handEl.innerHTML = "";
    this.hand.forEach((card, index) => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = card.name;
      // Attach click handler using playCardFn
      div.onclick = () => playCardFn(this, card, index);
      this.handEl.appendChild(div);
    });
  }
}
