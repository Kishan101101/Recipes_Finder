import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";
function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, []);

  const handleFavoriteToggle = () => {
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  };

  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">My Favorites</p>
        {favorites.length === 0 && (
          <div className="h-[80vh] flex flex-col items-center gap-4">
            <img src="/empty.jpg" className="h-3/4" alt="EmptySign" />
            <p className="text-sm mt-1 font-semibold ">
              Add your favourite recipes Here
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onFavoriteToggle={handleFavoriteToggle}
              {...getRandomColor()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoritePage;
