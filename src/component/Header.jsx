import React, {useEffect, useState, useContext, createContext} from 'react';
import styled from "styled-components";
import Main from "./Main";
import loginIcon from "../img/icons/kakao_login.png";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Bookmark from "./Bookmark";
import {myContext} from "./KakaoCallback";

const Header = (kakaoLogout) => {
    const userInfo = useContext(myContext);
    const [open , setOpen] = useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState('전시');
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${login_key}&redirect_uri=${redirect_url}&response_type=code`

    const handleClickKeyword = (keyword) =>{
        setKeyWord(keyword);
    }
    const handleClickBookmark = () =>{
        if(userInfo) {
            setOpen(true);
        } else {
            window.location.href = KAKAO_AUTH_URL;
        }
    }
    const onClickLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    const handleClickLogout  = () =>{
        const kakaoLogout = async () => {
            let token = localStorage.getItem("token");
            try {
                const user = await axios.get(`https://kapi.kakao.com/v1/user/logout`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                localStorage.removeItem('TOKEN');
                return navigate('/main')
            } catch (error) {
                console.error(error);
                if (error.response.data.code === 401) {
                    navigate('/main')
                }
                throw error;
            }
        };
        kakaoLogout()
        console.log('로그아웃')
    }

    console.log("userName",userInfo)
    return (
        <S.container>
            <S.header>
                <S.menu>
                    <h1>SAYU</h1>
                    <button onClick={() => handleClickKeyword('전시')}>전시</button>
                    <button onClick={() => handleClickKeyword('뮤지컬')}>공연</button>
                    <button onClick={() => handleClickKeyword('축제')}>축제</button>
                    <button onClick={handleClickBookmark}>북마크</button>
                    {open === true ? <Bookmark setOpen={setOpen}/>:null}
                </S.menu>
            {userInfo ?
                <S.user><p>{userInfo}님 </p> <button onClick={handleClickLogout}>로그아웃</button></S.user> :
                <S.user><img src={loginIcon} onClick={onClickLogin} alt="icon"/></S.user>}
            </S.header>
            <Main keyword={keyword}/>
        </S.container>
    );
};

export default Header;
const S = {};

S.container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    place-items: center;
`

S.header = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
S.menu = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1{
        margin-right: 30px;
    }
    button{
        margin: 20px;
        border: 0;
        background-color: transparent;
        font-size: 14px;
        font-weight: bold;
    }
`

S.user = styled.div`
    display: flex;
    align-items: center;
    p{
        margin-right: 5px;
        font-weight: bold;
    }
    button{
        border: 0;
        background-color: transparent;
    }
    img{
        margin-left: 20px;
        width: 50px;
        height: 30px;
    }
`