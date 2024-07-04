import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


import {useRecoilState} from 'recoil';
import {LoginState} from '../recoil/atom';


const KakaoCallback = () => {
    const navigate = useNavigate();
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = String(process.env.REACT_APP_REDIRECT_URI);
    const code = new URL (window.location.href).searchParams.get("code");
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);


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
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = localStorage.getItem("token");
                if (!token) {
                    token = await getToken();
                    localStorage.setItem("token", token);
                }

                // 토큰을 이용해 사용자 데이터를 가져옴
                const data = await getUserData(token);
                setIsLoggedIn(true)
                navigate("/home",
                    {state: {user:`${data}`}});
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token");
            }
        };
        fetchData();
    }, [navigate]);


    return (
    <></>
    );
};

export default KakaoCallback;

