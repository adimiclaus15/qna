import React, { useContext } from 'react'
import './Home.scss';
import { useLoaderData } from 'react-router';
import QuestionCard from '../questionCard/QuestionCard';
import { Question } from '../../utils/interfaces';
import { AuthContext } from '../../context/AuthContext';

export interface Props {
    [key: string]: any
}

const UserQuestions = (props: Props) => {
    const data = useLoaderData() as Question[];
    console.log(data);

    return (
        <div className = "home-page">
            <p className = "title">My Questions</p>
            {data && data.map((x:Question) => <QuestionCard key = {x.id} data = {x}/>)}
        </div>
    );
}

export default UserQuestions;