import React, {useContext, useState} from 'react'
import { Modal } from 'react-responsive-modal';
import "./Navbar.scss";
import { AuthContext } from '../../context/AuthContext';
import { Link, useHref } from 'react-router-dom';

export interface Props {
    [key: string]: any
}

const Navbar = (props: Props) => {
    const [modal, setModal] = useState <"login" | "signup" | false> ("login");
    const {user, login, signup} = useContext(AuthContext);

    return (
        <>
            <div className = "navbar">
                <div className = "content">
                    <div className = "left">
                        <Link to = "/" className = "logo">HOME</Link>
                        <Link to = "/my-questions" className = "logo">MY QUESTIONS</Link>
                    </div>
                    {/* <div>
                        <input type = "text" className = "search default"/>
                    </div> */}
                    <div className = "logged">
                        <Link to = {`/add-question`}>
                            ADD QUESTION
                        </Link>
                        <Link to = {`/profile`}>
                            PROFILE
                        </Link>
                        <Link to = {`/logout`}>
                            LOGOUT
                        </Link>
                    </div> 
                    
                </div>
            </div>
        </>
    );
}

export default Navbar;