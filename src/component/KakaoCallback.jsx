// 카카오 로그인 로직
import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";


import {useRecoilState, useSetRecoilState} from 'recoil';
import {FavoriteList, LoginState, UserIdState} from '../recoil/atom';


const KakaoCallback = () => {
    const navigate = useNavigate();
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
    const code = new URL(window.location.href).searchParams.get("code");
    const [loginState, setLoginState] = useRecoilState(LoginState);
    const [userId, setUserId] = useRecoilState(UserIdState);

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
        } catch (err) {
            console.error(err);
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
        } catch (err) {
            console.error(err);
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
                const data = await getUserData(token);
                const user = {id: data.id}
                if (user) {
                    setUserId(user.id);
                    setLoginState(true);
                }
                navigate("/home");
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

