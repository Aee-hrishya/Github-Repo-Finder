import React, { useState, useContext } from 'react';
import { Collapse, NavLink, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavbarText } from "reactstrap";
import { Link } from "react-router-dom";
import userContext from '../Context/UserContext';

const NavBar = () => {

    const context = useContext(userContext);

    const [isOpen, setIsOpen] = useState(false); // We need this state because we are creating the onClick method for the toggler which activates when value of isOpen is true

    //method to handle the toggle when it is clicked
    const toggle = () => {
        setIsOpen(!isOpen);
    }


    return (
        <Navbar color="secondary" light expand="md">
            <NavbarBrand><Link to="/" className='text-white'>Github Finder</Link></NavbarBrand>
            <NavbarText className='text-white'>
                {context.user?.email ? context.user.email : ""} {/*Here we use the optional chaining in es6 to check where the user is present and only then the email is checked and if yes then we proceed */}
            </NavbarText>
            <NavbarToggler onClick={toggle} /> {/*Here we have the onClick event handler */}
            <Collapse isOpen={isOpen} navbar> {/*We passed the isOpen state here as we want to show the contents of the navbar only if the value of isOpen is true */}
                <Nav className='ms-auto' navbar>
                    {
                        /*We are doing conditional rendering below as we want to display certain things when the user is logged in and others when the user is logged out*/
                        context.user ? (
                            <NavItem>
                                <NavLink tag={Link} to='/' className='text-white'>Logout</NavLink>
                            </NavItem>) : (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to='/' className='text-white'>Sign-up</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to='/' className='text-white'>Sign-in</NavLink>
                                </NavItem>
                            </>
                        )
                    }

                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default NavBar;