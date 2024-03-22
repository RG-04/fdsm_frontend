import { useContext } from 'react';
import { ManagementAuthContext } from '../contexts/ManagementAuthContext';

export const useManagementAuthContext = () => {
    let managementAuthContext = useContext(ManagementAuthContext);

    if (!managementAuthContext) {
        throw new Error(
            'useManagementAuthContext must be used within a ManagemntAuthContextProvider'
        );
    }

    return managementAuthContext;
}