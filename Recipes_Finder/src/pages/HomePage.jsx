import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRandomColor } from "../lib/utils";

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRecipes = async (searchQuery) => {
    setLoading(true);
    setRecipes([]);
    try {
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`
      );
      const data = await res.json();
      console.log(data);
      setRecipes(data.hits || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes("paneer");
  }, []);
  const handleSearchRecipe = (e) => {
    e.preventDefault();
    fetchRecipes(e.target[0].value);
  };

  return (
    <div className="bg-[#c5e2ea] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearchRecipe}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={24} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>
        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          recipes.map(({ recipe }, index) => (
            <RecipeCard key={index} recipe={recipe} {...getRandomColor()} />
          ))}

        {loading &&
          [...Array(9)].map((_, index) => (
            <div key={index} className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="flex justify-between"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HomePage;
