import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Header from "./Header";

const KakaoCallback = () => {
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem("token");

                if (!token) {
                    // 토큰이 없으면 새로 가져옴
                    token = await getToken();
                    localStorage.setItem("token", token);
                    console.log('token set::::', token);
                }

                // 토큰을 이용해 사용자 데이터를 가져옴
                const data = await getUserData(token);
                setUserInfo(data.properties);
                console.log('userInfo', data.properties);
                navigate("/main");
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
            }
        };

        fetchData();
    }, [navigate]);
    const bomi = "bomi";

    return (
        <div>
            <Header userInfo={userInfo} bomi={bomi}/>
        </div>
    );
};

export default KakaoCallback;
