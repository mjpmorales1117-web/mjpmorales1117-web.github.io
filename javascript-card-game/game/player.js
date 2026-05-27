export class Player {
  constructor(name, healthId, resId, handId) {
    this.name = name;
    this.health = 15;
    this.resources = 0;
    this.deck = [];
    this.hand = [];
    this.block = 0; // defense mechanic
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
