import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Repos = ({repos_url}) => {

    const [repos, setRepos] = useState([]); //State of this component

    //method to fetch data from the url
    const fetchRepos = async() => {
        const {data} = await axios.get(repos_url);
        setRepos(data);
    }

    //using the usEffect hook to run the method as soona as we get the repos_url
    useEffect(()=>{
        fetchRepos();
    },[repos_url]);

    return(
        <ListGroup>
            {
                repos.map(repo => (
                    <ListGroupItem key={repo.id}>
                        <div className='text-primary'>{repo.name}</div>
                        <div className='text-secondary'>{repo.language}</div>
                        <div className='text-info'>{repo.description}</div>
                    </ListGroupItem>
                ))
            }
        </ListGroup>
    );
}

export default Repos;