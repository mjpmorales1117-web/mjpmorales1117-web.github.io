import { Player } from "./player.js";
import { cards } from "./cards.js";
import { log } from "./ui.js";

const p1 = new Player("Nomads", "p1-health", "p1-res", "p1-hand");
const p2 = new Player("Raiders", "p2-health", "p2-res", "p2-hand");

p1.deck = [...cards, ...cards];
p2.deck = [...cards, ...cards];

let currentPlayer = p1; // Nomads start first

// Main function that handles playing a card
export function playCard(player, card, index) {
  if (player !== currentPlayer) {
    log(`${player.name} cannot play, it's not their turn.`);
    return;
  }

  const opponent = player === p1 ? p2 : p1;

  if (card.type === "attack") {
    if (opponent.block > 0) {
      log(`${opponent.name} blocked the attack!`);
      opponent.block -= 1;
    } else {
      opponent.health -= (card.name === "Scavenged Rifle" ? 2 : 1);
    }
  } else {
    card.effect(player, opponent);
  }

  log(`${player.name} played ${card.name}`);
  player.hand.splice(index, 1);

  player.updateStats();
  opponent.updateStats();

  // 🎨 Refresh hands visually
  player.renderHand(playCard);
  opponent.renderHand(playCard);

  // 🏆 Check win condition
  checkWin();

  // 🔄 Switch turn to opponent
  currentPlayer = opponent;

  // ✅ Debug: show whose turn it is
  log(`It is now ${currentPlayer.name}'s turn.`);

  // 🌟 Update visual indicator
  updateTurnIndicator();
}

// ✅ Now call drawCards AFTER playCard exists
p1.drawCards(3, playCard);
p2.drawCards(3, playCard);

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
