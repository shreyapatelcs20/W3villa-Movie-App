import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
 
  // State variables to hold email, password, error, and success messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the API
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      setSuccess("Successfully Login!");
      setError(''); 
      navigate('/Cards')

      // You can also handle the response here (e.g., save token, redirect, etc.)
      console.log(response.data); // For debugging

    } catch (error) {
      // Handle error in login process
      if (error.response && error.response.data) {
        setError(`Login failed: ${error.response.data.error}`);
      } else {
        setError("Login failed. Please try again.");
      }
      setSuccess(''); // Clear success message if there's an error
    }
  };

  return (
    <div className='login-container'>
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

        <div className='submit-button'>
        
          <Button type='submit'>Login</Button>
          
        </div>

        {/* Display error or success messages */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </Form>
    </div>
  );
}

export default Login;
