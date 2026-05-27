import { Player } from "./player.js";
import { cards } from "./cards.js";
import { log } from "./ui.js";

const p1 = new Player("Nomads", "p1-health", "p1-res", "p1-hand");
const p2 = new Player("Raiders", "p2-health", "p2-res", "p2-hand");

p1.deck = [...cards, ...cards];
p2.deck = [...cards, ...cards];

p1.drawCards();
p2.drawCards();

let currentPlayer = p1;

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
  player.renderHand(playCard);
  opponent.renderHand(playCard);
  checkWin();

  currentPlayer = opponent;
}

function checkWin() {
  if (p1.health <= 0) log("Raiders win!");
  else if (p2.health <= 0) log("Nomads win!");
}

document.getElementById("next-round").onclick = () => {
  p1.drawCards();
  p2.drawCards();
  log("New round begins!");
};
