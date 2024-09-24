import { useEffect } from "react";
import { useCurrentUser } from "../users/providers/UserProvider";
import axios from "axios";

export default function useAxios() {
    const { token } = useCurrentUser();

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        } else {
            delete axios.defaults.headers.common["x-auth-token"];
        }
    }, [token]);
}
