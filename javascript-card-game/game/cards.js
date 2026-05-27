export const cardTypes = {
  ATTACK: "attack",
  DEFENSE: "defense",
  RESOURCE: "resource",
  RAID: "raid",
  ALLIANCE: "alliance"
};

export const cards = [
  { name: "Rusty Blade", type: cardTypes.ATTACK, effect: (self, opp) => opp.health -= 1 },
  { name: "Scavenged Rifle", type: cardTypes.ATTACK, effect: (self, opp) => opp.health -= 2 },
  { name: "Makeshift Armor", type: cardTypes.DEFENSE, effect: (self) => self.block = 1 },
  { name: "Water Cache", type: cardTypes.RESOURCE, effect: (self) => self.resources += 2 },
  { name: "Supply Raid", type: cardTypes.RAID, effect: (self, opp) => { opp.resources -= 2; self.resources += 2; } },
  { name: "Raiders Alliance", type: cardTypes.ALLIANCE, cost: 3, effect: (self, opp) => { if (self.resources >= 3) { self.resources -= 3; opp.health -= 4; } } }
];
