import React, {useEffect, useState, createContext} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

export const myContext = createContext('보미');
const KakaoCallback = () => {
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
    const admin_key= process.env.REACT_APP_ADMIN_KEY;
    const code = new URL (window.location.href).searchParams.get("code");

    const getToken = async () => {
        try {
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                {
                    grant_type: "authorization_code",
                    client_id: login_key,
                    redirect_uri: redirect_url,
                    code: code,
                },
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            );
            localStorage.setItem("token", res.data.access_token);
            return res.data.access_token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const getUserData = async (token) => {
        try {
            const user = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return user.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const kakaoLogout = async () => {
        let token = localStorage.getItem("token");
        try {
            const user = await axios.get(`https://kapi.kakao.com/v1/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return navigate('/main')
        } catch (error) {
            console.error(error);
            if (error.response.data.code === -401) {
                navigate('/main')
            }
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem("token");

                if (!token) {
                    // 토큰이 없으면 새로 가져옴
                    token = await getToken();
                    localStorage.setItem("token", token);
                }

                // 토큰을 이용해 사용자 데이터를 가져옴
                const data = await getUserData(token);
                setUserInfo(data.properties);
                navigate("/main");
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
            }
        };

        fetchData();
    }, [navigate]);


    return (
        <myContext.Provider value={userInfo}>
            <Header kakaoLogout={kakaoLogout}/>
        </myContext.Provider>
    );
};

export default KakaoCallback;

