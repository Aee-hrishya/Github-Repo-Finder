import { Container, Form, Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; //for authentication using firebase(refer the firebase docs for this)
import userContext from "../Context/UserContext";
import { Navigate } from "react-router-dom"; //used to redirect the users (this is newly introducd in react router dom v6)
import { toast } from "react-toastify";
import { useContext, useState } from "react";

const Signin = () => {

    const context = useContext(userContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                context.setUser({
                    email: userCredential.user.email,
                    uid: userCredential.user.uid
                })
                // ...
            })
            .catch((error) => {
                toast(error.message, {
                    type: "error"
                })
            });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSignin();
    }


    if (context.user?.uid) {
        return <Navigate to="/" /> //Redirecting the user to the home page 
    }
    return (
        <Container className='text-center'>
            <Row>
                <Col lg={6} className='offset-lg-3 mt-5'>
                    <Card>
                        <Form onSubmit={handleFormSubmit}>
                            <CardHeader className=''>SignIn here</CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Label for='email' sm={3}>
                                        Email
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type='email'
                                            name='email'
                                            id='email'
                                            placeholder='Provide your email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='password' sm={3}>
                                        Password
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type='password'
                                            name='password'
                                            id='password'
                                            placeholder='Your password here'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type='submit' block color='success'>
                                    Sign In
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );


};

export default Signin;