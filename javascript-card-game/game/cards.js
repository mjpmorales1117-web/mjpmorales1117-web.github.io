export const cardTypes = {
  ATTACK: "attack",
  DEFENSE: "defense",
  RESOURCE: "resource",
  RAID: "raid",
  ALLIANCE: "alliance"
};

export const cards = [
  { name: "Rusty Blade", type: cardTypes.ATTACK, rarity: "common", effect: (self, opp) => opp.health -= 1 },
  { name: "Scavenged Rifle", type: cardTypes.ATTACK, rarity: "uncommon", effect: (self, opp) => opp.health -= 2 },
  { name: "Makeshift Armor", type: cardTypes.DEFENSE, rarity: "common", effect: (self) => self.block = 1 },
  { name: "Water Cache", type: cardTypes.RESOURCE, rarity: "common", effect: (self) => self.resources += 2 },
  { name: "Supply Raid", type: cardTypes.RAID, rarity: "uncommon", effect: (self, opp) => { opp.resources -= 2; self.resources += 2; } },
  { name: "Raiders Alliance", type: cardTypes.ALLIANCE, rarity: "rare", cost: 3, effect: (self, opp) => { if (self.resources >= 3) { self.resources -= 3; opp.health -= 4; } } }
];

function buildDeck(cardPool) {
  let deck = [];
  cardPool.forEach(card => {
    if (card.rarity === "common") deck.push(...Array(4).fill(card));
    else if (card.rarity === "uncommon") deck.push(...Array(2).fill(card));
    else if (card.rarity === "rare") deck.push(card);
  });
  return deck;
}


