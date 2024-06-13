import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState, useEffect } from "react";

function RecipeCard({ recipe, onFavoriteToggle = () => {}, bg, badge }) {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites"))?.some(
      (fav) => fav.label === recipe.label
    ) || false
  );

  useEffect(() => {
    setIsFavorite(
      JSON.parse(localStorage.getItem("favorites"))?.some(
        (fav) => fav.label === recipe.label
      ) || false
    );
  }, [recipe]);

  const addToFav = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.some(
      (fav) => fav.label === recipe.label
    );
    if (isAlreadyFavorite) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
    } else {
      favorites.push(recipe);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    onFavoriteToggle();
  };

  return (
    <div
      className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
    >
      <a
        href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`}
        target="_blank"
        className="relative h-32"
      >
        <img
          src={recipe.image}
          alt="recipe image"
          className="rounded-md w-full h-full object-cover cursor-pointer"
        />
        <div>
          <div className="absolute bottom-2 left-2 bg-white rounded-full cursor-pointer flex items-center gap-1 text-sm ">
            <Soup size={"16"} />
            {recipe.yield}
          </div>
          <div
            className="absolute top-1 right-2 bg-white rounde-full p-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              addToFav();
            }}
          >
            {!isFavorite && (
              <Heart
                size={"20"}
                className="hover:fill-red-500 hover:text-red-500"
              />
            )}
            {isFavorite && (
              <Heart size={"20"} className="fill-red-500 text-red-500" />
            )}
          </div>
        </div>
      </a>

      <div className=" flex mt-1">
        <p className="font-bold tracking-wide">{recipe.label}</p>
      </div>
      <p className="my-2">
        {" "}
        {recipe.cuisineType[0].charAt(0).toUpperCase() +
          recipe.cuisineType[0].slice(1)}{" "}
        Kitchen
      </p>
      <div className="flex gap-2 mt-auto">
        <div className={`flex items-center gap-1 rounded md`}>
          <HeartPulse size={"16"} />
          <span className="text-sm tracking-tighter font-semibold">
            {recipe.healthLabels[0]}
          </span>
        </div>
        <div className={`flex items-center gap-1 rounded md`}>
          <HeartPulse size={"16"} />
          <span className={` ${badge}text-sm tracking-tighter font-semibold`}>
            {recipe.healthLabels[1]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
