/**
 * Divine items database for Soul Taker
 * Contains item definitions, rarities, and probabilities
 */

// Rarity order for sorting and display
const RARITY_ORDER = {
  "Multiversal": 0,
  "Legendary": 1,
  "Epic": 2,
  "Rare": 3,
  "Uncommon": 4,
  "Common": 5,
  "Corrupted": 6
};

// Divine items collection
const divineItems = [
  {
    id: 1,
    name: "Way of Heaven",
    description: "A transcendent artifact of multiversal power. Grants the wielder insight into the fundamental laws of reality across all possible universes.",
    rarity: "Multiversal",
    probability: 0.003, // 0.3% chance
    image: "way-of-heaven.png"
  },
  {
    id: 2,
    name: "Eternal Flame",
    description: "A flame that never extinguishes, burning with the intensity of a thousand souls. It can reveal the truths hidden by time itself.",
    rarity: "Legendary",
    probability: 0.007, // 0.7% chance
    image: "eternal-flame.png"
  },
  {
    id: 3,
    name: "Soul Jar",
    description: "A mystical vessel that can capture and store spirits of the departed. Some say it contains fragments of the original darkness.",
    rarity: "Epic",
    probability: 0.02, // 2% chance
    image: "soul-jar.png"
  },
  {
    id: 4,
    name: "Death's Hourglass",
    description: "Sand falls upwards in this peculiar timepiece. Rumored to extend one's lifespan by drawing from the years of others.",
    rarity: "Epic",
    probability: 0.02, // 2% chance
    image: "deaths-hourglass.png"
  },
  {
    id: 5,
    name: "Void Stone",
    description: "A cold, black stone that absorbs all light around it. Whispers can sometimes be heard emanating from within, speaking of ancient forgotten realms.",
    rarity: "Legendary",
    probability: 0.007, // 0.7% chance
    image: "void-stone.png"
  },
  {
    id: 6,
    name: "Spectral Dagger",
    description: "A blade forged in the afterlife, capable of harming ethereal beings. It cuts through both flesh and spirit with equal ease.",
    rarity: "Rare",
    probability: 0.04, // 4% chance
    image: "spectral-dagger.png"
  },
  {
    id: 7,
    name: "Veil Pendant",
    description: "Allows the wearer to glimpse beyond the veil between worlds. Many have gone mad from the visions it grants.",
    rarity: "Rare",
    probability: 0.04, // 4% chance
    image: "veil-pendant.png"
  },
  {
    id: 8,
    name: "Celestial Compass",
    description: "Points not to magnetic north, but to the nearest dimensional gateway. The needle spins wildly in places where reality is thin.",
    rarity: "Epic",
    probability: 0.02, // 2% chance
    image: "celestial-compass.png"
  },
  {
    id: 9,
    name: "Ghostly Quill",
    description: "Writes by itself, recording thoughts from the other side. The ink appears as normal writing to most, but rearranges into different messages for the intended recipient.",
    rarity: "Uncommon",
    probability: 0.08, // 8% chance
    image: "ghostly-quill.png"
  },
  {
    id: 10,
    name: "Bone Dice",
    description: "Carved from ancient remains, these dice always land on the number you desire... for a price. With each roll, you age imperceptibly.",
    rarity: "Uncommon",
    probability: 0.08, // 8% chance
    image: "bone-dice.png"
  },
  {
    id: 11,
    name: "Cursed Mirror",
    description: "Shows your reflection as it will appear at
