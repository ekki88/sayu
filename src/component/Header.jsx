import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Main from "./Main";
import loginIcon from "../img/icons/kakao_login.png";
import axios from "axios";
import {Route, Routes, useNavigate} from "react-router-dom";
import Bookmark from "./Bookmark";


const Header = (props) => {
    const {userInfo, bomi} = props;
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState('전시');
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${login_key}&redirect_uri=${redirect_url}&response_type=code`

    const handleClickKeyword = (keyword) =>{
        setKeyWord(keyword);
    }
    const handleClickBookmark = () =>{
        navigate('/bookmark')
    }
    const onClickLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }
    const handleClickLogout  = () =>{
        console.log('로그아웃')
    }
    console.log("user",userInfo)
    return (
        <S.container>
            <S.header>
                <S.menu>
                    <h1>SAYU</h1>
                    <button onClick={() => handleClickKeyword('전시')}>전시</button>
                    <button onClick={() => handleClickKeyword('뮤지컬')}>공연</button>
                    <button onClick={() => handleClickKeyword('축제')}>축제</button>
                    <button onClick={() => handleClickBookmark('축제')}>북마크</button>
                </S.menu>
                <p>{userInfo}</p>
                <img src={loginIcon} onClick={onClickLogin} alt="icon"/>
                {/*{userInfo ? <img src={loginIcon} onClick={onClickLogin} alt="icon"/> : <p>로그아웃</p>}*/}
            </S.header>
            <Main keyword={keyword}/>
            <Routes>
                <Route path="/OAuth" element={<Bookmark/>}/>
            </Routes>
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
    button{
        border: 0;
        background-color: transparent;
        font-weight: bold;
        font-size: 14px;
    }
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