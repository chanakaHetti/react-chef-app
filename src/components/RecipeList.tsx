import * as React from "react";
import { Card } from "react-bootstrap";

import { RecipeContext } from "../containers/RecipeContext";
import { AppHelper } from "../helpers/AppHelper";
import { RecipeData } from "../helpers/RecipeHelper";

const RecipeList: React.FC = () => {
  const { recipe } = React.useContext(RecipeContext);

  return (
    <>
      {recipe.map(data =>
        <Card key={data.id} className="mt-3 shadow">
          <Card.Body>
            <h2 className="mb-2">{data.name}</h2>
            <div className="recipe-under-line" />
            <h3 className="mt-5">{AppHelper.LABALES.INGREDIENTS}</h3>
            <ul>
              {data.measurements.map(ing => 
                <li>{ing.ingredientsName} - {ing.amount}</li>  
              )}
            </ul>
            <h3 className="mt-5">{AppHelper.LABALES.COOKING_METHOD}</h3>
            <p className="cook-method-text">
              {data.cookingMethods}
            </p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default RecipeList;
  