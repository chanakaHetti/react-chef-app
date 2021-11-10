import * as React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { AppHelper } from "../helpers/AppHelper";
import RecipeList from "./RecipeList";
import { CommonModal } from './common/Modal';
import { RecipeContext } from "../containers/RecipeContext";
import RecipeForm from "./RecipeForm";

const RecipeView: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    handleSearchByNameChange,
    handleSearchByIngredientChange,
  } = React.useContext(RecipeContext);

  return (
    <>
      <Row>
        <Col md="5" sm="12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder={AppHelper.PLACE_HOLDER.SEARCH_RECIPES_BY_NAME}
              onChange={(e) => handleSearchByNameChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md="5" sm="12">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder={AppHelper.PLACE_HOLDER.SEARCH_RECIPES_BY_INGREDIENT}
              onChange={(e) => handleSearchByIngredientChange(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md="2" sm="12">
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}  
          >
            {AppHelper.LABALES.CREATE_NEW_RECIPE}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <RecipeList />
        </Col>
      </Row>

      {isModalOpen && (
        <CommonModal
          size="lg"
          title={AppHelper.ADD_MODAL_HEADER}
          closeModal={() => setIsModalOpen(false)}
          className=""
        >
          <div>
            <RecipeForm />
          </div>
        </CommonModal>
      )}
    </>
  );
}

export default RecipeView;
