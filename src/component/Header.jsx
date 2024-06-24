import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    function onClickLogin () {
        navigate("/login");
    }

    return (
        <S.container>
            <S.DataBox>
                <h1>SAYU</h1>
                <p>전시</p>
                <p>공연</p>
                <p>축제</p>
            </S.DataBox>
            <h5 onClick={onClickLogin}>로그인 </h5>
        </S.container>
    );
};

export default Header;

const S = {};

S.container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
S.DataBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1{
        margin-right: 30px;
    }
    p{
        margin: 20px;
    }
`