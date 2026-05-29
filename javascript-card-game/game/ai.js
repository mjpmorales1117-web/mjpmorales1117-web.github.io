import { playCard } from "./game.js/";

export class EnemyAI {
  constructor(player, opponent) {
    this.player = player;
    this.opponent = opponent;
  }

  takeTurn() {
    // Simple priority system
    let choseIndex = this.player.hand.findIndex(card => {
      if (card.type === "attack" && this.opponent.block === 0) return true;
      if (card.type === "defense" && this.player.health <= 5) return true;
      if (card.type === "resource" && this.player.resources < 3) return true;
      if (card.type === "raid" && this.opponent.resources >= 2) return true;
      if (card.type === "alliance" && this.player.resource >= (card.cost || 0)) return true;
      return false;
    });

    if (chosenIndex === -1) chosenIndex = 0; // fallback

    const chosenCard = this.player.hand[chosenIndex];
    playCard(this.player, chosenCard, chosenIndex);
  }
}
      
