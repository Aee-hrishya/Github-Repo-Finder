import { Container, Form, Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; //for authentication using firebase(refer the firebase docs for this)
import userContext from "../Context/UserContext";
import { Navigate } from "react-router-dom"; //used to redirect the users (this is newly introducd in react router dom v6)
import { toast } from "react-toastify";
import { useContext, useState } from "react";

const Signup = () => {

    const context = useContext(userContext);

    //Now we need states to manage the email and passwords but we can also do them using a single state as follows
    // const [credentials, setCredentials] = useState({
    //     email:"",
    //     password:""

    // })

    const [email, setEmail] = useState("");//state for handling the email
    const [password, setPassword] = useState("");//state for handling the password

    const handleSignup = () => {

        //Below we have the firebase way to handle the user authentication we can refer the firebase docs for this
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in. Once the user signs up he is then registered, we then set the user usign the setUser method provided by the context 
                console.log(userCredential);
                context.setUser({
                    email: userCredential.user.email,
                    uid: userCredential.user.uid
                })

            })
            .catch((error) => {
                console.log(error);
                toast(error.message, {
                    type: "error"
                })

            });
    }

    //Following function is specifically for handling the form submit 
    const handleFormSubmit = (e) => {

        e.preventDefault();
        handleSignup(); //We call the handlesignup method here
    }

    //This is to check if the user is already signed in or not, if not then we need to display certain things and if yes then some other things
    if (context.user?.uid) {
        return <Navigate to="/" /> //Redirecting the user to the home page 
    }
    return (
        <Container className='text-center'>
            <Row>
                <Col lg={6} className='offset-lg-3 mt-5'>
                    <Card>
                        <Form onSubmit={handleFormSubmit}>
                            <CardHeader className=''>SignUp here</CardHeader>
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
                                    Sign Up
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export default Signup;