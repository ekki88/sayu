import React from 'react';
import styled from "styled-components";
import loginIcon from "../img/icons/login.png"
import login from "../img/icons/kakao.png"
import close from "../img/icons/close_s.svg";


const Login = (setLogin) => {
    const onClickClose = () =>{
        setLogin(false)
    }

    return (
        <S.Modal>
            <S.container>
                <img src={close} alt='closeIcon' onClick={onClickClose} style={{marginLeft:"auto"}}/>
                <p>카카오로 로그인 해주세요.</p>
                <S.img src={login} alt="icon"/>
            </S.container>
        </S.Modal>
    );
};

export default Login;

const S ={};
S.Modal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top : 0; 
    left :0;
    z-index : 100;
    background-color : rgba(0,0,0,0.2);
`
S.container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 20%;
    height: 350px;
    transform: translate(-50%, -50%);
    display :flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffff;
    border-radius: 5%;
    padding: 20px;
    p{
        font-weight: bold;
        font-size: 20px;
        margin-top: 70px;
        color: dimgrey;
    }
`

S.img = styled.img`
    margin: 80px;
`