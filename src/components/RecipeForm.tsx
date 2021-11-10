import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Col } from 'react-bootstrap';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Field,
  FieldProps,
  Form as FormikForm,
  ErrorMessage,
  FieldArray,
  FormikErrors
} from 'formik';

import { AppHelper } from '../helpers/AppHelper';
import { RecipeContext } from '../containers/RecipeContext';

interface RecipeForm {
  name: string;
  measurements: {
    ingredientsName: string;
    amount: string;
  }[];
  cookingMethods: string;
}

const RecipeForm: React.FC<{}> = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    measurementsDefaultDataObject,
    formSubmit
  } = React.useContext(RecipeContext);

  const initialValues: RecipeForm = {
    name: '',
    measurements: [
      {
        ingredientsName: '',
        amount: ''
      }
    ],
    cookingMethods: ''
  };

  const formCustomValidate = (values: RecipeForm) => {
    const errors: FormikErrors<RecipeForm> = { };
    if (!values.name) {
      errors.name = 'Recipe name is required';
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={values => formCustomValidate(values)}
      onSubmit={values => formSubmit(values)}
      render={({ values, errors }) => (
        <FormikForm>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>{AppHelper.LABALES.RECIPE_NAME}</Form.Label>
            <Field
              type="text"
              name="name"
              placeholder={AppHelper.LABALES.RECIPE_NAME}
              className="form-control"
            />
            <div className="error-message">
              <ErrorMessage name="name" />
            </div>
          </Form.Group>

          <FieldArray
            name="measurements"
            render={arrayHelpers => (
              <Form.Group className="mb-3 row" controlId="">
                <Form.Label>{AppHelper.LABALES.INGREDIENTS}</Form.Label>
                {values.measurements.map((ingredient, index) => (
                  <Col md="11" className="row mb-2" key={index}>
                    <Col md="6">
                    <Field
                      type="text"
                      name={`measurements[${index}].ingredientsName`}
                      placeholder={AppHelper.LABALES.INGREDIENTS}
                      className="form-control"  
                    />
                    <div className="error-message">
                      <ErrorMessage name={`measurements[${index}].ingredientsName`} />
                    </div>
                    </Col>
                    
                    <Col md="5">
                    <Field
                      type="text"
                      name={`measurements.${index}.amount`}
                      placeholder={AppHelper.LABALES.AMOUNT}
                      className="form-control"   
                    />
                    <div className="error-message">
                      <ErrorMessage name={`measurements.${index}.amount`} />
                    </div>
                    </Col>
        
                    <Col md="1" className="mt-1">
                      {index > 0 && (
                        <Button
                          variant="outline-danger"
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </Button>
                      )}
                    </Col>
                  </Col>
                ))}
                <Col md="1" className="mt-1">
                  <Button
                    type="button"
                    variant="outline-primary"
                    onClick={() => arrayHelpers.push(measurementsDefaultDataObject)}
                  >
                    +
                  </Button>
                </Col>
              </Form.Group>
            )}
          />

          <Form.Group className="mb-3" controlId="">
            <Form.Label>{AppHelper.LABALES.COOKING_METHOD}</Form.Label>
            <Field type="textarea" name="cookingMethods" className="form-control" as="textarea" rows={3} />
          </Form.Group>
          
          <div className="flex form-button">
            <Button variant="outline-danger" onClick={() => setIsModalOpen(false)}>
              {AppHelper.LABALES.CANCEL}
            </Button>

            <Button variant="outline-primary" type="submit">
              {AppHelper.LABALES.CREATE_NEW_RECIPE}
            </Button>
          </div>
        </FormikForm>
      )}
    />
  );
};
  
export default RecipeForm;
