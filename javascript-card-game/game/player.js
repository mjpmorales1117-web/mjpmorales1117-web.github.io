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
    this.field = new Array(5).fill(null); // ✅ 5 slots ready

    this.healthEl = document.getElementById(healthId);
    this.resEl = document.getElementById(resId);
    this.handEl = document.getElementById(handId);
    this.fieldEl = document.querySelector(`#${id} .field`); // reference to field slots
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
      if (this.deck.length === 0 && this.discard.length > 0) {
        this.deck = this.shuffle(this.discard);
        this.discard = [];
        this.renderDiscard();
      }
      if (this.deck.length > 0) {
        this.hand.push(this.deck.shift());
      }
    }
    this.renderHand(playCardFn);

    // ✅ logs go here
    console.log(this.name, "deck before draw:", this.deck.length);
    console.log(this.name, "discard before draw:", this.discard.length);
    console.log(this.name, "hand after draw:", this.hand.map(c => c.name));
  }

  renderHand(playCardFn) {
    this.handEl.innerHTML = "";
    this.hand.forEach((card, index) => {
      const div = document.createElement("div");
      div.className = `card ${card.rarity}`;
      div.textContent = card.name;
      div.onclick = () => playCardFn(this, card, index);
      this.handEl.appendChild(div);
    });
  }

  renderField() {
    const slots = this.fieldEl.querySelectorAll(".slot");
    slots.forEach((slot, i) => {
      slot.innerHTML = "";
      if (this.field[i]) {
        const card = this.field[i];
        const cardEl = document.createElement("div");
        cardEl.className = `card ${card.rarity || "common"}`;
        cardEl.textContent = card.name;
        slot.appendChild(cardEl);
      }
    });
    // Debug log
    console.log("renderField", this.name, "cards:", this.field.map(c => c?.name || null));
  }
}
