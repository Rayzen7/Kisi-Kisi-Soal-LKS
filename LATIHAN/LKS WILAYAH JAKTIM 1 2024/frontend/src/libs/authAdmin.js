import API from "./axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from 'js-cookie';

export default function AuthAdmin() {
    const navigate = useNavigate();
    const token = cookie.get('token');
    
    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await API.get(`/me?token=${token}`);
                const userRole = response.data.user[0].role_id;

                if (!token) {
                    navigate('/');
                }

                if (userRole != 1) {
                    navigate('/');
                }
            } catch (error) {
                if (error)  {
                    navigate('/');
                }
            } 
        }

        fetchUser();
    }, [navigate, token]);

    return;
}