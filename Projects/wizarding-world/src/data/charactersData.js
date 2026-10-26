import hermione from "../assets/hermoine.jpg";
import dumbledore from "../assets/dumbledore.jpg";
import lily from "../assets/lily.jpg";
import molly from "../assets/molly.jpeg";
import narcissa from "../assets/narcissa.jpeg";
import sirius from "../assets/sirius.jpeg";

// HP API direct URLs - reliable
const HP = (name) => `https://hp-api.onrender.com/images/characters/${name}.jpeg`;

export const HOGWARTS_HALL =
    "https://image.tmdb.org/t/p/original/hziiv14OpD73u9gAak4XDDfBKa2.jpg";

const charactersData = {
    "Harry Potter": {
        quote: '"The Boy Who Lived"',
        biography: `Harry James Potter is the son of James and Lily Potter. Orphaned as an infant when Lord Voldemort murdered his parents, he was placed with his Muggle relatives the Dursleys. On his eleventh birthday he discovered he was a wizard and enrolled at Hogwarts School of Witchcraft and Wizardry.\n\nThroughout his years at Hogwarts, Harry faced Voldemort and his Death Eaters countless times. His courage, loyalty, and willingness to sacrifice himself ultimately led to Voldemort's defeat in the Battle of Hogwarts in 1998.`,
        wand: "Holly, Phoenix feather, 11 inches",
        patronus: "Stag",
        boggart: "Lord Voldemort / Dementor",
        spells: [
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "The Disarming Charm — Harry's signature spell used to defeat Voldemort." },
            { name: "Expecto Patronum", icon: "auto_awesome", desc: "Conjures a stag Patronus to repel Dementors." },
            { name: "Stupefy", icon: "flash_on", desc: "The Stunning Spell, used extensively throughout duels." },
            { name: "Sectumsempra", icon: "cut", desc: "A dark spell learned from the Half-Blood Prince's textbook." },
        ],
        timeline: [
            { event: "Philosopher's Stone (1991)", desc: "Discovers he is a wizard and defeats Quirrell/Voldemort." },
            { event: "Triwizard Tournament (1994)", desc: "Competes in the deadly tournament and witnesses Voldemort's return." },
            { event: "Battle of Hogwarts (1998)", desc: "Sacrifices himself and ultimately defeats Lord Voldemort." },
        ],
        artefacts: ["The Invisibility Cloak", "Marauder's Map", "Elder Wand (briefly)", "Resurrection Stone"],
        relationships: [
            { role: "Best Friend", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Best Friend", name: "Hermione Granger", img: hermione },
            { role: "Mentor", name: "Albus Dumbledore", img: dumbledore },
            { role: "Wife", name: "Ginny Weasley", img: HP("ginny-weasley") },
        ],
    },

    "Hermione Granger": {
        quote: '"The Brightest Witch of Her Age"',
        biography: `Born to Muggle parents, Hermione Jean Granger discovered her magical abilities and was accepted into Hogwarts School of Witchcraft and Wizardry. From her first year, she proved to be an exceptionally gifted student, often mastering spells well ahead of her peers.\n\nHer logic and immense knowledge were pivotal in the defeat of Lord Voldemort. Alongside Harry Potter and Ron Weasley, she navigated the complexities of the wizarding world with courage and an unwavering commitment to justice, notably founding S.P.E.W. to advocate for house-elf rights.`,
        wand: "Vine wood, Dragon heartstring",
        patronus: "Otter",
        boggart: "Professor McGonagall (Failure)",
        spells: [
            { name: "Expecto Patronum", icon: "auto_awesome", desc: "Conjures a silver otter Patronus to repel Dementors." },
            { name: "Wingardium Leviosa", icon: "air", desc: 'The Levitation Charm. She mastered the "swish and flick" in her first year.' },
            { name: "Alohomora", icon: "key", desc: "The Unlocking Charm, used to open locked doors and windows." },
            { name: "Bluebell Flames", icon: "flare", desc: "A specialized fire charm producing waterproof, portable blue flames." },
        ],
        timeline: [
            { event: "Philosopher's Stone (1991)", desc: "Starts her journey at Hogwarts, masters Wingardium Leviosa." },
            { event: "Prisoner of Azkaban (1993)", desc: "Uses the Time-Turner to save Sirius Black and Buckbeak." },
            { event: "Deathly Hallows (1997-1998)", desc: "Destroys Hufflepuff's Cup with a basilisk fang." },
        ],
        artefacts: ["The Time-Turner", "Tales of Beedle the Bard", "Beaded Bag (Undetectable Extension Charm)"],
        relationships: [
            { role: "Best Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Husband", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Mentor", name: "Minerva McGonagall", img: HP("minerva-mcgonagall") },
            { role: "Friend", name: "Luna Lovegood", img: HP("luna-lovegood") },
        ],
    },

    "Ron Weasley": {
        quote: '"The Loyal Heart of the Trio"',
        biography: `Ronald Bilius Weasley is the sixth child of Arthur and Molly Weasley. Growing up in a large wizarding family, Ron learned to be resourceful despite limited means. His friendship with Harry Potter and Hermione Granger defined his Hogwarts years.\n\nThough often overshadowed by his famous friend, Ron's loyalty, humor, and bravery proved crucial in the hunt for Horcruxes and the final battle against Voldemort.`,
        wand: "Willow, Unicorn hair, 14 inches",
        patronus: "Jack Russell Terrier",
        boggart: "Aragog (Giant Spider)",
        spells: [
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "The Disarming Charm, one of Ron's go-to defensive spells." },
            { name: "Riddikulus", icon: "sentiment_very_satisfied", desc: "Used against Boggarts to make them comical." },
            { name: "Accio", icon: "send", desc: "The Summoning Charm, used to call objects from a distance." },
            { name: "Wingardium Leviosa", icon: "air", desc: "The Levitation Charm learned in first year." },
        ],
        timeline: [
            { event: "Philosopher's Stone (1991)", desc: "Befriends Harry on the Hogwarts Express, helps defeat Quirrell." },
            { event: "Chamber of Secrets (1992)", desc: "Accompanies Harry into the Chamber despite his fear of spiders." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights alongside Harry and Hermione in the final battle." },
        ],
        artefacts: ["Deluminator", "Wizard Chess Set", "Scabbers (rat)"],
        relationships: [
            { role: "Best Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Wife", name: "Hermione Granger", img: hermione },
            { role: "Sister", name: "Ginny Weasley", img: HP("ginny-weasley") },
            { role: "Mother", name: "Molly Weasley", img: molly },
        ],
    },

    "Albus Dumbledore": {
        quote: '"The Greatest Sorcerer in the World"',
        biography: `Albus Percival Wulfric Brian Dumbledore was widely considered the greatest wizard of his age. As Headmaster of Hogwarts, he guided countless students and served as a beacon of hope against dark forces.\n\nHis complex past, including his relationship with Gellert Grindelwald, shaped his philosophy about love being the greatest magic of all. He orchestrated the defeat of Voldemort from beyond the grave through Harry Potter.`,
        wand: "Elder Wand (The Deathstick)",
        patronus: "Phoenix",
        boggart: "The corpse of his sister Ariana",
        spells: [
            { name: "Lumos Maxima", icon: "light_mode", desc: "An extremely powerful light charm to illuminate large areas." },
            { name: "Firestorm", icon: "local_fire_department", desc: "Creates a massive ring of fire to hold back dark creatures." },
            { name: "Prior Incantato", icon: "history", desc: "Forces a wand to reveal its last spell cast." },
            { name: "Apparition", icon: "blur_circular", desc: "Teleportation magic mastered at the highest level." },
        ],
        timeline: [
            { event: "Defeat of Grindelwald (1945)", desc: "Defeats the dark wizard Grindelwald in a legendary duel." },
            { event: "Founding the Order (1970s)", desc: "Creates the Order of the Phoenix to fight Voldemort." },
            { event: "The Horcrux Quest (1996)", desc: "Works with Harry to find and destroy Voldemort's Horcruxes." },
        ],
        artefacts: ["Elder Wand", "Resurrection Stone Ring", "Pensieve"],
        relationships: [
            { role: "Student", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Colleague", name: "Minerva McGonagall", img: HP("minerva-mcgonagall") },
            { role: "Spy", name: "Severus Snape", img: HP("severus-snape") },
            { role: "Enemy", name: "Lord Voldemort", img: HP("lord-voldemort") },
        ],
    },

    "Severus Snape": {
        quote: '"Always."',
        biography: `Severus Snape was a complex and deeply misunderstood figure in the Wizarding World. A Half-blood Prince, he was a master of Potions and the Dark Arts, serving as a double agent for Dumbledore against Voldemort.\n\nHis lifelong love for Lily Potter drove every sacrifice he made. Despite appearing villainous, Snape's true loyalty was revealed posthumously — his entire life was dedicated to protecting Harry Potter for Lily's sake.`,
        wand: "Unknown wood, Unknown core",
        patronus: "Doe (for Lily Potter)",
        boggart: "Unknown",
        spells: [
            { name: "Sectumsempra", icon: "cut", desc: "Snape's own invented spell that causes deep lacerations." },
            { name: "Legilimens", icon: "psychology", desc: "Allows the caster to extract thoughts and memories." },
            { name: "Occlumency", icon: "lock", desc: "The art of closing one's mind against Legilimency." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "The Disarming Charm — Snape's signature defensive spell." },
        ],
        timeline: [
            { event: "Joins Death Eaters (1970s)", desc: "Falls in with Voldemort's followers before switching sides." },
            { event: "Becomes Double Agent", desc: "Works for Dumbledore while maintaining Voldemort's trust." },
            { event: "Battle of Hogwarts (1998)", desc: "Killed by Nagini; reveals his true loyalty to Lily Potter." },
        ],
        artefacts: ["Half-Blood Prince's Textbook", "Veritaserum", "Wolfsbane Potion"],
        relationships: [
            { role: "Love of His Life", name: "Lily Potter", img: lily },
            { role: "Mentor", name: "Albus Dumbledore", img: dumbledore },
            { role: "Student", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Student", name: "Draco Malfoy", img: HP("draco-malfoy") },
        ],
    },

    "Draco Malfoy": {
        quote: '"My father will hear about this."',
        biography: `Draco Lucius Malfoy was born into one of the most prestigious pure-blood wizarding families. Raised with a sense of entitlement and blood supremacy, he became Harry Potter's chief rival at Hogwarts.\n\nDespite his early arrogance and cruelty, Draco showed genuine reluctance when ordered by Voldemort to commit murder. His experience during the Second Wizarding War ultimately softened him, and he later raised his son Scorpius with different values.`,
        wand: "Hawthorn, Unicorn hair, 10 inches",
        patronus: "Unknown",
        boggart: "Lord Voldemort",
        spells: [
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "The Disarming Charm, used in the Astronomy Tower confrontation." },
            { name: "Crucio", icon: "warning", desc: "An Unforgivable Curse attempted under pressure from Voldemort." },
            { name: "Serpensortia", icon: "pest_control", desc: "Conjures a snake from the tip of the wand." },
            { name: "Occlumency", icon: "lock", desc: "Mind-closing magic learned to hide thoughts from Voldemort." },
        ],
        timeline: [
            { event: "First Year (1991)", desc: "Becomes Harry's rival; joins Slytherin house." },
            { event: "Marked as Death Eater (1996)", desc: "Receives the Dark Mark and is tasked with killing Dumbledore." },
            { event: "Post-War (1998+)", desc: "Reforms and raises his son Scorpius with better values." },
        ],
        artefacts: ["Vanishing Cabinet", "Dark Mark (branded)", "Elder Wand (briefly)"],
        relationships: [
            { role: "Father", name: "Lucius Malfoy", img: HP("lucius-malfoy") },
            { role: "Mother", name: "Narcissa Malfoy", img: narcissa },
            { role: "Rival", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Head of House", name: "Severus Snape", img: HP("severus-snape") },
        ],
    },

    "Luna Lovegood": {
        quote: '"Things we lose have a way of coming back to us in the end."',
        biography: `Luna Scamander (née Lovegood) was a Ravenclaw student known for her dreamy, eccentric nature and unwavering belief in magical creatures others dismissed.\n\nDespite being considered odd by many peers, Luna's fierce loyalty and courage made her an invaluable member of Dumbledore's Army. Her ability to see Thestrals reflected her early experience of witnessing her mother's death.`,
        wand: "Unknown wood and core",
        patronus: "Hare",
        boggart: "Unknown",
        spells: [
            { name: "Stupefy", icon: "flash_on", desc: "The Stunning Spell used effectively in the Battle of the Department of Mysteries." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm used during Dumbledore's Army training." },
            { name: "Reducto", icon: "remove_circle", desc: "The Reductor Curse used to blast solid objects apart." },
            { name: "Legilimens", icon: "psychology", desc: "Luna showed remarkable ability in perception and intuition." },
        ],
        timeline: [
            { event: "Joins DA (1995)", desc: "Becomes a member of Dumbledore's Army, proves her combat worth." },
            { event: "Ministry Battle (1996)", desc: "Fights alongside Harry in the Department of Mysteries." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights bravely in the final battle for Hogwarts." },
        ],
        artefacts: ["Spectrespecs", "The Quibbler magazine", "Dirigible Plum earrings"],
        relationships: [
            { role: "Father", name: "Xenophilius Lovegood", img: HP("xenophilius-lovegood") },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Friend", name: "Hermione Granger", img: hermione },
            { role: "Friend", name: "Ginny Weasley", img: HP("ginny-weasley") },
        ],
    },

    "Neville Longbottom": {
        quote: '"Why is it always me?"',
        biography: `Neville Frank Longbottom was the only child of Frank and Alice Longbottom, both Aurors who were tortured to insanity by Bellatrix Lestrange. Raised by his stern grandmother, Neville started Hogwarts lacking confidence but harboring immense inner strength.\n\nHis transformation from a timid, forgetful student to a fierce warrior was one of the most profound character arcs in the saga. He ultimately destroyed the final Horcrux — Nagini — with Godric Gryffindor's sword.`,
        wand: "Cherry, Unicorn hair (originally his father's)",
        patronus: "Non-corporeal",
        boggart: "Professor Snape",
        spells: [
            { name: "Herbivicus", icon: "grass", desc: "A charm that causes plants to rapidly bloom and grow." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning Spell used extensively in the Battle of Hogwarts." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm mastered through Dumbledore's Army training." },
            { name: "Avada Kedavra", icon: "warning", desc: "Faced the killing curse and survived through sheer bravery." },
        ],
        timeline: [
            { event: "First Year (1991)", desc: "Earns Gryffindor the House Cup by standing up to his friends." },
            { event: "Joins DA (1995)", desc: "Blossoms under Harry's teaching and finds his courage." },
            { event: "Battle of Hogwarts (1998)", desc: "Destroys Nagini with the Sword of Gryffindor." },
        ],
        artefacts: ["Sword of Gryffindor", "Mimbulus Mimbletonia plant", "Remembrall"],
        relationships: [
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Friend", name: "Hermione Granger", img: hermione },
            { role: "Friend", name: "Luna Lovegood", img: HP("luna-lovegood") },
            { role: "Friend", name: "Ginny Weasley", img: HP("ginny-weasley") },
        ],
    },

    "Ginny Weasley": {
        quote: '"The thing about growing up with Fred and George is that you sort of start thinking anything is possible."',
        biography: `Ginevra Molly Weasley is the youngest child and only daughter of Arthur and Molly Weasley. In her first year at Hogwarts she was possessed by Tom Riddle's diary Horcrux.\n\nGinny grew into one of the most talented witches of her generation, an excellent Quidditch player and a fierce warrior. She married Harry Potter after the war and became a celebrated Quidditch player for the Holyhead Harpies.`,
        wand: "Yew, Unknown core",
        patronus: "Horse",
        boggart: "Unknown",
        spells: [
            { name: "Bat-Bogey Hex", icon: "pest_control", desc: "Ginny's signature hex, notorious for its effectiveness." },
            { name: "Reductor Curse", icon: "remove_circle", desc: "A powerful curse used in the Department of Mysteries battle." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm used in various battles." },
            { name: "Stupefy", icon: "flash_on", desc: "The Stunning Spell used in the Battle of Hogwarts." },
        ],
        timeline: [
            { event: "First Year (1992)", desc: "Possessed by Tom Riddle's diary; saved by Harry in the Chamber." },
            { event: "Joins DA (1995)", desc: "Becomes a skilled member of Dumbledore's Army." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights alongside her family in the final battle." },
        ],
        artefacts: ["Tom Riddle's Diary (destroyed)", "Quidditch broomstick"],
        relationships: [
            { role: "Husband", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Brother", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Mother", name: "Molly Weasley", img: molly },
            { role: "Friend", name: "Hermione Granger", img: hermione },
        ],
    },

    "Sirius Black": {
        quote: '"We\'ve all got both light and dark inside us."',
        biography: `Sirius Black was the last heir of the House of Black, a pure-blood wizarding family. Despite his family's dark leanings, he was sorted into Gryffindor and became best friends with James Potter, Remus Lupin, and Peter Pettigrew.\n\nFalsely imprisoned in Azkaban for twelve years, Sirius escaped and worked to protect his godson Harry Potter until his tragic death at the Department of Mysteries.`,
        wand: "Unknown wood and core",
        patronus: "Large dog (Grim)",
        boggart: "Lord Voldemort",
        spells: [
            { name: "Animagus Transformation", icon: "pets", desc: "Can transform into a large black dog at will." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm used in various confrontations." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning spell used in the Department of Mysteries battle." },
            { name: "Reducto", icon: "remove_circle", desc: "The Reductor Curse used in combat." },
        ],
        timeline: [
            { event: "The Marauders Era (1971-1978)", desc: "Forms the Marauders with James, Lupin, and Pettigrew." },
            { event: "Azkaban (1981-1993)", desc: "Wrongfully imprisoned for twelve years for Pettigrew's crime." },
            { event: "Death (1996)", desc: "Falls through the Veil in the Department of Mysteries battle." },
        ],
        artefacts: ["Motorcycle (enchanted)", "Two-way mirror", "12 Grimmauld Place"],
        relationships: [
            { role: "Godson", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Best Friend", name: "James Potter", img: HP("james-potter") },
            { role: "Friend", name: "Remus Lupin", img: HP("remus-lupin") },
            { role: "Enemy", name: "Bellatrix Lestrange", img: HP("bellatrix-lestrange") },
        ],
    },

    "Remus Lupin": {
        quote: '"It is the quality of one\'s convictions that determines success, not the number of followers."',
        biography: `Remus John Lupin was one of the Marauders and a Defence Against the Dark Arts professor at Hogwarts. Bitten by werewolf Fenrir Greyback as a child, he struggled with his lycanthropy throughout his life.\n\nDespite the hardships his condition imposed, Lupin became one of the most beloved and skilled Defence professors Hogwarts ever had. He died alongside his wife Tonks in the Battle of Hogwarts.`,
        wand: "Cypress, Unicorn hair, 10¼ inches",
        patronus: "Wolf",
        boggart: "Full Moon / Voldemort",
        spells: [
            { name: "Riddikulus", icon: "sentiment_very_satisfied", desc: "Used against Boggarts; first spell taught to Harry's class." },
            { name: "Expecto Patronum", icon: "auto_awesome", desc: "Teaches Harry to conjure a Patronus against Dementors." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning Spell used in Order of the Phoenix missions." },
            { name: "Wolfsbane Potion", icon: "science", desc: "A potion that controls his werewolf transformations." },
        ],
        timeline: [
            { event: "The Marauders Era (1971-1978)", desc: "Forms lifelong bonds with James, Sirius, and Pettigrew." },
            { event: "DADA Professor (1993)", desc: "Teaches at Hogwarts and becomes a beloved mentor to Harry." },
            { event: "Battle of Hogwarts (1998)", desc: "Dies alongside Tonks fighting for the wizarding world." },
        ],
        artefacts: ["Marauder's Map (co-creator)", "Wolfsbane Potion supply"],
        relationships: [
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Best Friend", name: "Sirius Black", img: sirius },
            { role: "Wife", name: "Nymphadora Tonks", img: HP("nymphadora-tonks") },
            { role: "Enemy", name: "Fenrir Greyback", img: HP("fenrir-greyback") },
        ],
    },

    "Lord Voldemort": {
        quote: '"There is no good and evil. There is only power, and those too weak to seek it."',
        biography: `Tom Marvolo Riddle, known as Lord Voldemort, was the most powerful dark wizard of all time. Born of a Muggle father and a witch mother who died in childbirth, he grew up in a Muggle orphanage.\n\nObsessed with immortality and pure-blood supremacy, he split his soul into seven Horcruxes. His final defeat came at the Battle of Hogwarts in 1998.`,
        wand: "Yew, Phoenix feather, 13.5 inches",
        patronus: "None (incapable of love)",
        boggart: "His own death",
        spells: [
            { name: "Avada Kedavra", icon: "warning", desc: "The Killing Curse — one of the three Unforgivable Curses." },
            { name: "Crucio", icon: "crisis_alert", desc: "The Cruciatus Curse, inflicting unbearable pain on victims." },
            { name: "Nagini Control", icon: "pest_control", desc: "Speaks Parseltongue and controls his snake Nagini telepathically." },
            { name: "Horcrux Creation", icon: "broken_image", desc: "Split his soul into seven pieces to achieve immortality." },
        ],
        timeline: [
            { event: "Hogwarts Years (1938-1945)", desc: "Opens the Chamber of Secrets and frames Hagrid." },
            { event: "First Defeat (1981)", desc: "Killing curse rebounds off baby Harry; reduced to a wraith." },
            { event: "Final Defeat (1998)", desc: "Destroyed by his own rebounding curse in the Battle of Hogwarts." },
        ],
        artefacts: ["Tom Riddle's Diary", "Marvolo Gaunt's Ring", "Slytherin's Locket", "Hufflepuff's Cup", "Nagini", "Elder Wand"],
        relationships: [
            { role: "Nemesis", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Opponent", name: "Albus Dumbledore", img: dumbledore },
            { role: "Servant", name: "Bellatrix Lestrange", img: HP("bellatrix-lestrange") },
            { role: "Servant", name: "Severus Snape", img: HP("severus-snape") },
        ],
    },

    "Bellatrix Lestrange": {
        quote: '"I killed Sirius Black!"',
        biography: `Bellatrix Lestrange (née Black) was one of Voldemort's most devoted and dangerous Death Eaters. A pure-blood witch from the Noble House of Black, she enthusiastically tortured Frank and Alice Longbottom to insanity.\n\nFanatically loyal to Voldemort, Bellatrix was imprisoned in Azkaban for fourteen years before escaping. She killed Sirius Black and many others before finally being defeated by Molly Weasley in the Battle of Hogwarts.`,
        wand: "Walnut, Dragon heartstring, 12¾ inches",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Cruciatus", icon: "crisis_alert", desc: "Her favourite Unforgivable Curse, used to torture the Longbottoms." },
            { name: "Avada Kedavra", icon: "warning", desc: "The Killing Curse; used to murder Sirius Black." },
            { name: "Fiendfyre", icon: "local_fire_department", desc: "Cursed fire that seeks out living targets." },
            { name: "Legilimency", icon: "psychology", desc: "Expert at invading minds and extracting information." },
        ],
        timeline: [
            { event: "Joins Death Eaters (1970s)", desc: "Becomes Voldemort's most devoted follower." },
            { event: "Azkaban (1981-1996)", desc: "Imprisoned for torturing the Longbottoms; escapes in mass breakout." },
            { event: "Battle of Hogwarts (1998)", desc: "Killed by Molly Weasley during the final battle." },
        ],
        artefacts: ["Hufflepuff's Cup (kept in her vault)", "Dark Mark"],
        relationships: [
            { role: "Master", name: "Lord Voldemort", img: HP("lord-voldemort") },
            { role: "Cousin", name: "Sirius Black", img: sirius },
            { role: "Sister", name: "Narcissa Malfoy", img: narcissa },
            { role: "Nemesis", name: "Harry Potter", img: HP("harry-potter") },
        ],
    },

    "Rubeus Hagrid": {
        quote: '"Yer a wizard, Harry."',
        biography: `Rubeus Hagrid is the half-giant Keeper of Keys and Grounds at Hogwarts. Expelled in his third year after being falsely blamed for opening the Chamber of Secrets, he was allowed to remain at Hogwarts by Dumbledore.\n\nHagrid was Harry's first connection to the wizarding world, delivering his Hogwarts letter. His fierce loyalty to Dumbledore and love for dangerous creatures defined his character throughout the saga.`,
        wand: "Oak, 16 inches (broken; kept in pink umbrella)",
        patronus: "Unknown",
        boggart: "Voldemort",
        spells: [
            { name: "Wingardium Leviosa", icon: "air", desc: "Basic levitation charm performed with his broken wand." },
            { name: "Blast-Ended Skrewt Care", icon: "pets", desc: "Raises dangerous magical creatures with extraordinary affection." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Basic defensive charm retained from his brief time at Hogwarts." },
            { name: "Giant Resistance", icon: "shield", desc: "Natural resistance to many spells due to his giant heritage." },
        ],
        timeline: [
            { event: "Expelled (1943)", desc: "Wrongly blamed for opening the Chamber; wand destroyed." },
            { event: "Delivers Harry (1991)", desc: "Brings Harry his Hogwarts letter and introduces him to magic." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights alongside students and faculty in the final battle." },
        ],
        artefacts: ["Pink umbrella (hidden wand)", "Flying motorcycle (borrowed from Sirius)", "Norbert the Dragon (egg)"],
        relationships: [
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Mentor", name: "Albus Dumbledore", img: dumbledore },
            { role: "Friend", name: "Hermione Granger", img: hermione },
            { role: "Friend", name: "Ron Weasley", img: HP("ron-weasley") },
        ],
    },

    "Minerva McGonagall": {
        quote: '"Why is it that whenever something happens, it is always you three?"',
        biography: `Minerva McGonagall was Deputy Headmistress and Transfiguration professor at Hogwarts, as well as Head of Gryffindor House. A registered Animagus, she could transform into a tabby cat at will.\n\nKnown for her stern demeanor hiding a deep compassion for her students, McGonagall fought in both Wizarding Wars and became Headmistress after Snape's death.`,
        wand: "Fir, Dragon heartstring, 9½ inches",
        patronus: "Tabby cat",
        boggart: "Unknown",
        spells: [
            { name: "Animagus Transformation", icon: "pets", desc: "Can transform into a tabby cat — a registered Animagus." },
            { name: "Piertotum Locomotor", icon: "smart_toy", desc: "Brings the stone suits of armour in Hogwarts to life." },
            { name: "Transfiguration", icon: "autorenew", desc: "Master of Transfiguration — can transform objects and creatures." },
            { name: "Protego Maxima", icon: "shield", desc: "Casts immensely powerful protective enchantments over Hogwarts." },
        ],
        timeline: [
            { event: "Joins Hogwarts Staff (1956)", desc: "Begins her long tenure as Transfiguration professor." },
            { event: "First Wizarding War", desc: "Fights against Voldemort and his Death Eaters." },
            { event: "Battle of Hogwarts (1998)", desc: "Leads the defense of Hogwarts, animating the castle's statues." },
        ],
        artefacts: ["Tabby cat form", "Hogwarts house points system"],
        relationships: [
            { role: "Student", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Headmaster", name: "Albus Dumbledore", img: dumbledore },
            { role: "Colleague", name: "Severus Snape", img: HP("severus-snape") },
            { role: "Student", name: "Hermione Granger", img: hermione },
        ],
    },

    "Cedric Diggory": {
        quote: '"For a Hufflepuff, you sure are brave."',
        biography: `Cedric Diggory was a Hufflepuff student celebrated for his exceptional talent, integrity, and handsome appearance. As the Hogwarts Champion in the Triwizard Tournament, he competed with fairness and honor.\n\nHis untimely death at the hands of Peter Pettigrew on Voldemort's orders marked one of the darkest moments in the saga, serving as the catalyst for the Second Wizarding War.`,
        wand: "Ash, Unicorn hair, 12¼ inches",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Conjunctivitis Curse", icon: "visibility_off", desc: "Used against the dragon in the Triwizard Tournament's first task." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "The Disarming Charm — used alongside Harry in the graveyard." },
            { name: "Accio", icon: "send", desc: "The Summoning Charm, used in the Triwizard Tournament." },
            { name: "Impervius", icon: "water_drop", desc: "A charm that repels water; useful in the lake task." },
        ],
        timeline: [
            { event: "Quidditch Match (1993)", desc: "Defeats Gryffindor but offers a rematch after Harry faints." },
            { event: "Triwizard Champion (1994)", desc: "Selected as Hogwarts Champion and competes with fairness." },
            { event: "Death in the Graveyard (1995)", desc: "Murdered by Pettigrew on Voldemort's orders: 'Kill the spare.'" },
        ],
        artefacts: ["Triwizard Cup (portkey)", "Hufflepuff champion badge"],
        relationships: [
            { role: "Co-Champion", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Girlfriend", name: "Cho Chang", img: HP("cho-chang") },
            { role: "Mentor", name: "Albus Dumbledore", img: dumbledore },
            { role: "Teacher", name: "Pomona Sprout", img: HP("pomona-sprout") },
        ],
    },

    "Fred Weasley": {
        quote: '"Honestly woman, you call yourself our mother?"',
        biography: `Frederick Weasley was one half of the legendary Weasley twins, inseparable from his brother George. Together they were Hogwarts' most celebrated pranksters and co-founders of Weasleys' Wizard Wheezes.\n\nFred's death in the Battle of Hogwarts during an explosion caused one of the saga's most devastating emotional moments. His legacy lives on through George and the joke shop they built together.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Extendable Ears", icon: "hearing", desc: "Invented magical listening devices to eavesdrop on conversations." },
            { name: "Portable Swamp", icon: "water", desc: "Created a real swamp in Hogwarts corridor to defy Umbridge." },
            { name: "Fireworks Jinx", icon: "celebration", desc: "Launched spectacular Weasley fireworks throughout Hogwarts." },
            { name: "Shield Hat Charm", icon: "shield", desc: "Invented Shield Hats later used by the Ministry of Magic." },
        ],
        timeline: [
            { event: "Hogwarts Pranksters", desc: "Become legendary for their jokes and chaos throughout school." },
            { event: "Leave Hogwarts (1996)", desc: "Dramatically exit Hogwarts on broomsticks defying Umbridge." },
            { event: "Battle of Hogwarts (1998)", desc: "Dies in an explosion during the battle, aged 20." },
        ],
        artefacts: ["Weasleys' Wizard Wheezes products", "Extendable Ears", "Portable Swamp"],
        relationships: [
            { role: "Twin", name: "George Weasley", img: HP("george-weasley") },
            { role: "Brother", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Mother", name: "Molly Weasley", img: molly },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
        ],
    },

    "George Weasley": {
        quote: '"You are the better-looking one."',
        biography: `George Weasley was one half of the iconic Weasley twins. Inseparable from his twin Fred, George was known for his humor, inventiveness, and entrepreneurial spirit. Together they co-founded Weasleys' Wizard Wheezes.\n\nAfter Fred's death in the Battle of Hogwarts, George struggled deeply but ultimately continued their joke shop legacy, naming his first son Fred in his brother's honor.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Extendable Ears", icon: "hearing", desc: "Co-invented magical listening devices with Fred." },
            { name: "Portable Swamp", icon: "water", desc: "Co-created a swamp in Hogwarts to defy Umbridge." },
            { name: "Decoy Detonators", icon: "device_unknown", desc: "Invented small devices that create diversions." },
            { name: "Peruvian Darkness Powder", icon: "dark_mode", desc: "Creates impenetrable darkness for quick escapes." },
        ],
        timeline: [
            { event: "Hogwarts Pranksters", desc: "Becomes legendary alongside Fred for magical mischief." },
            { event: "Battle of Seven Potters (1997)", desc: "Loses his ear to Snape's Sectumsempra during the escape." },
            { event: "Post-War (1998+)", desc: "Continues Weasleys' Wizard Wheezes in Fred's memory." },
        ],
        artefacts: ["Weasleys' Wizard Wheezes products", "Extendable Ears"],
        relationships: [
            { role: "Twin", name: "Fred Weasley", img: HP("fred-weasley") },
            { role: "Brother", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Mother", name: "Molly Weasley", img: molly },
        ],
    },

    "Dobby": {
        quote: '"Dobby has no master. Dobby is a free elf!"',
        biography: `Dobby was a house-elf who served the Malfoy family until Harry Potter tricked Lucius Malfoy into freeing him. Despite a rocky first meeting, he became one of Harry's most devoted friends.\n\nHis fierce loyalty, bravery, and love of freedom made him extraordinary among house-elves. He died heroically saving Harry and his friends from Malfoy Manor, and was buried by Harry with full honors.`,
        wand: "None",
        patronus: "None",
        boggart: "Unknown",
        spells: [
            { name: "Apparition", icon: "blur_circular", desc: "Can Apparate and Disapparate freely, even in Hogwarts." },
            { name: "Hover Charm", icon: "air", desc: "Levitated Aunt Petunia's pudding to get Harry in trouble." },
            { name: "Blasting Spell", icon: "bolt", desc: "Powerful defensive magic used to protect Harry at Malfoy Manor." },
            { name: "Elf Magic", icon: "auto_awesome", desc: "Can perform powerful wandless magic unique to house-elves." },
        ],
        timeline: [
            { event: "Warns Harry (1992)", desc: "Tries to prevent Harry returning to Hogwarts; causes chaos." },
            { event: "Freed by Harry (1992)", desc: "Harry tricks Lucius into freeing Dobby with a sock." },
            { event: "Death at Malfoy Manor (1998)", desc: "Struck by Bellatrix's knife while rescuing Harry. Dies free." },
        ],
        artefacts: ["Mismatched socks (symbol of freedom)", "Harry's old socks"],
        relationships: [
            { role: "Best Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Former Master", name: "Lucius Malfoy", img: HP("lucius-malfoy") },
            { role: "Friend", name: "Hermione Granger", img: hermione },
            { role: "Friend", name: "Ron Weasley", img: HP("ron-weasley") },
        ],
    },

    "Nymphadora Tonks": {
        quote: '"I\'m a Metamorphmagus. I can change my appearance at will."',
        biography: `Nymphadora Tonks, who preferred to be called simply "Tonks", was a Metamorphmagus Auror and member of the Order of the Phoenix. Daughter of Ted and Andromeda Tonks, she was trained by Mad-Eye Moody.\n\nTonks fell in love with Remus Lupin despite his reservations about their age gap and his lycanthropy. She died alongside him in the Battle of Hogwarts, leaving behind their infant son Teddy.`,
        wand: "Unknown wood and core",
        patronus: "Wolf (changed from rabbit after falling in love with Lupin)",
        boggart: "Voldemort's masked face",
        spells: [
            { name: "Metamorphmagus", icon: "face", desc: "Can change her appearance at will without a wand." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning spell used as an Auror in the field." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm used in Order of the Phoenix missions." },
            { name: "Protego", icon: "shield", desc: "Shield Charm used defensively in battles." },
        ],
        timeline: [
            { event: "Joins the Order (1995)", desc: "Becomes an active member of the Order of the Phoenix." },
            { event: "Marries Lupin (1997)", desc: "Marries Remus Lupin and gives birth to son Teddy." },
            { event: "Battle of Hogwarts (1998)", desc: "Dies fighting alongside Remus Lupin." },
        ],
        artefacts: ["Auror badge", "Order of the Phoenix membership"],
        relationships: [
            { role: "Husband", name: "Remus Lupin", img: HP("remus-lupin") },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Mentor", name: "Mad-Eye Moody", img: HP("mad-eye-moody") },
            { role: "Mother", name: "Andromeda Tonks", img: HP("nymphadora-tonks") },
        ],
    },

    "Arthur Weasley": {
        quote: '"Never trust anything that can think for itself if you can\'t see where it keeps its brain."',
        biography: `Arthur Weasley was the patriarch of the Weasley family and a Ministry of Magic employee in the Misuse of Muggle Artefacts Office. His boundless enthusiasm for all things Muggle, despite being a wizard, was a defining characteristic.\n\nArthur was a gentle but brave man who fought in both Wizarding Wars as a member of the Order of the Phoenix. His love for his family and his irrepressible good nature made him one of the most beloved characters in the saga.`,
        wand: "Unknown wood and core",
        patronus: "Weasel",
        boggart: "Unknown",
        spells: [
            { name: "Reparo", icon: "build", desc: "The Mending Charm, used to fix broken objects." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning spell used as a member of the Order of the Phoenix." },
            { name: "Muggle Enchantments", icon: "auto_fix_high", desc: "Skilled at enchanting Muggle objects, though often illegally." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm used in Order missions." },
        ],
        timeline: [
            { event: "Marries Molly (1970s)", desc: "Marries Molly Prewett and raises seven children." },
            { event: "Attacked by Nagini (1995)", desc: "Nearly killed by Voldemort's snake while guarding the Prophecy." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights alongside his family in the final battle." },
        ],
        artefacts: ["Flying Ford Anglia (enchanted)", "Collection of Muggle items"],
        relationships: [
            { role: "Wife", name: "Molly Weasley", img: molly },
            { role: "Son", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Daughter", name: "Ginny Weasley", img: HP("ginny-weasley") },
        ],
    },

    "Molly Weasley": {
        quote: '"Not my daughter, you bitch!"',
        biography: `Molly Weasley (née Prewett) was the matriarch of the Weasley family and one of the most formidable witches in the Order of the Phoenix. She raised seven children with warmth, fierce love, and an iron will.\n\nDespite appearing to be simply a housewife, Molly proved herself an extraordinarily powerful duelist when she defeated Bellatrix Lestrange in the Battle of Hogwarts to protect her daughter Ginny.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "The dead bodies of her family members",
        spells: [
            { name: "Bat-Bogey Hex", icon: "pest_control", desc: "A powerful hex that passed down to daughter Ginny." },
            { name: "Avada Kedavra (defence)", icon: "shield", desc: "Defeated Bellatrix Lestrange in single combat." },
            { name: "Healing Spells", icon: "medical_services", desc: "Expert at healing magic for her large family." },
            { name: "Household Charms", icon: "home", desc: "Masterful at domestic magic — dishes wash themselves." },
        ],
        timeline: [
            { event: "Marries Arthur (1970s)", desc: "Marries Arthur Weasley and raises seven children." },
            { event: "Loses Fred (1998)", desc: "Suffers the devastating loss of her son Fred in the Battle of Hogwarts." },
            { event: "Defeats Bellatrix (1998)", desc: "Kills Bellatrix Lestrange to protect her daughter Ginny." },
        ],
        artefacts: ["Weasley family clock (shows family members' whereabouts)"],
        relationships: [
            { role: "Husband", name: "Arthur Weasley", img: HP("arthur-weasley") },
            { role: "Son", name: "Ron Weasley", img: HP("ron-weasley") },
            { role: "Daughter", name: "Ginny Weasley", img: HP("ginny-weasley") },
            { role: "Like a Son", name: "Harry Potter", img: HP("harry-potter") },
        ],
    },

    "Lucius Malfoy": {
        quote: '"The Dark Lord will rise again, Crabbe. Wormtail has made his intentions clear."',
        biography: `Lucius Malfoy was one of Voldemort's most prominent Death Eaters and patriarch of the Malfoy family. A pure-blood supremacist and governor of Hogwarts Board of Directors, he wielded enormous influence in the Ministry of Magic through bribery and connections.\n\nAfter Voldemort's return, Lucius served as a Death Eater until his imprisonment following the Battle of the Department of Mysteries. His growing disillusionment with Voldemort was driven by concern for his son Draco.`,
        wand: "Elm, Dragon heartstring, 18 inches",
        patronus: "Unknown",
        boggart: "Lord Voldemort (disappointed in him)",
        spells: [
            { name: "Crucio", icon: "crisis_alert", desc: "Unforgivable Curse used as a Death Eater." },
            { name: "Imperius", icon: "psychology", desc: "Claimed to be under the Imperius Curse after Voldemort's first fall." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Skilled duelist and practitioner of dark magic." },
            { name: "Dark Arts", icon: "warning", desc: "Deeply knowledgeable in the Dark Arts from years as a Death Eater." },
        ],
        timeline: [
            { event: "Joins Death Eaters (1970s)", desc: "Becomes one of Voldemort's most loyal followers." },
            { event: "Planted Diary (1992)", desc: "Gives Tom Riddle's diary to Ginny Weasley at Flourish and Blotts." },
            { event: "Imprisoned (1996)", desc: "Sent to Azkaban after the Battle of the Department of Mysteries." },
        ],
        artefacts: ["Snake-headed walking stick (conceals wand)", "Tom Riddle's Diary (planted on Ginny)"],
        relationships: [
            { role: "Son", name: "Draco Malfoy", img: HP("draco-malfoy") },
            { role: "Wife", name: "Narcissa Malfoy", img: narcissa },
            { role: "Master", name: "Lord Voldemort", img: HP("lord-voldemort") },
            { role: "Rival", name: "Arthur Weasley", img: HP("arthur-weasley") },
        ],
    },

    "Narcissa Malfoy": {
        quote: '"Is Draco alive? Is he in the castle?"',
        biography: `Narcissa Malfoy (née Black) was the wife of Lucius Malfoy and mother of Draco. Though a pure-blood supremacist by upbringing, her primary motivation was always the safety of her son.\n\nIn her most pivotal moment, Narcissa lied to Voldemort about Harry Potter being dead in the Forbidden Forest — an act of maternal love that proved decisive in Voldemort's ultimate defeat.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Occlumency", icon: "lock", desc: "Skilled at concealing her thoughts — lied to Voldemort successfully." },
            { name: "Dark Arts", icon: "warning", desc: "Knowledgeable in dark magic from her Black family upbringing." },
            { name: "Protego", icon: "shield", desc: "Defensive magic used to protect her family." },
            { name: "Healing Magic", icon: "medical_services", desc: "Used healing magic to tend to Draco's injuries." },
        ],
        timeline: [
            { event: "Marries Lucius (1970s)", desc: "Marries into the Malfoy family and becomes a pure-blood socialite." },
            { event: "Unbreakable Vow (1996)", desc: "Forces Snape to make an Unbreakable Vow to protect Draco." },
            { event: "Saves Harry (1998)", desc: "Lies to Voldemort that Harry is dead, saving his life." },
        ],
        artefacts: ["Black family heirlooms", "Unbreakable Vow (with Snape)"],
        relationships: [
            { role: "Son", name: "Draco Malfoy", img: HP("draco-malfoy") },
            { role: "Husband", name: "Lucius Malfoy", img: HP("lucius-malfoy") },
            { role: "Sister", name: "Bellatrix Lestrange", img: HP("bellatrix-lestrange") },
            { role: "Ally", name: "Severus Snape", img: HP("severus-snape") },
        ],
    },

    "Peter Pettigrew": {
        quote: '"He\'s back, Harry! He\'s back! Voldemort!"',
        biography: `Peter Pettigrew, known as Wormtail, was one of the Marauders and a secret Death Eater. He betrayed James and Lily Potter to Voldemort, framed Sirius Black for the crime, faked his own death, and lived as Ron Weasley's rat Scabbers for twelve years.\n\nPettigrew played a crucial role in Voldemort's return, cutting off his own hand to restore his master's body. His silver hand, given by Voldemort, ultimately strangled him when he hesitated to kill Harry Potter.`,
        wand: "Chestnut, Dragon heartstring, 9¼ inches",
        patronus: "Unknown",
        boggart: "Voldemort",
        spells: [
            { name: "Animagus Transformation", icon: "pets", desc: "Can transform into a rat — lived as Scabbers for 12 years." },
            { name: "Fidelius Charm", icon: "lock", desc: "Was Secret-Keeper for the Potters — and betrayed them." },
            { name: "Avada Kedavra", icon: "warning", desc: "Murdered twelve Muggles with a single curse." },
            { name: "Dark Arts", icon: "warning", desc: "Served Voldemort loyally with dark magic." },
        ],
        timeline: [
            { event: "Betrays the Potters (1981)", desc: "Reveals the Potters' location to Voldemort, causing their deaths." },
            { event: "Lives as Scabbers (1981-1994)", desc: "Hides as Ron Weasley's rat for twelve years." },
            { event: "Death (1998)", desc: "Strangled by his own silver hand when he hesitates to kill Harry." },
        ],
        artefacts: ["Silver hand (given by Voldemort)", "Scabbers disguise"],
        relationships: [
            { role: "Former Friend", name: "Sirius Black", img: sirius },
            { role: "Former Friend", name: "Remus Lupin", img: HP("remus-lupin") },
            { role: "Master", name: "Lord Voldemort", img: HP("lord-voldemort") },
            { role: "Victim", name: "Harry Potter", img: HP("harry-potter") },
        ],
    },

    "James Potter": {
        quote: '"Take Harry and run. I\'ll hold him off."',
        biography: `James Potter was a pure-blood wizard and one of the most talented students in his Hogwarts generation. He was a natural leader, Quidditch star, and co-creator of the Marauder's Map. His early arrogance mellowed considerably through his relationship with Lily Evans.\n\nJames sacrificed himself without a wand when Voldemort came for his family, buying precious seconds for Lily to protect baby Harry with her love.`,
        wand: "Mahogany, 11 inches (pliable)",
        patronus: "Stag",
        boggart: "Unknown",
        spells: [
            { name: "Animagus Transformation", icon: "pets", desc: "Could transform into a stag — known as Prongs." },
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Skilled duellist and Defence Against the Dark Arts practitioner." },
            { name: "Marauder's Map", icon: "map", desc: "Co-creator of the magical map of Hogwarts." },
            { name: "Quidditch", icon: "sports", desc: "Exceptional Quidditch player — Gryffindor Chaser and Seeker." },
        ],
        timeline: [
            { event: "Hogwarts Years (1971-1978)", desc: "Becomes Head Boy, falls in love with Lily Evans." },
            { event: "Joins the Order (1978)", desc: "Fights Voldemort as a member of the Order of the Phoenix." },
            { event: "Death (1981)", desc: "Sacrifices himself to protect Lily and Harry from Voldemort." },
        ],
        artefacts: ["Invisibility Cloak (passed to Harry)", "Marauder's Map (co-creator)"],
        relationships: [
            { role: "Wife", name: "Lily Potter", img: lily },
            { role: "Son", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Best Friend", name: "Sirius Black", img: sirius },
            { role: "Friend", name: "Remus Lupin", img: HP("remus-lupin") },
        ],
    },

    "Lily Potter": {
        quote: '"Not Harry, please no, take me, kill me instead!"',
        biography: `Lily Potter (née Evans) was a Muggle-born witch and one of the most gifted students of her generation at Hogwarts. Her friendship with Severus Snape began in childhood but was destroyed by his association with Dark Magic.\n\nLily's sacrifice when she chose to die rather than step aside from her infant son Harry created a powerful protective magic. Her love proved the ultimate counter to Voldemort's killing curse.`,
        wand: "Willow, 10¼ inches (swishy)",
        patronus: "Doe",
        boggart: "Unknown",
        spells: [
            { name: "Ancient Magic", icon: "auto_awesome", desc: "Her sacrificial death created ancient protective magic for Harry." },
            { name: "Charms", icon: "star", desc: "Exceptionally talented at Charms — praised by Professor Slughorn." },
            { name: "Potions", icon: "science", desc: "A natural at Potions — befriended by Slughorn for her talent." },
            { name: "Love Magic", icon: "favorite", desc: "Her love for Harry became the most powerful magic of all." },
        ],
        timeline: [
            { event: "Hogwarts Years (1971-1978)", desc: "Becomes Head Girl, breaks friendship with Snape, falls for James." },
            { event: "Joins the Order (1978)", desc: "Fights Voldemort three times as a member of the Order." },
            { event: "Death (1981)", desc: "Sacrifices herself for Harry, creating powerful protective magic." },
        ],
        artefacts: ["Letter to Sirius (found by Harry)", "Old photographs"],
        relationships: [
            { role: "Husband", name: "James Potter", img: HP("james-potter") },
            { role: "Son", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Childhood Friend", name: "Severus Snape", img: HP("severus-snape") },
            { role: "Best Friend", name: "Sirius Black", img: sirius },
        ],
    },

    "Dolores Umbridge": {
        quote: '"I must not tell lies."',
        biography: `Dolores Jane Umbridge was Senior Undersecretary to the Minister for Magic and later High Inquisitor and Headmistress of Hogwarts. She represented everything corrupt about bureaucratic power — a smiling sadist who used authority to torture and control.\n\nUmbridge used a blood quill to force students to write lines that cut into their skin. She was ultimately dragged away by centaurs in the Forbidden Forest and left traumatised.`,
        wand: "Birch, Dragon heartstring, 8 inches (inflexible)",
        patronus: "Persian cat",
        boggart: "Unknown",
        spells: [
            { name: "Cruciatus", icon: "crisis_alert", desc: "Used the Cruciatus Curse illegally on students during interrogation." },
            { name: "Incarcerous", icon: "link", desc: "Binds targets with ropes — used against students and centaurs." },
            { name: "Blood Quill", icon: "edit", desc: "A dark instrument that carves words into flesh." },
            { name: "Protego", icon: "shield", desc: "Skilled defensive magic — cast a Patronus against Dementors." },
        ],
        timeline: [
            { event: "Defence Teacher (1995)", desc: "Appointed by the Ministry to control Hogwarts curriculum." },
            { event: "High Inquisitor", desc: "Takes over Hogwarts and terrorises students and staff." },
            { event: "Centaur Attack (1996)", desc: "Dragged into the Forbidden Forest by centaurs after Harry tricks her." },
        ],
        artefacts: ["Blood Quill", "Ministry of Magic decrees", "Pink cardigan collection"],
        relationships: [
            { role: "Enemy", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Enemy", name: "Albus Dumbledore", img: dumbledore },
            { role: "Enemy", name: "Hermione Granger", img: hermione },
            { role: "Superior", name: "Cornelius Fudge", img: HP("cornelius-fudge") },
        ],
    },

    "Cho Chang": {
        quote: '"Cedric talked about you all the time. He said you were a really good Quidditch player."',
        biography: `Cho Chang was a Ravenclaw student and talented Quidditch Seeker, one year above Harry Potter. She was Cedric Diggory's girlfriend and was deeply traumatised by his death.\n\nCho briefly dated Harry in their fifth year, but their relationship was strained by grief, jealousy, and the pressures of Dolores Umbridge's reign. She later joined Dumbledore's Army and fought in the Battle of Hogwarts.`,
        wand: "Unknown wood and core",
        patronus: "Swan",
        boggart: "Unknown",
        spells: [
            { name: "Expelliarmus", icon: "auto_fix_high", desc: "Disarming Charm practiced in Dumbledore's Army sessions." },
            { name: "Stupefy", icon: "flash_on", desc: "Stunning Spell learned through DA training." },
            { name: "Quidditch", icon: "sports", desc: "Exceptional Seeker — caught the Snitch against Harry multiple times." },
            { name: "Protego", icon: "shield", desc: "Shield Charm mastered through DA training under Harry." },
        ],
        timeline: [
            { event: "Triwizard Tournament (1994)", desc: "Dates Cedric Diggory during his time as Hogwarts Champion." },
            { event: "Cedric's Death (1995)", desc: "Devastated by Cedric's death; briefly dates Harry Potter." },
            { event: "Battle of Hogwarts (1998)", desc: "Returns to fight alongside Dumbledore's Army." },
        ],
        artefacts: ["Quidditch broomstick", "Dumbledore's Army coin"],
        relationships: [
            { role: "Boyfriend (deceased)", name: "Cedric Diggory", img: HP("cedric-diggory") },
            { role: "Brief Romance", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Friend", name: "Luna Lovegood", img: HP("luna-lovegood") },
        ],
    },

    "Viktor Krum": {
        quote: '"Herm-own-ninny."',
        biography: `Viktor Krum was a famous Bulgarian Seeker who played for the Bulgarian National Quidditch team at age eighteen. He attended Durmstrang Institute and participated in the Triwizard Tournament at Hogwarts.\n\nKrum developed feelings for Hermione Granger during the tournament and invited her to the Yule Ball. Despite his intimidating appearance and international fame, he proved to be thoughtful and kind.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Conjunctivitis Curse", icon: "visibility_off", desc: "Used against the dragon in the Triwizard first task." },
            { name: "Cruciatus (Imperius)", icon: "crisis_alert", desc: "Placed under the Imperius Curse in the maze task." },
            { name: "Quidditch Mastery", icon: "sports", desc: "One of the greatest Seekers of his generation." },
            { name: "Dark Arts", icon: "warning", desc: "Trained at Durmstrang, which openly teaches Dark Arts." },
        ],
        timeline: [
            { event: "Quidditch World Cup (1994)", desc: "Plays for Bulgaria in the Quidditch World Cup final." },
            { event: "Triwizard Tournament (1994)", desc: "Competes as Durmstrang's Champion in the tournament." },
            { event: "Bill's Wedding (1997)", desc: "Attends Bill and Fleur's wedding and warns about Xenophilius." },
        ],
        artefacts: ["Durmstrang ship", "Triwizard Cup"],
        relationships: [
            { role: "Admiration", name: "Hermione Granger", img: hermione },
            { role: "Rival", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Headmaster", name: "Igor Karkaroff", img: HP("igor-karkaroff") },
        ],
    },

    "Fleur Delacour": {
        quote: '"Bill is not perfectlee \'andsome anymore, but I do not care."',
        biography: `Fleur Isabelle Delacour was a part-Veela witch from France who attended Beauxbatons Academy of Magic. She represented her school in the Triwizard Tournament and later worked at Gringotts where she met Bill Weasley.\n\nFleur's devotion to Bill, even after he was attacked by Fenrir Greyback, demonstrated a depth of character beyond her beautiful exterior. She and Bill provided shelter to Harry and his friends at Shell Cottage.`,
        wand: "Rosewood, Veela hair, 9½ inches (inflexible)",
        patronus: "Unknown",
        boggart: "Unknown",
        spells: [
            { name: "Partial Firebreath", icon: "local_fire_department", desc: "Used fire in the Triwizard lake task." },
            { name: "Glacius", icon: "ac_unit", desc: "Freezing charm used in the Triwizard Tournament tasks." },
            { name: "Veela Charm", icon: "star", desc: "Natural magical allure from her Veela heritage." },
            { name: "Healing Magic", icon: "medical_services", desc: "Cared for Bill after his werewolf attack." },
        ],
        timeline: [
            { event: "Triwizard Tournament (1994)", desc: "Competes as Beauxbatons Champion, befriends the Weasleys." },
            { event: "Marries Bill (1997)", desc: "Marries Bill Weasley at the Burrow before Voldemort's takeover." },
            { event: "Shell Cottage (1998)", desc: "Shelters Harry, Ron, Hermione, and others at her home." },
        ],
        artefacts: ["Shell Cottage", "Triwizard Tournament memorabilia"],
        relationships: [
            { role: "Husband", name: "Bill Weasley", img: HP("bill-weasley") },
            { role: "Friend", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Sister-in-law", name: "Ginny Weasley", img: HP("ginny-weasley") },
            { role: "Mother-in-law", name: "Molly Weasley", img: molly },
        ],
    },

    "Horace Slughorn": {
        quote: '"I am not proud of it. I am not proud of it."',
        biography: `Horace Slughorn was the long-serving Potions master at Hogwarts and Head of Slytherin House. He ran an exclusive group called the "Slug Club" composed of students he believed would achieve great things.\n\nSlughorn's pivotal moment came when Dumbledore persuaded him to return to teaching so he could retrieve the memory of his conversation with Tom Riddle about Horcruxes — a memory he had hidden out of shame.`,
        wand: "Cedar, Dragon heartstring, 10 inches",
        patronus: "Unknown",
        boggart: "Voldemort",
        spells: [
            { name: "Potion Mastery", icon: "science", desc: "Considered one of the finest Potions masters of his age." },
            { name: "Memory Modification", icon: "psychology", desc: "Modified his own memory to hide the Horcrux conversation." },
            { name: "Stupefy", icon: "flash_on", desc: "Capable duelist who fought in the Battle of Hogwarts." },
            { name: "Protego", icon: "shield", desc: "Defensive magic used in the final battle." },
        ],
        timeline: [
            { event: "First tenure (pre-1981)", desc: "Teaches Potions for many years, mentors Tom Riddle." },
            { event: "Returns to Hogwarts (1996)", desc: "Persuaded by Dumbledore to come out of retirement." },
            { event: "Battle of Hogwarts (1998)", desc: "Fights against Death Eaters in the final battle." },
        ],
        artefacts: ["Liquid Luck (Felix Felicis)", "Slug Club records", "Memory of Horcrux conversation"],
        relationships: [
            { role: "Mentor", name: "Albus Dumbledore", img: dumbledore },
            { role: "Student", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Student", name: "Hermione Granger", img: hermione },
            { role: "Former Student", name: "Lord Voldemort", img: HP("lord-voldemort") },
        ],
    },

    "Mad-Eye Moody": {
        quote: '"Constant vigilance!"',
        biography: `Alastor "Mad-Eye" Moody was the most famous Auror of his generation, responsible for capturing or killing more Dark Wizards than any other in history. His magical eye could see through objects and in all directions.\n\nMoody was captured and imprisoned by Bartemius Crouch Jr. in his own trunk during the Triwizard Tournament. He died in the Battle of the Seven Potters when Lord Voldemort himself intervened.`,
        wand: "Unknown wood and core",
        patronus: "Unknown",
        boggart: "A crystal ball showing him being killed",
        spells: [
            { name: "Auror Magic", icon: "shield", desc: "Mastery of both offensive and defensive magic from years as an Auror." },
            { name: "Magical Eye", icon: "visibility", desc: "His magical eye can see through walls, cloaks, and in all directions." },
            { name: "Stupefy", icon: "flash_on", desc: "Expert stunning spell caster from decades of Auror work." },
            { name: "Dark Arts Detection", icon: "warning", desc: "Can detect Dark Magic and concealed threats." },
        ],
        timeline: [
            { event: "Auror Career (pre-1994)", desc: "Decades of capturing Dark Wizards — fills half of Azkaban." },
            { event: "Triwizard Tournament (1994)", desc: "Impersonated by Barty Crouch Jr. while imprisoned in his own trunk." },
            { event: "Death (1997)", desc: "Killed by Voldemort during the Battle of the Seven Potters." },
        ],
        artefacts: ["Magical eye (enchanted glass eye)", "Magical leg (wooden)", "Hip flask (constant vigilance against poisoning)"],
        relationships: [
            { role: "Friend", name: "Albus Dumbledore", img: dumbledore },
            { role: "Student", name: "Nymphadora Tonks", img: HP("nymphadora-tonks") },
            { role: "Ally", name: "Harry Potter", img: HP("harry-potter") },
            { role: "Enemy", name: "Lord Voldemort", img: HP("lord-voldemort") },
        ],
    },
};

export default charactersData;