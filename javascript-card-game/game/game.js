import { Player } from "./player.js";
import { cards } from "./cards.js";
import { log } from "./ui.js";

const p1 = new Player("Nomads", "p1-health", "p1-res", "p1-hand");
const p2 = new Player("Raiders", "p2-health", "p2-res", "p2-hand");

p1.deck = [...cards, ...cards];
p2.deck = [...cards, ...cards];

p1.drawCards();
p2.drawCards();

let currentPlayer = p1; // Nomads start first

// Main function that handles playing a card
export function playCard(player, card, index) {
  // ✅ Turn enforcement: only the current player can act
  if (player !== currentPlayer) {
    log(`${player.name} cannot play, it's not their turn.`);
    return; // stop if wrong player tries to play
  }

  // ✅ Identify opponent: simple two-player setup
  // ⚠️ Future pointer: if you add more players, replace this with a function that cycles through a player list
  const opponent = player === p1 ? p2 : p1;

  // ✅ Combat resolution
  if (card.type === "attack") {
    // 🛡️ Defense check: if opponent has a block, cancel the attack
    if (opponent.block > 0) {
      log(`${opponent.name} blocked the attack!`);
      opponent.block -= 1; // consume one block
    } else {
      // ⚔️ Damage calculation: basic attack vs rifle
      opponent.health -= (card.name === "Scavenged Rifle" ? 2 : 1);
      // ⚠️ Future pointer: replace this with card.damage property for easier balancing
    }
  } else {
    // 📦 Non-attack cards just run their effect (resource gain, raid, alliance, etc.)
    card.effect(player, opponent);
  }

  // 📝 Narration: log what happened
  log(`${player.name} played ${card.name}`);

  // 🗑️ Remove card from hand
  // ⚠️ Future pointer: instead of deleting, push into a discard pile for revive mechanics
  player.hand.splice(index, 1);

  // 🔄 Update stats on screen
  player.updateStats();
  opponent.updateStats();

  // 🎨 Refresh hands visually
  // ⚠️ Future pointer: add animations here (fade out card, slide to discard pile, etc.)
  player.renderHand(playCard);
  opponent.renderHand(playCard);

  // 🏆 Check win condition
  checkWin();

  // 🔄 Switch turn to opponent
  // ⚠️ Future pointer: if you add "extra turn" cards, adjust this logic
  currentPlayer = opponent;
}
