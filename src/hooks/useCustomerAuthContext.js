import { useContext } from "react";
import { CustomerAuthContext } from "../contexts/CustomerAuthContext";

export const useCustomerAuthContext = () => {
    let customerAuthContext = useContext(CustomerAuthContext);

    if (!customerAuthContext) {
        throw new Error("useCustomerAuthContext must be used within a CustomerAuthContextProvider");
    }

    return customerAuthContext;
}