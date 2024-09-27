import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./style.css";
import { Link } from 'react-router-dom';


function SignUp() {

  return (
    <div className="signup-container">
      <Form className="signup-form">
        <h3>Sign Up</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Name" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <p>Passwords must be at least 8 characters.</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control type="password" placeholder="Re-enter Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <div className="login-button">
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <Link to='login' className="m-4">Already have an account</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
