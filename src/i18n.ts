export type Language = 'en' | 'et';

export const t = {
  en: {
    title: "SCOUNDREL",
    subtitle: "A Solitaire Dungeon Crawler",
    bestScore: "All-Time Best Score",
    enterDungeon: "Enter Dungeon",
    howToPlay: "How to Play",
    rulesTitle: "Rules of Scoundrel",
    goal: "The Goal:",
    goalDesc: "Survive the entire deck (dungeon) of 52 cards.",
    monsters: "Monsters (Spades & Clubs)",
    monstersDesc1: "Face cards represent monster strength (J=11, Q=12, K=13, A=14).",
    monstersDesc2: "Fighting barehanded deals the monster's full value as damage to your health.",
    weapons: "Weapons (Diamonds)",
    weaponsDesc1: "Weapons absorb damage up to their value.",
    weaponsDesc2: "You can only fight monsters with your weapon if they are weaker than the last monster you fought with it.",
    weaponsDesc3: "Equipping a new weapon discards your old one and resets this sequence.",
    potions: "Health Potions (Hearts)",
    potionsDesc1: "Restore health up to their value (max 20).",
    potionsDesc2: "You can only drink one potion per room.",
    roomFlee: "The Room & Fleeing",
    roomFleeDesc1: "You face 4 cards at a time. After interacting with 3, the room refills.",
    roomFleeDesc2: "You may Flee the room to shuffle the current cards back into the deck, but you cannot flee two rooms in a row.",
    health: "Health",
    deck: "Deck",
    flee: "Flee",
    theRoom: "The Room",
    equippedWeapon: "Equipped Weapon",
    defeatedMonsters: (n: number) => `Defeated ${n} Monster${n !== 1 ? 's' : ''}`,
    tapCard: "Tap a card in the room to view its details and your options.",
    potionLimit: "Can't use: Only one potion allowed per room.",
    drinkPotion: (h: number) => `Drink potion to restore ${h} health.`,
    equipWeapon: (v: number) => `Equip weapon to block up to ${v} damage.`,
    fightWeaponDmg: (d: number) => `Fight with weapon. Take ${d} damage.`,
    fightWeaponNoDmg: "Fight with weapon. Take NO damage!",
    monsterTooStrong: (d: number) => `Monster is too strong for current weapon streak. Fight barehanded and take ${d} damage.`,
    fightBarehanded: (d: number) => `Fight barehanded. Take ${d} damage.`,
    engage: "Engage",
    take: "Take",
    victory: "VICTORY",
    defeated: "DEFEATED",
    stuckTitle: "TRAPPED",
    stuckInfo: "You have no valid moves left. You cannot flee, and you cannot drink any more potions in this room.",
    finalScore: "Final Score",
    playAgain: "Play Again",
    restartGame: "Restart Game",
    settings: "Settings",
    language: "Language",
    soundEffects: "Sound Effects",
    reduceMotion: "Reduce Motion",
    highScoreText: "High Score",
    close: "Close",
    logEnter: "You cautiously step into the dungeon...",
    logPotionLimit: "You can only drink one health potion per room!",
    logStuck: "You are trapped with no escape...",
    logDrank: (n: string, h: number) => `Drank ${n}, recovering ${h} HP.`,
    logPotionWasted: (n: string) => `Discarded ${n} (potion limit reached).`,
    logEquipped: (n: string) => `Equipped ${n}.`,
    logSlew: (n: string, d: number) => `Slew ${n} with weapon. Took ${d} damage.`,
    logFought: (n: string, d: number) => `Fought ${n} barehanded. Took ${d} damage!`,
    logSuccumbed: "You succumbed to the dungeon...",
    logProceed: "You proceed deeper into the dungeon.",
    logSurvived: "You survived the dungeon!",
    logFled: "You fled the room, retreating to the shadows.",
    tooltipPotion: (v: number) => `Restores ${v} health (Max 20). Limit 1 per turn.`,
    tooltipPotionWasted: "Potion limit reached. Using this will simply discard it.",
    tooltipWeapon: (v: number) => `Blocks up to ${v} damage. Replaces current weapon.`,
    tooltipMonster: (v: number) => `Deals ${v} damage. Fight barehanded or with a weapon.`,
    langToggle: "EE"
  },

  et: {
    title: "SCOUNDREL",
    subtitle: "Kaardipõhine üksikmängu koopaseiklus",
    bestScore: "Kõigi aegade parim tulemus",
    enterDungeon: "Sisene koopasse",
    howToPlay: "Kuidas mängida",
    rulesTitle: "Scoundreli reeglid",

    goal: "Eesmärk:",
    goalDesc: "Ela üle kogu 52 kaardist koosnev pakk ehk koobas.",

    monsters: "Koletised (poti ja risti)",
    monstersDesc1: "Pildikaardid näitavad koletise tugevust (J=11, Q=12, K=13, A=14).",
    monstersDesc2: "Paljakäsi võideldes saad kahju koletise täisväärtuse võrra.",

    weapons: "Relvad (ruutu)",
    weaponsDesc1: "Relv vähendab saadavat kahju kuni oma väärtuse võrra.",
    weaponsDesc2: "Relvaga saad võidelda ainult koletisega, kes on nõrgem kui viimane sama relvaga alistatud koletis.",
    weaponsDesc3: "Uue relva varustamisel visatakse eelmine relv ära ning järjestus algab otsast.",

    potions: "Tervisejoogid (ärtu)",
    potionsDesc1: "Taastavad elupunkte oma väärtuse võrra, kuid elupunkte saab olla maksimaalselt 20.",
    potionsDesc2: "Igas toas saad kasutada ainult üht tervisejooki.",

    roomFlee: "Tuba ja põgenemine",
    roomFleeDesc1: "Korraga on toas 4 kaarti. Kui oled kasutanud kolme kaarti, täitub tuba uuesti.",
    roomFleeDesc2: "Võid toast põgeneda ja segada seal olevad kaardid tagasi pakki, kuid kahest toast järjest põgeneda ei saa.",

    health: "Elupunktid",
    deck: "Pakk",
    flee: "Põgene",
    theRoom: "Tuba",
    equippedWeapon: "Varustatud relv",

    defeatedMonsters: (n: number) =>
      `Alistatud koletisi: ${n}`,

    tapCard: "Puuduta toas olevat kaarti, et näha selle üksikasju ja võimalikke tegevusi.",

    potionLimit: "Ei saa kasutada: selles toas oled juba ühe tervisejoogi kasutanud.",
    tooltipPotionWasted: "Oled juba tervisejooki kasutanud. See kaart visatakse tühjalt ära.",

    drinkPotion: (h: number) =>
      `Joo tervisejook ja taasta ${h} elupunkti.`,

    equipWeapon: (v: number) =>
      `Varusta relv, mis vähendab saadavat kahju kuni ${v} võrra.`,

    fightWeaponDmg: (d: number) =>
      `Võitle relvaga. Saad ${d} kahju.`,

    fightWeaponNoDmg: "Võitle relvaga. Sa ei saa kahju!",

    monsterTooStrong: (d: number) =>
      `See koletis on praeguse relvajärjestuse jaoks liiga tugev. Võitle paljakäsi ja saad ${d} kahju.`,

    fightBarehanded: (d: number) =>
      `Võitle paljakäsi. Saad ${d} kahju.`,

    engage: "Kasuta",
    take: "Võta",

    victory: "VÕIT",
    defeated: "HUKKUSID",
    stuckTitle: "LÕKSUS",
    stuckInfo: "Sul pole ühtegi võimalikku käiku. Sa ei saa põgeneda ega selles toas rohkem tervisejooke juua.",
    finalScore: "Lõpptulemus",
    playAgain: "Mängi uuesti",
    restartGame: "Alusta uuesti",
    settings: "Seaded",
    language: "Keel",
    soundEffects: "Heliefektid",
    reduceMotion: "Vähem animatsioone",
    highScoreText: "Parim tulemus",
    close: "Sulge",

    logEnter: "Astud ettevaatlikult pimedasse koopasse...",
    logPotionLimit: "Selles toas oled juba ühe tervisejoogi kasutanud!",
    logStuck: "Oled lõksus, ilma igasuguse pääseteeta...",

    logDrank: (n: string, h: number) =>
      `Jõid ${n} ja taastasid ${h} elupunkti.`,
    
    logPotionWasted: (n: string) =>
      `Viskasid ära ${n} (piirang käes).`,

    logEquipped: (n: string) =>
      `Varustasid relva: ${n}.`,

    logSlew: (n: string, d: number) =>
      `Alistasid relvaga koletise ${n}. Said ${d} kahju.`,

    logFought: (n: string, d: number) =>
      `Võitlesid paljakäsi koletisega ${n}. Said ${d} kahju!`,

    logSuccumbed: "Langesid koopa sügavustes...",
    logProceed: "Liigud koopas sügavamale.",
    logSurvived: "Pääsesid koopast eluga!",
    logFled: "Põgenesid toast ja taandusid varjudesse.",

    tooltipPotion: (v: number) =>
      `Taastab ${v} elupunkti (maksimaalselt 20). Üks tervisejook toa kohta.`,

    tooltipWeapon: (v: number) =>
      `Vähendab saadavat kahju kuni ${v} võrra. Asendab praeguse relva.`,

    tooltipMonster: (v: number) =>
      `Teeb ${v} kahju. Võitle relvaga või paljakäsi.`,

    langToggle: "EN"
  }
};

export const getThematicName = (
  card: { suit: string; rank: number },
  lang: Language
) => {
  if (card.suit === 'hearts') {
    return lang === 'en'
      ? `Health Potion (♥${card.rank})`
      : `Tervisejook (♥${card.rank})`;
  }

  const rankNamesEn: Record<number, string> = {
    11: 'Jack',
    12: 'Queen',
    13: 'King',
    14: 'Ace'
  };

  const rankNamesEt: Record<number, string> = {
    11: 'Soldat',
    12: 'Emand',
    13: 'Kuningas',
    14: 'Äss'
  };

  const rankStr =
    lang === 'en'
      ? rankNamesEn[card.rank] || card.rank.toString()
      : rankNamesEt[card.rank] || card.rank.toString();

  if (card.suit === 'diamonds') {
    const weaponNamesEn: Record<number, string> = {
      2: 'Rusty Dagger',
      3: 'Wooden Club',
      4: 'Iron Shortsword',
      5: 'Steel Longsword',
      6: "Knight's Broadsword",
      7: 'Silver Claymore',
      8: "Assassin's Twinblades",
      9: 'Masterwork Halberd',
      10: 'Legendary Excalibur',
      11: 'Legendary Excalibur',
      12: 'Legendary Excalibur',
      13: 'Legendary Excalibur',
      14: 'Legendary Excalibur'
    };

    const weaponNamesEt: Record<number, string> = {
      2: 'Roostes pistoda',
      3: 'Puunui',
      4: 'Raudne lühimõõk',
      5: 'Terasest pikkmõõk',
      6: 'Rüütli laiamõõk',
      7: 'Hõbedane suurmõõk',
      8: 'Mõrtsuka kaksikterad',
      9: 'Meistri hellebard',
      10: 'Excalibur',
      11: 'Excalibur',
      12: 'Excalibur',
      13: 'Excalibur',
      14: 'Excalibur'
    };

    return lang === 'en'
      ? weaponNamesEn[card.rank] || `Weapon (${rankStr})`
      : weaponNamesEt[card.rank] || `Relv (${rankStr})`;
  }

  const monsterNamesEn: Record<number, string> = {
    2: 'Dire Rat',
    3: 'Cave Bat',
    4: 'Slime',
    5: 'Skeleton',
    6: 'Goblin Grunt',
    7: 'Orc Warrior',
    8: 'Troll',
    9: 'Gargoyle',
    10: 'Shadow Fiend',
    11: 'Vampire Lord',
    12: 'Lich',
    13: 'Demon King',
    14: 'Ancient Dragon'
  };

  const monsterNamesEt: Record<number, string> = {
    2: 'Hiidrott',
    3: 'Koopanahkhiir',
    4: 'Limakoll',
    5: 'Luukere',
    6: 'Goblinisõdur',
    7: 'Orgisõdalane',
    8: 'Troll',
    9: 'Garguul',
    10: 'Varjudeemon',
    11: 'Vampiiriisand',
    12: 'Lihh',
    13: 'Deemonikuningas',
    14: 'Iidne draakon'
  };

  return lang === 'en'
    ? monsterNamesEn[card.rank] || `Monster (${rankStr})`
    : monsterNamesEt[card.rank] || `Koletis (${rankStr})`;
};