import * as React from "react";
import { v4 as uuidv4 } from 'uuid';

import { RecipeData } from "../helpers/RecipeHelper";

export interface RecipeDataInterface {
  id: number;
  name: string;
  measurements: {
    ingredientsName: string;
    amount: string;
  }[];
  cookingMethods: string;
}

export interface RecipeContextInterface {
  recipe: RecipeDataInterface[];
  isModalOpen: boolean;
  setIsModalOpen: (modalOpen: boolean) => void;
  measurementsDefaultDataObject: {
    ingredientsName: string;
    measurements: string;
  },
  handleSearchByNameChange: (value: string) => void;
  handleSearchByIngredientChange: (value: string) => void;
  formSubmit: (value: any) => void;
};

type RecipeProps = {
  children: JSX.Element
};

export const RecipeContext = React.createContext<RecipeContextInterface>({
  recipe: RecipeData,
  isModalOpen: false,
  setIsModalOpen: (modalOpen: boolean) => {},
  measurementsDefaultDataObject: {
    ingredientsName: '',
    measurements: ''
  },
  handleSearchByNameChange: (value: string) => {},
  handleSearchByIngredientChange: (value: string) => {},
  formSubmit: (value: any) => {}
});

const RecipeProvider = (props: RecipeProps) => {
  const { children } = props;

  const measurementsDefaultDataObject = {
    ingredientsName: '',
    measurements: ''
  };

  const [recipe, setRecipe] = React.useState<RecipeDataInterface[]>([]);
  const [originaRecipe, setOriginalRecipe] = React.useState<RecipeDataInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    if (
      localStorage.getItem('recipeData') === null ||
      localStorage.getItem('recipeData') === undefined
    ) {
      localStorage.setItem('recipeData', JSON.stringify(recipe));
      setRecipe(recipe);
      setOriginalRecipe(recipe);
    } else {
      setRecipe(eval(localStorage.getItem('recipeData') || ''));
      setOriginalRecipe(eval(localStorage.getItem('recipeData') || ''));
    }
  }, []);

  const handleSearchByNameChange = (value: string) => {
    let filteredData = [];
    setRecipe([]);

    if (value === '') {
      filteredData = eval(localStorage.getItem('recipeData') || '');
      setRecipe(filteredData);
    } else {
      const searchString = value.toLowerCase();
      filteredData = [...originaRecipe].filter(data => data.name.toLowerCase().includes(searchString));
      setRecipe(filteredData);
    }

    setOriginalRecipe(eval(localStorage.getItem('recipeData') || ''));
  }

  const handleSearchByIngredientChange = (value: string) => {
    let filteredData = [];
    setRecipe([]);

    if (value === '') {
      filteredData = eval(localStorage.getItem('recipeData') || '');
      setRecipe(filteredData);
    } else {
      const searchString = value.toLowerCase();
      filteredData = [...originaRecipe].filter(data => data.measurements.some(mData => mData.ingredientsName.toLowerCase().includes(searchString)));
      setRecipe(filteredData);
    }

    setOriginalRecipe(eval(localStorage.getItem('recipeData') || ''));
  }

  const formSubmit = (values: any) => {
    const { name, measurements, cookingMethods } = values;

    const payload = {
      id: uuidv4(),
      name,
      measurements,
      cookingMethods
    }

    const allRecipeData =
      [
        ...eval(localStorage.getItem('recipeData') || ''),
        payload
      ];

    setRecipe(allRecipeData);
    setOriginalRecipe(allRecipeData);
    localStorage.setItem('recipeData', JSON.stringify(allRecipeData));
    setIsModalOpen(false);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipe: recipe,
        isModalOpen: isModalOpen,
        setIsModalOpen: setIsModalOpen,
        measurementsDefaultDataObject: measurementsDefaultDataObject,
        handleSearchByNameChange: handleSearchByNameChange,
        handleSearchByIngredientChange: handleSearchByIngredientChange,
        formSubmit: formSubmit
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
  
export default RecipeProvider;
