import { useContext } from 'react';
import { RestaurantAuthContext } from '../contexts/RestaurantAuthContext';

export const useRestaurantAuthContext = () => {
    let restaurantAuthContext = useContext(RestaurantAuthContext);

    if (!restaurantAuthContext) {
        throw new Error("useRestaurantAuthContext must be used within a RestaurantAuthContextProvider");
    }

    return restaurantAuthContext;
}