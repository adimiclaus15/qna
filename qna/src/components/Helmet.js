import React from 'react'
import {Helmet} from "react-helmet";

const Background = ({type}) => {
    return (
        <Helmet>
            <html className = {type}/>
        </Helmet>
    );
}

 export default Background;