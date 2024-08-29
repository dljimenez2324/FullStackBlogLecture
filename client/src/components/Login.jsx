import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import { GetLoggedInUser, login } from "../Services/DataService";

const Login = ({onLogin, setUser }) => {

    // to use the navigate to force routing
    let navigate = useNavigate();

    // useStates
        const [Username, setUsername] = useState('');
        const [Password, setPassword] = useState('');


    // helper functions / methods
    // handle user
    const handleUser = (e) => {
        setUsername(e.target.value);
    }

    // method to handle the password
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    // method to handle the submit of the form
    const handleSubmit = async () => {
        let userData = {
            username: Username,
            password: Password,
            publisherName: Username
        }
        console.log(userData);

        // this is our handlelogin passed through from app.jsx
        onLogin(userData);
        let token = await login(userData);
        console.log(token.token, "This will show our token")
        if(token.token !=null)
        {
            localStorage.setItem("Token", token.token);
            localStorage.setItem("UserData", JSON.stringify(userData));
            GetLoggedInUser(Username);
            navigate('/Dashboard');
        }
        setUser(userData);
        return userData;
    }


  return (
    <>
        <Container>
            <Row>
                <Col className="form-container d-flex justify-content-center">
                    
                    <Form>
                        <p className="text-center">Login</p>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePassword} />
                        </Form.Group>
                        
                        <Button variant="outline-primary" onClick={handleSubmit}>
                            Login
                        </Button>
                        <p className="mt-3">Don't have an account?</p>
                        <Button variant="outline-primary" onClick={() => navigate('/CreateAccount')}>
                            Create Account
                        </Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Login