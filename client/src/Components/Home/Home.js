import "./Home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeByNameQuery, getDiets } from "../../Redux/Actions";
import Recipes from "../Recipes/Recipes.js";
import SelectDiets from "../SelectDiets/SelectDiets";
import SelectOrder from "../SelectOrder/SelectOrder";
import SearchRecipe from "../SearchRecipe/SearchRecipe";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipeByNameQuery());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  const recipesSearch = useSelector((state) => state.orderedRecipes);
  const recipes = useSelector((state) => state.recipes);

  //PAGINACION PARA TODAS LAS RECETAS
  const indexOfLastPostAll = currentPageAll * postsPerPage;
  const indexOfFirstPostAll = indexOfLastPostAll - postsPerPage;
  const currentPostsAll = recipes.slice(
    indexOfFirstPostAll,
    indexOfLastPostAll
  );
  const paginate = (pageNumber) => setCurrentPageAll(pageNumber);

  //PAGINACION PARA LAS RECETAS BUSCADAS
  const indexOfLastPostFilter = currentPageAll * postsPerPage;
  const indexOfFirstPostFilter = indexOfLastPostFilter - postsPerPage;
  const currentPostsFilter = recipesSearch.slice(
    indexOfFirstPostFilter,
    indexOfLastPostFilter
  );
  const paginates = (pageNumber) => setCurrentPageAll(pageNumber);

  return (
    <div className="solofoto">
      <div className="divHome">
        <nav className="navdeHome">
          <SelectDiets />
          <div>
            <SelectOrder />
          </div>
          <div>
            <SearchRecipe />
          </div>
          <div>
            <Link to="/createrecipe" className="linkcreaterecipe">
              Create Recipe
            </Link>
          </div>
        </nav>
        <h1 className="titulohome">Cheff Master</h1>
      </div>
      <div>
        {recipesSearch.length ? (
          <div className="recipeContainer">
            <div className="homepagination">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={recipesSearch.length}
                paginate={paginates}
              />
            </div>
            <div className="homerecipes">
              <Recipes recipes={currentPostsFilter} loading={loading} />
            </div>
          </div>
        ) : (
          <div className="recipecontainer">
            <div className="homepagination">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={recipes.length}
                paginate={paginate}
              />
            </div>
            <div className="homerecipes">
              <Recipes recipes={currentPostsAll} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
