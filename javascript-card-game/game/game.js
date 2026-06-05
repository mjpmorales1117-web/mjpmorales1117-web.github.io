import { Player } from "./player.js";
import { cards, buildDeck } from "./cards.js";
import { log } from "./ui.js";
import { EnemyAI } from "./ai.js";

const p1 = new Player("Nomads", "p1",  "p1-health", "p1-res", "p1-hand");
const p2 = new Player("Raiders", "p2", "p2-health", "p2-res", "p2-hand");
const ai = new EnemyAI(p2, p1);

p1.deck = buildDeck(cards);
p2.deck = buildDeck(cards);

console.log("Nomads deck size:", p1.deck.length);
console.log("Raiders deck size:", p2.deck.length);

let currentPlayer = p1; // Nomads start first

export function playCard(player, card, index) {
  if (player !== currentPlayer) {
    log(`${player.name} cannot play, it's not their turn.`);
    return;
  }

  const opponent = player === p1 ? p2 : p1;

  // Apply effect logic
  if (card.type === "attack") {
    if (opponent.block > 0) {
      log(`${opponent.name} blocked the attack!`);
      opponent.block -= 1;
    } else {
      card.effect(player, opponent);
    }
  } else {
    card.effect(player, opponent);
  }

  log(`${player.name} played ${card.name}`);

  // ✅ Place card into field if slot available
  const emptyIndex = player.field.findIndex(f => f === null);
  if (emptyIndex !== -1) {
    player.field[emptyIndex] = card;
    player.renderField(); // update slots
  } else {
    // if no empty slot, send to discard
    player.discard.push(card);
    player.renderDiscard();
  }

  // Remove from hand
  player.hand.splice(index, 1);

  // Update visuals
  player.updateStats();
  opponent.updateStats();

  player.renderHand(playCard);
  opponent.renderHand(playCard);

  checkWin();

  currentPlayer = opponent;
  log(`It is now ${currentPlayer.name}'s turn.`);
  updateTurnIndicator();

  // 🤖 Trigger AI if Raiders are up
  if (currentPlayer === p2 && p2.hand.length > 0) {
    setTimeout(() => ai.takeTurn(), 1000);
  }
}
