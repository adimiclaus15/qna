import React, { useContext, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { Answer, Question, Reply } from '../../utils/interfaces';
import QuestionCard from '../questionCard/QuestionCard';
import "./QuestionPage.scss";
import { Link } from 'react-router-dom';
import { addAnswer, addReply, setFavoriteAnswer } from '../../utils/api';
import { useAlert } from 'react-alert';
import { AuthContext } from '../../context/AuthContext';

export interface Props {
    [key: string]: any
}

const ReplyCard = (props: Reply) => {
    return (
        <div className = "reply-card">
            <p className = "user">
                Author: {props.submitter_email}
            </p>
            <p className = "content">{props.contents}</p>
        </div>
    )
}

const AnswerCard = (props: Answer | any) => { // idiotic work-around
    const {id} = useParams();
    const [reply, setReply] = useState <string | undefined> (undefined);
    const alert = useAlert();
    const navigate = useNavigate();
    const handleReply = async (e: any) => {
        e.preventDefault();
        try {
            await addReply(id!, props.id, reply!);
            alert.success("Reply added successfully");
            navigate(`/question/${id}`)
            setReply(undefined);
        }
        catch (e: any) {
            alert.error(e.message);
        }
    }

    const handleFavoriteAnswer = async () => {
        try {
            await setFavoriteAnswer(id!, props.id);
            alert.success("Favorite Answer set successfully");
            navigate(`/question/${id}`)
        }
        catch (e: any) {
            alert.error(e.message);
        }
    }

    return (
        <div className = "answer-card">
            <p className = "user">
                Author: {props.submitter_email}
                {/* <Link to = {`/profile/${props.submitter_id}`}>{props.submitter_email}</Link> */}
            </p>
            <p className = "content">{props.contents}</p>
            <div className = "reply-section">
                {(reply !== undefined) ? 
                    <form className= "add-reply" onSubmit={handleReply}>
                        <div className="input-wrapper">
                            <p>Your Reply:</p>
                            <textarea onChange={(e: any) => setReply(e.target.value)} value = {reply} required/>
                        </div>
                        <input type = "submit" value = "Post Reply"/>
                    </form>
                : <div className = "actions">
                    {!props.isFavorite && <p className = "reply-action" onClick={() => setReply("")}>Reply</p>}
                    {props.sudo && <p className = "best-answer" onClick = {handleFavoriteAnswer}>Mark Favorite Answer</p>}

                </div>}

            </div>
            <div className = "replies">
                {!props.isFavorite && props.replies.map((x: Answer) => <ReplyCard key = {x.id} {...x}/>)}
            </div>
        </div>
    )
}

const AddAnswerCard = (props: any) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const alert = useAlert();

    const handleFormChange = (e: any) => {
        setAnswer(e.target.value);
    }

    const handleAnswer = async (e: any) => {
        e.preventDefault();
        try {
            await addAnswer(id!, answer);
            alert.success("Answer added succesfully");
            navigate(`/question/${id}`);
            setAnswer("");
        }
        catch (e: any) {
            alert.error(e.message);
        }
    }

    return (
        <form className = "add-answer" onSubmit={handleAnswer}>
            <div className="input-wrapper">
                <p>Your Answer:</p>
                <textarea onChange={handleFormChange} value = {answer} required/>
            </div>
            <input type = "submit" value = "Post Answer"/>
        </form>
    )
}

const QuestionPage = (props: Props) => {
    const {id} = useParams();
    const data = useLoaderData() as Question;
    const favoriteAnswerArray = data.answers.filter(x => x.id === data.best_answer_id)
    const favoriteAnswer = favoriteAnswerArray.length ? favoriteAnswerArray[0] : undefined;
    const {user} = useContext(AuthContext);
    const sudo = data.submitter_id === user?.id;

    return (
        <div className = "question-page">
            <QuestionCard data = {data}/>
            {sudo ? 
                <Link className = "edit-action" to = {`/edit-question/${id}`}>Edit question</Link> :
                <Link className = "edit-action" to = {`/edit-question/${id}`}>Suggest edit</Link>
            }
            <AddAnswerCard/>
            {favoriteAnswer && 
            <div className = "favorite">
                <h1>Favorite Answer:</h1>
                <AnswerCard isFavorite = {true} {...favoriteAnswer}/>
            </div>}
            <h1>All Answers:</h1>
            <div className = "answers">
                {data.answers.map(x => <AnswerCard key = {x.id} {...x} sudo = {sudo}/>)}
            </div>
        </div>
    );
}

export default QuestionPage;