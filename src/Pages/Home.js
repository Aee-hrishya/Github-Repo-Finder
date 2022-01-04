import React, { useState, useContext } from "react";
import axios from "axios";

import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup
} from "reactstrap";

import UserCard from "../Components/UserCard";
import Repos from "../Components/Repos";
import { Navigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";


const Home = () => {

    const context = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [user, setUser] = useState('');
    
    //Method to fetch data from the API, we use try catch here to catch any error that we encounter as someone can not provide user so we have to take that into consideration
    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(`https://api.github.com/users/${query}`);
            setUser(data);
        }
        catch (error) {
            toast("User not found", {
                type: "error"
            });
        }

    }

    //This is a condition to check whether the user in signed in or not and if not then he/she is not granted access to the home page
    if(!context.user?.uid){
        return <Navigate to="/signin" />
    }
    return (
        <Container>
            <Row className=" mt-3">
                <Col md="5">
                    <InputGroup>
                        <Input
                            type="text"
                            value={query}
                            placeholder="Please provide the username"
                            onChange={e => setQuery(e.target.value)}
                        />
                        <div>
                            <Button color="primary" onClick={fetchDetails}>Fetch User</Button>
                        </div>
                    </InputGroup>
                    { user ? <UserCard user={user}/>: null} {/*Display the UserCard if user is present else display null */}
                </Col>
                <Col md="7">
                    {user ? <Repos repos_url={user.repos_url}/>:null} {/* To get the user repos */}
                </Col>
            </Row>
        </Container>
    );
}

export default Home;