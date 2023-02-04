import React from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router';
import { EditSuggestion } from '../../utils/interfaces';
import "./Suggestion.scss";
import { useAlert } from 'react-alert';
import { setSuggestionStatus } from '../../utils/api';

export interface Props {
    [key: string]: any
}

interface LoaderProps {
    incoming: null | EditSuggestion[],
    outgoing: null | EditSuggestion[],
}

const Suggestion = (props: Props) => {
    const {id} = useParams();
    const data = useLoaderData() as LoaderProps;
    const incoming = data.incoming && data.incoming.filter(x => x.id === id);
    const outgoing = data.outgoing && data.outgoing.filter(x => x.id === id);
    const suggestion = incoming?.length ? incoming[0] : outgoing![0];
    const type = incoming?.length ? "incoming" : "outgoing";
    const alert = useAlert();
    const navigate = useNavigate();

    const handleAction = (type: "approve" | "reject") => async () => {
        try {
            await setSuggestionStatus(type, suggestion.id);
            alert.success("Suggestion approved succesfully");
            navigate(`/question/${suggestion.question_id}`);
        }
        catch (e: any) {
            alert.error(e.message);
        }
    }

    return (
        <div className = "suggestion-page">
            <p className = "info"><b>Title:</b> {suggestion.title}</p>
            <p className = "info"><b>Status:</b> {suggestion.edit_status}</p>
            <div className = "content">
                <div className = "old">
                    <p>
                        <b>Old Content:</b> {suggestion.old_contents}
                    </p>
                </div>
                <div className = "new">
                    <p>
                        <b>New Content:</b> {suggestion.contents}
                    </p>
                </div>
            </div>
            {type === "incoming" && 
            <div className = "actions">
                <button className = "reject" onClick={handleAction("reject")}>Reject</button>
                <button className = "approve" onClick={handleAction("approve")}>Approve</button>
            </div>}
        </div>
    );
}

export default Suggestion;