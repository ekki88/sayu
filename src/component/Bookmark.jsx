import React from 'react';
import styled from "styled-components";
import close from "../img/icons/close_s.svg";
import bookmark from "../img/icons/bookmarkFill.svg";


const BookMark = ({setOpen}) => {
    const onClickClose = () =>{
        setOpen(false)
    }

    return (
        <S.Modal>
            <S.container>
                <S.button>
                    <img src={close} alt='closeIcon' onClick={onClickClose}/>
                </S.button>
            </S.container>
        </S.Modal>
    );
};

export default BookMark;

const S = {};

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
    width: 60%;
    height: 500px;
    transform: translate(-50%, -50%);
    display :flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ffff;
`

S.button = styled.button`
    border: 0;
    background-color: transparent;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    img{
        width: 35px;
        height: 35px;
        margin: 10px 10px 0 10px;
        &:first-child{
            fill: red;
        }
    }
`
