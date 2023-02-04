import React, { useContext } from 'react'
import { useLoaderData, useParams } from 'react-router';
import "./Profile.scss";
import { AuthContext } from '../../context/AuthContext';
import Doge from "../../media/doge.jpg";
import BronzeMedal from "../../media/bronze-medal.png";
import SilverMedal from "../../media/silver-medal.png";
import GoldMedal from "../../media/gold-medal.png";
import { EditSuggestion, User } from '../../utils/interfaces';
import { getSuggestions } from '../../utils/api';
import { Link } from 'react-router-dom';

export interface Props {
    [key: string]: any
}

interface LoaderProps {
    incoming: null | EditSuggestion[],
    outgoing: null | EditSuggestion[],
}

const loader = async () => {
    return ({
        incoming: await getSuggestions("incoming"),
        outgoing: await getSuggestions("outgoing")
    })
}

const SuggestionCard = ({data, type}: {data: EditSuggestion, type: "incoming" | "outgoing"}) => {

    return (
        <div className = "suggestion-card">
            <p className = "title">
                <b>Title:</b> {data.title}
            </p>
            <p className = "status">
                <b>Status:</b> {data.edit_status}
            </p>
            <Link to = {`/suggestion/${data.id}`}>View Suggestion</Link>
        </div>

    )
}

const Profile = (props: Props) => {
    const {user} = useContext(AuthContext) as {user: User};
    const medal = user.rating <= 3 ? BronzeMedal: (user.rating <= 10 ? SilverMedal: GoldMedal);
    const data = useLoaderData() as LoaderProps;
    console.log(data);
    return (
        <div className = "profile-page">
            <div className = "user-data">
                <div className = "left">
                    <img className = "pfp" src = {Doge} />
                    <div className = "sep">
                        <p><b>Email:</b> {user?.email}</p>
                        <p><b>Rating:</b> {user?.rating}</p>
                    </div>
                </div>
                <img className = "medal" src = {medal}/>
            </div>
            <h1>Edit Suggestions</h1>
            <div className = "suggestions">
                <div className = "incoming">
                    <h2>Incoming:</h2>
                    {data.incoming && data.incoming.map(x => <SuggestionCard key = {x.id} data = {x} type = "incoming"/>)}
                </div>
                <div className = "outgoing">
                    <h2>Outgoing:</h2>
                    {data.outgoing && data.outgoing.map(x => <SuggestionCard key = {x.id} data = {x} type = "outgoing"/>)}
                </div>
            </div>
        </div>
    );
}
export {loader};

export default Profile;