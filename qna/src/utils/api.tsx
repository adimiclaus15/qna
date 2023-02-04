import { EditSuggestion, Question, User } from "./interfaces";
const url = "http://localhost:8080/api";

const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const getAuthToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) return null;
    return JSON.parse(token);
}

const setAuthToken = (token: string) => {
    localStorage.setItem("jwt", JSON.stringify(token))
}

const initUser = async () => {
    const token = getAuthToken();
    if (token) {
        const res = await fetch(`${url}/user`, {
            method: "GET",
            headers: {
                'auth-token': token
            },
        });
        // console.log(res.status);
        if (res.status !== 200) {
            return null;
        }
        else {
            return (await res.json()).result;
        }
    }
    return null;
}

const logout = async () => {
    localStorage.removeItem("jwt");
}

const login = async (email: string, password: string) => {
    const res = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    console.log(data);
    if (res.status !== 200) {
        throw data;
    }
    setAuthToken(data.result.token);
    return data;
}

const signup = async (email: string, password: string) => {
    const res = await fetch(`${url}/register`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    await login(email, password);
    return data;
}

const getQuestions = async () => {
    console.log("called");
    const token = getAuthToken();
    try {
        const res = await fetch(`${url}/questions`, {
            method: "GET",
            headers: {
                'auth-token': token
            },
        });
        const data = (await res.json()).result;
        return data;
    }
    catch (e: any) {
        console.log(e.message);
        return e.message;
    }
}

const updownvote = async (question_id: string, type: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/votes`, {
        method: "PUT",
        headers: {
            'auth-token': token
        },
        body: JSON.stringify({
            question_id,
            type
        }),
    });
    return 
}

const addQuestion = async (title: string, contents: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({title, contents})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const addAnswer = async (question_id: string, contents: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/addAnswer`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({question_id, contents})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const addReply = async (question_id: string, answer_id: string, contents: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/addReply`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({question_id, answer_id, contents})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const getQuestionById = async ({params: {id}}: {params: any}) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data.result;
}

const setFavoriteAnswer = async (question_id: string, answer_id: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/favoriteAnswer`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({question_id, answer_id})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const editQuestion = async (title: string, contents: string, question_id: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/questions/editContent`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({question_id, title, contents})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const createSuggestion = async (contents: string, question_id: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/suggestions`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
        body: JSON.stringify({question_id, contents})
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

const getUserQuestions = async () => {
    const token = getAuthToken();
    const res = await fetch(`${url}/user/questions`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data.result;
}

const getSuggestions = async (type: "incoming" | "outgoing") => {
    const token = getAuthToken();
    const res = await fetch(`${url}/suggestions/${type}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    if (data.result) {
        return await Promise.all(data.result.map(async (x: EditSuggestion) => {
            const qs = await getQuestionById({params: {id: x.question_id}}) as Question;
            return ({
                ...x,
                title: qs.title,
                old_contents: qs.contents
            });
        }));
    }
    return data.result;
}

const setSuggestionStatus = async (type: "approve" | "reject", id: string) => {
    const token = getAuthToken();
    const res = await fetch(`${url}/suggestions/${type}/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'auth-token': token,
        },
    });
    const data = await res.json();
    if (res.status !== 200) {
        throw data;
    }
    return data;
}

export {createSuggestion, setSuggestionStatus, getSuggestions, getUserQuestions, logout, login, signup, initUser, getQuestions, updownvote, addQuestion, addAnswer, addReply, setFavoriteAnswer, getQuestionById, editQuestion};
