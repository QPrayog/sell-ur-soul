// Divine items database
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
        description: "Shows your reflection as it will appear at the moment of your death. The image changes each time you look into it, suggesting fate is never fixed.",
        rarity: "Common",
        probability: 0.13, // 13% chance
        image: "cursed-mirror.png"
    },
    {
        id: 12,
        name: "Reaper's Coin",
        description: "A token payment for the ferryman of the underworld. Those who carry it report hearing the gentle lapping of dark waters when they sleep.",
        rarity: "Common",
        probability: 0.13, // 13% chance
        image: "reapers-coin.png"
    },
    {
        id: 13,
        name: "Echoing Conch",
        description: "Pressing it to your ear lets you hear the final words of those who have passed. Sometimes it whispers secrets that only the dead should know.",
        rarity: "Rare",
        probability: 0.14, // 4% chance
        image: "echoing-conch.png"
    },
    {
        id: 14,
        name: "Twilight Prism",
        description: "Refracts light into colors unseen by mortal eyes. Gazing through it reveals hidden truths and entities that exist alongside us, unnoticed.",
        rarity: "Epic",
        probability: 0.02, // 2% chance
        image: "twilight-prism.png"
    },
    {
        id: 15,
        name: "Spirit Lantern",
        description: "Its pale blue flame grows brighter in the presence of supernatural entities. On certain nights, it projects shadows that move of their own accord.",
        rarity: "Uncommon",
        probability: 0.08, // 8% chance
        image: "spirit-lantern.png"
    },
    {
        id: 16,
        name: "Dreamcatcher Amulet",
        description: "Allows the wearer to consciously enter and manipulate dreams, both their own and others'. Beware: in the realm of dreams, nightmares hunt for dreamers.",
        rarity: "Rare",
        probability: 0.04, // 4% chance
        image: "dreamcatcher-amulet.png"
    },
    {
        id: 17,
        name: "Astral Map",
        description: "A shifting, ethereal star chart that reveals pathways between planes of existence. The constellations rearrange themselves each night, tracking cosmic alignments.",
        rarity: "Legendary",
        probability: 0.007, // 0.7% chance
        image: "astral-map.png"
    },
    {
        id: 18,
        name: "Raven's Feather",
        description: "A feather that never burns. Writing with it creates messages only visible to the intended recipient. The ink disappears after being read.",
        rarity: "Common",
        probability: 0.13, // 13% chance
        image: "ravens-feather.png"
    },
    {
        id: 19,
        name: "Memory Bottle",
        description: "Contains swirling mist that, when released, temporarily recreates a scene from the past. The bottle collects memories from everyone who touches it.",
        rarity: "Uncommon",
        probability: 0.08, // 8% chance
        image: "memory-bottle.png"
    },
    {
        id: 20,
        name: "Abyssal Crown",
        description: "A crown forged from metals not of this world. Grants insight into the darkest corners of reality. Those who wear it hear whispers of long-forgotten knowledge.",
        rarity: "Legendary",
        probability: 0.017, // 0.7% chance
        image: "abyssal-crown.png"
    },
    {
        id: 21,
        name: "Corrupted Soul",
        description: "Your soul was too corrupted to be accepted. The transaction failed, but your soul is still gone. The darkness has claimed what was rightfully its own.",
        rarity: "Corrupted",
        probability: 0.03, // 3% chance of corruption
        image: "corrupted-soul.png"
    }
];

// Rarity order for sorting
const rarityOrder = {
    "Multiversal": 0,
    "Legendary": 1,
    "Epic": 2,
    "Rare": 3,
    "Uncommon": 4,
    "Common": 5,
    "Corrupted": 6
};
