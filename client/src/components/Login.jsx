import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {

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
    const handleSubmit = () => {
        let userData = {
            username: Username,
            password: Password
        }
        console.log(userData);
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
                        <Button variant="outline-primary" onClick={handleSubmit}>
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