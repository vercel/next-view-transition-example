import { getContrastColor } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import FloatingBall from "../components/FloatingBall";
import cocktails from "./cocktails.json";
import { Cocktail } from "./types";

export default function CocktailsView() {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(
    cocktails[0]
  );

  return (
    <div
      className="min-h-screen px-8 py-12 transition-colors duration-500"
      style={{ backgroundColor: selectedCocktail?.backgroundColor }}
    >
      {/* Floating fruits row */}
      <div className="flex justify-center flex-wrap gap-8 mb-4">
        {cocktails.map((cocktail) => (
          <FloatingBall
            key={cocktail.name}
            size={80}
            content={
              <Image
                src={cocktail.fruitImage}
                alt={cocktail.fruitImageAlt}
                width={100}
                height={100}
              />
            }
            onClick={() => setSelectedCocktail(cocktail)}
          />
        ))}
      </div>

      <div
        className="container mx-auto"
        style={{ color: getContrastColor(selectedCocktail.backgroundColor) }}
      >
        {/* Title and Description */}
        <div className="text-center mb-10">
          <h1 className="text-[80px] font-serif">{selectedCocktail.name}</h1>
          <p className="text-2xl max-w-3xl mx-auto">
            {selectedCocktail.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-16">
          {/* Ingredients */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2 className="text-4xl font-bold mb-4">INGREDIENTS</h2>
            <ul className="space-y-4 text-xl">
              {selectedCocktail.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Cocktail Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-[300px] aspect-[2/3] rounded-3xl">
              <Image
                src={selectedCocktail.cocktailImage}
                alt={selectedCocktail.cocktailImageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 300px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
