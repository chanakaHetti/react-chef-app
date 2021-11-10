import RecipeView from "../components/RecipeView";
import RecipeProvider from "./RecipeContext";

const Recipe: React.FC = () => {
  return (
    <RecipeProvider>
      <RecipeView />
    </RecipeProvider>
  );
}

export default Recipe;
