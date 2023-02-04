import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import * as api from "../utils/api";
import { User } from "../utils/interfaces";

interface Data  {
    user: User | null | undefined,
    login: (username: string, password: string) => Promise<void>,
    signup: (username: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
}

export const AuthContext = React.createContext <Data> ({
    user: null,
    login: () => new Promise (() => {}),
    signup: () => new Promise (() => {}),
    logout: () => new Promise (() => {}),
});

export const AuthProvider = ({ children, ...props }: {children: any}) => {
    const [user, setUser] = useState <User | null | undefined> (undefined);
    const alert = useAlert();
    console.log(user);

    const init = async () => {
        try {   
            let data = await api.initUser();
            setUser(data);
        }
        catch(e) {
            setUser(null);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const login =  async (username: string, password: string) => {
        try {
            await api.login(username, password);
            await init();
            alert.success("You logged in successfully");
        }
        catch (e: any) {
            if (typeof e.errorMessage !== "string") {
                alert.error("Error!");
            }
            else alert.error(e.errorMessage);
        }
    }

    const signup = async (username: string, password: string) => {
        try {
            await api.signup(username, password);
            alert.success("Your account was created successfully");
            init();
        }
        catch(e: any) {
            if (typeof e.errorMessage !== "string") {
                alert.error("Error!");
            }
            else alert.error(e.errorMessage);
        }
    }

    const logout = async () => {
        try {
            await api.logout();
            alert.success("Logged out succesfully");
            setUser(null);
        }
        catch(e:any) {
            if (typeof e.message !== "string") {
                alert.error("Error!");
            }
            else alert.error(e.message);
        }
    }

    return (
        <AuthContext.Provider
            value={{ 
                user,
                login,
                signup,
                logout
            }}
        >
            {user === undefined ? <p>{}</p> : children}
            {/* {children} */}
        </AuthContext.Provider>
    );
};