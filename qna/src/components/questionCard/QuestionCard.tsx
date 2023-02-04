import React, { useContext, useEffect, useState } from 'react'
import { Question } from '../../utils/interfaces';
import "./QuestionCard.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { updownvote } from '../../utils/api';

export interface Props {
    data: Question,
    [key: string]: any
}

const QuestionCard = ({data}: Props) => {
    const [vote, setVote] = useState <undefined | "upvote" | "downvote"> (undefined);
    const [ratio, setRatio] = useState (0);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (data.upvoters) 
            data.upvoters.forEach(x => {
                if (x == user?.id) setVote("upvote");
            })
        if (data.downvoters)
            data.downvoters.forEach(x => {
                if (x == user?.id) setVote("downvote");
            })
        let p1 = data.upvoters ? data.upvoters.length: 0, p2 = data.downvoters ? data.downvoters.length: 0;

        setRatio(p1 - p2);
    }, [user])

    const handleVote = (type: "upvote" | "downvote") => () => {
        if (type === vote) return;
        setVote(type);
        updownvote(data.id, type);
        if (vote === undefined) {
            if (type === "upvote") setRatio(ratio + 1);
            else setRatio(ratio - 1);
        }
        else {
            if (type === "upvote") setRatio(ratio + 2);
            else setRatio(ratio - 2);
        }
    }


    return (
        <div className = "question-card">
            <Link to = {`/question/${data.id}`} className = "title">{data.title}</Link>
            <p className = "body">
                {data.contents}
            </p>
            <div className = "footer">
                <div className = "vote">
                    <div onClick={handleVote("upvote")}>
                        <i className={"fas fa-arrow-up upvote option" + ((vote === "upvote") ? " voted" : "")}></i>
                    </div>
                    <p className = "diff">{ratio}</p>
                    <div onClick={handleVote("downvote")}>
                        <i className={"fas fa-arrow-down downvote option" + ((vote === "downvote") ? " voted" : "")}></i>
                    </div>
                </div>
                <p className = "user">
                    {data.submitter_email}
                </p>
                {/* <Link to = {`/profile/${data.submitter_id}`}>
                    {data.submitter_email}
                </Link> */}
            </div>
        </div>
    );
}

export default QuestionCard;