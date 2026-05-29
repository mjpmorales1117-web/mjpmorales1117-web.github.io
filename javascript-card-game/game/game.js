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

// Main function that handles playing a card
export function playCard(player, card, index) {
  if (player !== currentPlayer) {
    log(`${player.name} cannot play, it's not their turn.`);
    return;
  }

  // 🤖 Trigger AI if Raiders are up and have cards
  if (currentPlayer === p2 && p2.hand.length > 0) {
  setTimeout(() => ai.takeTurn(), 1000);
  }

  const opponent = player === p1 ? p2 : p1;

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
  player.discard.push(card);
  player.renderDiscard();
  player.hand.splice(index, 1);

  player.updateStats();
  opponent.updateStats();

  player.renderHand(playCard);
  opponent.renderHand(playCard);

  checkWin();

  currentPlayer = opponent;
  log(`It is now ${currentPlayer.name}'s turn.`);
  updateTurnIndicator();

  // 🤖 Trigger AI if Raiders are up
  if (currentPlayer === p2) {
    setTimeout(() => ai.takeTurn(), 1000);
  }
} // <-- close playCard here

// ✅ Run setup only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  p1.drawCards(3, playCard);
  p2.drawCards(3, playCard);
  updateTurnIndicator();
});

function checkWin() {
  if (p1.health <= 0) log("Raiders win!");
  else if (p2.health <= 0) log("Nomads win!");
}

// ✅ Place the Next Round handler here, at the bottom
document.getElementById("next-round").onclick = () => {
  p1.drawCards(3, playCard);
  p2.drawCards(3, playCard);
  log("New round begins!");
  currentPlayer = p1; // reset turn to Nomads
  updateTurnIndicator(); // 🌟 highlight Nomads
};

function updateTurnIndicator() {
  document.querySelectorAll(".player").forEach(el => el.classList.remove("active"));
  if (currentPlayer === p1) {
    document.getElementById("p1").classList.add("active");
  } else {
    document.getElementById("p2").classList.add("active");
  }
}

console.log("Nomads deck size:", p1.deck.length);
console.log("Raiders deck size:", p2.deck.length);
