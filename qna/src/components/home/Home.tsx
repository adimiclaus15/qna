import React, { useContext } from 'react'
import './Home.scss';
import { useLoaderData } from 'react-router';
import QuestionCard from '../questionCard/QuestionCard';
import { Question } from '../../utils/interfaces';
import { AuthContext } from '../../context/AuthContext';

export interface Props {
    [key: string]: any
}

const Home = (props: Props) => {
    const {user} = useContext(AuthContext);
    const data = (useLoaderData() as Question[]).filter(x => x.submitter_id !== user?.id);
    console.log(data);

    return (
        <div className = "home-page">
            <p className = "title">Home Page</p>
            {data && data.map((x:Question) => <QuestionCard key = {x.id} data = {x}/>)}
        </div>
    );
}

export default Home;