// 시작 페이지
import React from 'react';
import styled from "styled-components";

import img01 from '../img/01.jpg';
import img02 from '../img/02.jpg';
import img03 from '../img/03.jpg';
import img04 from '../img/04.png';
import img05 from '../img/05.PNG';
import img06 from '../img/06.PNG';
import img07 from '../img/07.jpg';
import img08 from '../img/08.PNG';
import img09 from '../img/09.PNG';
import img10 from '../img/10.PNG';
import img11 from '../img/11.PNG';
import img12 from '../img/12.PNG';
import img13 from '../img/13.PNG';
import img14 from '../img/14.PNG';
import img15 from '../img/15.PNG';
import {Link, useNavigate} from "react-router-dom";


const Loading = () => {
    const navigate = useNavigate()

    function onClick() {
        navigate('/home')
    }

    return (
        <Link to='/home'>
            <S.imgBox>
                <img src={img01} alt='Poster'/>
                <img src={img02} alt='Poster'/>
                <img src={img03} alt='Poster'/>
                <img src={img04} alt='Poster'/>
                <img src={img10} alt='Poster'/>
                <img src={img15} alt='Poster'/>
                <img src={img09} alt='Poster'/>
                <img src={img12} alt='Poster'/>
                <img src={img14} alt='Poster'/>
                <img src={img08} alt='Poster'/>
            </S.imgBox>
            <S.imgBoxRight>
                <img src={img09} alt='Poster'/>
                <img src={img12} alt='Poster'/>
                <img src={img14} alt='Poster'/>
                <img src={img08} alt='Poster'/>
                <img src={img11} alt='Poster'/>
                <img src={img06} alt='Poster'/>
                <img src={img07} alt='Poster'/>
                <img src={img05} alt='Poster'/>
                <img src={img13} alt='Poster'/>
            </S.imgBoxRight>
            <S.imgBox>
                <img src={img05} alt='Poster'/>
                <img src={img06} alt='Poster'/>
                <img src={img07} alt='Poster'/>
                <img src={img11} alt='Poster'/>
                <img src={img13} alt='Poster'/>
                <img src={img01} alt='Poster'/>
                <img src={img02} alt='Poster'/>
                <img src={img03} alt='Poster'/>
                <img src={img04} alt='Poster'/>
                <img src={img10} alt='Poster'/>
            </S.imgBox>
        </Link>
    );
};

export default Loading;

const S = {};

S.imgBox = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation-duration: 3s;
    animation-name: slide;

    img {
        width: 33vw;
        height: 33vh;
    }

    @keyframes slide {
        from {
            margin-left: 100%;
            width: 300%;
        }

        to {
            margin-left: 0;
            width: 100%;
        }
    }
`

S.imgBoxRight = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    animation-duration: 3s;
    animation-name: slideRight;

    img {
        width: 33vw;
        height: 34vh;
    }

    @keyframes slideRight {
        from {
            margin-left: -100%;
            width: 300%;
        }

        to {
            margin-left: 0;
            width: 100%;
        }
    }
`