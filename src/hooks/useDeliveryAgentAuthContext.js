import { useContext } from 'react';
import { DeliveryAgentAuthContext } from '../contexts/DeliveryAgentAuthContext';

export const useDeliveryAgentAuthContext = () => {
    let deliveryAgentAuthContext = useContext(DeliveryAgentAuthContext);

    if (!deliveryAgentAuthContext) {
        throw new Error(
            'useDeliveryAgentAuthContext must be used within a DeliveryAgentAuthContextProvider'
        );
    }

    return deliveryAgentAuthContext;
}