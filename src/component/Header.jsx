import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Map from "./Map";
import Main from "./Main";

const Header = () => {
    const [keyword, setKeyWord] = useState('전시')
    const navigate = useNavigate();

    const handleKeywordClick = (keyword) =>{
        setKeyWord(keyword);
        console.log('확인',keyword)
    }
    function onClickLogin () {
        navigate("/login");
    }
    return (
        <S.container>
            <S.header>
                <S.menu>
                    <h1>SAYU</h1>
                    <button onClick={()=>handleKeywordClick('전시')}>전시</button>
                    <button onClick={()=>handleKeywordClick('뮤지컬')}>공연</button>
                    <button onClick={()=>handleKeywordClick('축제')}>축제</button>
                </S.menu>
                <button onClick={onClickLogin}>로그인 </button>
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
        font-weight: normal;
    }
`