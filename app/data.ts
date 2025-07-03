import type { Cocktail, Hobby, Project, Song } from "./types";

export const hobbies: Hobby[] = [
  {
    id: "code",
    color: "#64A2BA",
  },
  {
    id: "karaoke",
    color: "#E09E8E",
  },
  {
    id: "cocktails",
    color: "#556D43",
  },
];

export const cocktails: Cocktail[] = [
  {
    name: "Paloma",
    fruitImage: "/cocktails/grapefruit.png",
    fruitImageAlt: "Grapefruit",
    cocktailImage: "/cocktails/paloma.png",
    cocktailImageAlt: "Paloma",
    description:
      "A refreshing and light cocktail made with tequila, lime juice, and a splash of soda water, topped with a salt rim and a lime wedge.",
    ingredients: ["Tequila", "Lime juice", "Soda water", "Salt", "Lime wedge"],
    backgroundColor: "#FFD3D9",
  },
  {
    name: "Old Fashioned",
    fruitImage: "/cocktails/orange.png",
    fruitImageAlt: "Orange",
    cocktailImage: "/cocktails/old-fashioned.png",
    cocktailImageAlt: "Old Fashioned",
    description:
      "A timeless cocktail combining whiskey, sugar, and bitters, garnished with an orange peel and cherry for a classic finish.",
    ingredients: [
      "2 oz bourbon or rye whiskey",
      "1 sugar cube",
      "2-3 dashes Angostura bitters",
      "Splash of water",
      "Orange peel",
      "Maraschino cherry",
    ],
    backgroundColor: "#F6D030",
  },
  {
    name: "Kentucky Maid",
    fruitImage: "/cocktails/cucumber.png",
    fruitImageAlt: "Cucumber",
    cocktailImage: "/cocktails/kentucky-maid.png",
    cocktailImageAlt: "Kentucky Maid",
    description:
      "A refreshing blend of bourbon, lime juice, cucumber, and mint, perfect for warm evenings.",
    ingredients: [
      "2 oz bourbon",
      "1 oz fresh lime juice",
      "1 oz simple syrup",
      "4 slices cucumber",
      "6 mint leaves",
      "Ice cubes",
    ],
    backgroundColor: "#D9D77E",
  },
  {
    name: "Amerie spritz",
    fruitImage: "/cocktails/fragute.png",
    fruitImageAlt: "Wild Strawberry",
    cocktailImage: "/cocktails/amerie-spritz.png",
    cocktailImageAlt: "Amerie spritz",
    description:
      "A refreshing and light cocktail made with Amerie, Prosecco and fresh mint.",
    ingredients: [
      "Amerie",
      "Prosecco",
      "Fresh mint",
      "Ice cubes",
      "Fresh wild strawberries or raspberries",
    ],
    backgroundColor: "#E7818A",
  },
  {
    name: "Whiskey Sour",
    fruitImage: "/cocktails/lemon.png",
    fruitImageAlt: "Lemon",
    cocktailImage: "/cocktails/whiskey-sour.png",
    cocktailImageAlt: "Whiskey Sour",
    description:
      "A classic cocktail featuring whiskey, fresh lemon juice, and simple syrup, shaken to perfection and garnished with a cherry and lemon wedge.",
    ingredients: [
      "2 oz whiskey",
      "1 oz fresh lemon juice",
      "3/4 oz simple syrup",
      "1/2 oz egg white (optional)",
      "Maraschino cherry",
      "Lemon wedge",
      "Ice cubes",
    ],
    backgroundColor: "#F4A447",
  },
];

export const projects: Project[] = [
  {
    name: "Vertical Timeline",
    projectImage: "/code/vertical-timeline.webm",
    projectLink: "https://v0-vertical-timeline.vercel.app/",
    description:
      "Lately, I felt like my memory is decaying so I created this project as a way to store memories and position myself better in time",
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Supabase",
      "React Query",
      "Uploadthing",
    ],
  },
  {
    name: "Upgrade T3 App",
    projectImage: "/code/upgrade-t3-app.webm",
    projectLink: "https://t3-upgrade-web.vercel.app/",
    description:
      "A framework I was using (T3) wasn't giving a clear way to upgrade from one version to another. Using basic Git diffing, I created a way to generate all diffs between versions so that upgrading can become easier",
    stack: ["T3 Stack", "Node.js", "Git", "Zod"],
  },
  {
    name: "Matryoshka Tic Tac Toe",
    projectImage: "/code/matryoshka-tic-tac-toe.webm",
    projectLink: "https://matryoshka-tic-tac-toe.vercel.app/",
    description:
      "Tic Tac Toe with an interesting twist. The goal is still to do 3 in a row on rows/columns/diagonals but the twist is that your pieces can take smaller pieces.",
    stack: ["React", "Vite", "Vitest"],
  },
];

export const songs: Song[] = [
  {
    name: "Basul si cu toba mare",
    artist: "Vița de Vie",
    album: "Fenomental",
    songImage: "/karaoke/basul-si-cu-toba-mare.png",
    youtubeId: "cV6eges3USQ",
  },
  {
    name: "L-O-V-E",
    artist: "Nat King Cole",
    album: "L-O-V-E",
    songImage: "/karaoke/l-o-v-e.png",
    youtubeId: "gZYtes1RO_w",
  },
  {
    name: "Sixteen Tons",
    artist: "Tennessee Ernie Ford",
    album: "Sixteen Tons",
    songImage: "/karaoke/sixteen-tons.png",
    youtubeId: "B9j91-18Kb4",
  },
  {
    name: "Wicked Game",
    artist: "Stone Sour",
    album: "Come What(ever) May [10th Anniversary Edition]",
    songImage: "/karaoke/wicked-game.png",
    youtubeId: "N0kDuZ2mcyg",
  },
];
