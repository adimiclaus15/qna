import React, { useContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router';
import { Question } from '../../utils/interfaces';
import { useAlert } from 'react-alert';
import { addQuestion, createSuggestion, editQuestion } from '../../utils/api';
import "./EditQuestion.scss";
import { AuthContext } from '../../context/AuthContext';

export interface Props {
    [key: string]: any
}

const EditQuestion = (props: Props) => {
    const question = useLoaderData() as Question;
    const [formData, setFormData] = useState({title: question.title, contents: question.contents});
    const {user} = useContext(AuthContext);
    const sudo = question.submitter_id === user?.id;

    const alert = useAlert();
    const navigate = useNavigate();

    const handleFormChange = (key: string) => (e: any) => {
        setFormData({...formData, [key]: e.target.value})
    }

    const handleSubmit = async (e: any) => { // redirect user to the question after posting it
        e.preventDefault();
        try{
            if (sudo) {
                await editQuestion(formData.title, formData.contents, question.id);
                navigate(`/question/${question.id}`);
                alert.success("Question Edited successfully");
            }
            else {
                await createSuggestion(formData.contents, question.id);
                navigate(`/profile/${user?.id}`);
                alert.success("Suggestion created successfully");
            }
        }
        catch(e : any) {
            alert.error(e.message);
        }
    }
    
    return (
        <div className = "edit-question">
            <h1>{sudo ? "Edit Question" : "Suggest Edit"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <p>Title:</p>
                    <input onChange={handleFormChange("title")} value = {formData.title} type="text" required disabled = {!sudo}/>
                </div>
                <div className="input-wrapper">
                    <p>Content:</p>
                    <textarea onChange={handleFormChange("contents")} value = {formData.contents} required/>
                </div>
                <input type = "submit" value = {sudo ? "Edit Question" : "Suggest Edit"}/>
            </form>
        </div>
    );
}

export default EditQuestion;