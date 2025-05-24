import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie';

export default function Auth ({ children }) {
    const navigate = useNavigate();
    const token = cookie.get('token');

    useEffect(() => {
        const fetchAuth = async() => {
            try {
                if (!token) {
                    navigate('/');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchAuth();
    }, [token, navigate]);

    return (
        <div>
            {children}
        </div>
    )
}