import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
    let authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }

    return authContext;
}