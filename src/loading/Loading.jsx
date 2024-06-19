import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from 'axios';

import img01 from '../img/01.jpg';
import img02 from '../img/02.jpg';
import img03 from '../img/03.jpg';
import img04 from '../img/004.png';


const Loading = () => {

    return (
        <>
            <ImgBox>
            </ImgBox>
            <ImgBox>
                <img src={img04} alt='Poster'/>
                <img src={img03} alt='Poster'/>
                <img src={img01} alt='Poster'/>
                <img src={img02} alt='Poster'/>
            </ImgBox>
            <ImgBox>

                <img src={img01} alt='Poster'/>
                <img src={img02} alt='Poster'/>
                <img src={img03} alt='Poster'/>
                <img src={img04} alt='Poster'/>
            </ImgBox>
            <p>3개박스 샥샥샥 되게 </p>
        </>

    );
};

export default Loading;

const main = styled.div`
    //기본화면 
    
`

const ImgBox = styled.div`
    display: grid;
    grid-template-rows: 3fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
    img{
        width: 200px;
        height: 300px;
    }
`
