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
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-[80px]">{selectedCocktail.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center">
            {/* Description */}
            <div className="mb-8 text-center">
              <p className="mx-auto max-w-3xl text-2xl">
                {selectedCocktail.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="text-center">
              <h2 className="mb-4 text-4xl font-bold">INGREDIENTS</h2>
              <p className="text-xl">
                {selectedCocktail.ingredients.join(" • ")}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="relative aspect-[2/3] w-full max-w-[400px] rounded-3xl">
              <Image
                src={selectedCocktail.cocktailImage}
                alt={selectedCocktail.cocktailImageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
