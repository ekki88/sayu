import React, {useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";
import loginIcon from "../img/icons/kakao_login.png";
import axios from "axios";
import Bookmark from "./Bookmark";
import {useRecoilState, useResetRecoilState, useSetRecoilState} from 'recoil';
import {FavoriteList, LoginState} from '../recoil/atom';
import {media} from "../styles/media";

const Header = () => {
    const [open , setOpen] = useState(false);
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState('전시');
    const login_key = process.env.REACT_APP_KAKAOREST_API_KEY;
    const redirect_url = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${login_key}&redirect_uri=${redirect_url}&response_type=code`
    const token = localStorage.getItem("token");
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const resetFavoriteList = useResetRecoilState(FavoriteList);

    const handleClickKeyword = (keyword) =>{
        setKeyWord(keyword);
    }
    const handleClickBookmark = () =>{
        if(token) {
            navigate('bookmark')
        } else {
            alert('로그인 후 사용 가능합니다.')
        }
    }
    const onClickLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    const handleClickLogout = async () => {
        try {
            const user = await axios.get(`https://kapi.kakao.com/v1/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem("token");
            const userId = localStorage.getItem("user");

            const userFavoriteList = JSON.parse(localStorage.getItem(`${userId}-favoriteList`)) || [];
            resetFavoriteList();
            setIsLoggedIn(false);
            return window.location.reload('/home');
        } catch (error) {
            console.error(error);
            if (error.response.data.code === -401) {
                navigate('/home')
            }
        }
    };

    return (
        <>
            <S.container>
                <S.header>
                    <S.menu>
                        <h1 onClick={() => handleClickKeyword('전시')}>SAYU</h1>
                        <button onClick={() => handleClickKeyword('전시')}>전시</button>
                        <button onClick={() => handleClickKeyword('오페라')}>공연</button>
                        <button onClick={() => handleClickKeyword('축제')}>축제</button>
                        <button onClick={handleClickBookmark}>북마크</button>
                        {open === true ? <Bookmark setOpen={setOpen}/>:null}
                    </S.menu>
                    {token ?
                        <S.user><button onClick={handleClickLogout}>로그아웃</button></S.user> :
                        <S.user><img src={loginIcon} onClick={onClickLogin} alt="icon"/></S.user>}
                </S.header>
                <Main keyword={keyword}/>
            </S.container>
            <Routes>
                <Route path="bookmark" element={<Bookmark/>}/>
            </Routes>
        </>
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
    font-size:14px;
    place-items: center;
    ${media.phone`
    max-width: 100%;
  `}
`

S.header = styled.div`
    width: 80%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    
    ${media.phone`
        width:90%;
        height: 70px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
  `}
`
S.menu = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1{
        margin-right: 15px;
    }
    button{
        margin: 20px;
        border: 0;
        background-color: transparent;
        font-size: 0.9em;
        font-weight: bold;
    }
    ${media.phone`
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        h1{
            font-size:1.2em;
        }
        button{
            margin: 0.4em;
        }
  `}
`

S.user = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    button{
        border: 0;
        font-size: 0.9em;
        background-color: transparent;
        width: 70px;
        height: 30px;
    }
    img{
        margin-left: 20px;
        width: 50px;
        height: 30px;
    }
    ${media.phone`
        max-width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        h1{
            font-size:1em;
        }
        button{
            fon-size:0.6em;
            margin: 0.4em;
        }
  `}
`