import Image from "next/image";
import { useState } from "react";
import FloatingBall from "../components/FloatingBall";
import { cocktails } from "../data";
import { Cocktail } from "../types";

export default function CocktailsView() {
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail>(
    cocktails[0],
  );

  return (
    <div
      className="min-h-screen px-8 py-12 transition-colors duration-500"
      style={{ backgroundColor: selectedCocktail?.backgroundColor }}
    >
      {/* Floating fruits row */}
      <div className="mb-4 flex flex-wrap justify-center gap-8">
        {cocktails.map((cocktail) => (
          <FloatingBall
            key={cocktail.name}
            size={80}
            content={
              <Image
                src={cocktail.fruitImage}
                alt={cocktail.fruitImageAlt}
                fill
                loading="lazy"
              />
            }
            onClick={() => setSelectedCocktail(cocktail)}
          />
        ))}
      </div>

      <div className="container mx-auto" style={{ color: "#ffffff" }}>
        {/* Title and Description */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-[80px]">{selectedCocktail.name}</h1>
          <p className="mx-auto max-w-3xl text-2xl">
            {selectedCocktail.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-16">
          {/* Ingredients */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="mb-4 text-4xl font-bold">INGREDIENTS</h2>
            <ul className="space-y-4 text-xl">
              {selectedCocktail.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Cocktail Image */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-[2/3] w-[300px] rounded-3xl">
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
