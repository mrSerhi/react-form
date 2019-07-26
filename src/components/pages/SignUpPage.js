import React, { Component } from "react";
import uuid from "uuid";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .lowercase()
    .min(2, "Name should be longest than 3 characters")
    .max(20, "Name should be shorter than 20 characters")
    .required("Name field is required"),
  email: Yup.string()
    .email("Type a valid email address")
    .required("Email field is required")
});

class SignUpForm extends Component {
  state = { username: "", email: "" };

  handleSubmitForm = (values, actions) => {
    const { username, email } =
      JSON.parse(localStorage.getItem("userdata")) || {};

    if (username === values.username) {
      actions.setFieldError("username", "User is already exist!");
      return;
    }

    if (email === values.email) {
      actions.setFieldError("email", "Email is already exist!");
      return;
    }

    localStorage.setItem(
      "userdata",
      JSON.stringify({
        id: uuid(),
        username: values.username.toLowerCase(),
        email: values.email
      })
    );
    actions.resetForm(this.state);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ span: 6, offset: 3 }} className="mt-5">
            <Card>
              <Card.Body>
                <h3 className="display-4 text-center">Sign Up</h3>
                <Formik
                  initialValues={this.state}
                  validationSchema={signUpSchema}
                  onSubmit={this.handleSubmitForm}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group controlId="validationUserName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                          placeholder="Choose a username"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="validationUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          placeholder="Choose a email address"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button type="submit" variant="info">
                        Sign Up
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignUpForm;
