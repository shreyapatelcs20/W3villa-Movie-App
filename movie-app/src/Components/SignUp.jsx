import { useState } from 'react';
import Form from "react-bootstrap/Form";
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/users?page=2', {
        name,
        email,
        password,
      });

      setSuccess("Successfully signed up!");
      setError('');
     
      navigate('/login');

      // Optionally handle the response (e.g., save token, etc.)
      console.log(response.data);

    } catch (error) {
      // Handle error in sign-up process
      if (error.response && error.response.data) {
        setError(`Sign-up failed: ${error.response.data.error}`);
      } else {
        setError("Sign-up failed. Please try again.");
      }
      setSuccess(''); 
    }
  };

  return (
    <div className="signup-container">
      <Form className="signup-form" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
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
          <p>Passwords must be at least 8 characters.</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Re-enter Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>

        <div className="login-button">
        <button
            className="button-20"
            role="button"
            type='sumbit'
          >
            Sign Up
          </button>
          <Link to='/login' className="m-4">Already have an account</Link>
        </div>

       
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </Form>
    </div>
  );
}

export default SignUp;
