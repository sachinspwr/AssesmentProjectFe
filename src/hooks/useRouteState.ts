import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useRouteState = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [state, setState] = useState<any>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setRouteState = (newState: any) => {
        setState(newState);
        navigate(location.pathname, { state: newState });
    };

    useEffect(() => {
        // Clear state on route change
        setState(null);
    }, [location]);

    return [state, setRouteState];
};
