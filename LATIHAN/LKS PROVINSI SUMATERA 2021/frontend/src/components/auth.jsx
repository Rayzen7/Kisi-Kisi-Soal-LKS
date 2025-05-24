"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";

export default function Auth() {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useRouter();

    useEffect(() => {
        const fetchToken = async() => {
            try {
                const response = await axios.get('/api/cookies');
                const authToken = response.data.token;

                if (authToken) {
                    setToken(authToken);
                } else {
                    setToken(null);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchToken();
    }, []);

    useEffect(() => {
        const tokenNull = () => {
            try {
                if (!token && !loading) {
                    navigate.push('/');
                }

            } catch (error) {
                console.error(error);
            }
        }

        tokenNull();
    }, [token, loading]);

    return token;
}