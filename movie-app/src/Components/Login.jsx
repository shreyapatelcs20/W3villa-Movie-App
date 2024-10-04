import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://reqres.in/api/login", {
        email,
        password,
      });

      setSuccess("Successfully Login!");
      setError("");
      navigate("/Cards");

      console.log(response.data); 
    } catch (error) {
      if (error.response && error.response.data) {
        setError(`Login failed: ${error.response.data.error}`);
      } else {
        setError("Login failed. Please try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Forgot Password" />
        </Form.Group>

        <div className="submit-button g-4" style={{display:"flex", gap:"0.5rem"}}>
          <button
            className="button-20"
            role="button"
          >
            Login
          </button>
          <button
            className="button-20"
            role="button"
          >
            Sign Up
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </Form>
    </div>
  );
}

export default Login;
