import React from 'react';
import styled from "styled-components";

const DetailedPage = () => {
    return (
        <S.container>
            <S.DataBox>
                <S.img></S.img>
                <S.list>
                    <li>서울시립미술관</li>
                    <li>월요일 휴무</li>
                    <li>서울 중구 덕수궁길 61</li>
                    <li>시청역 10번 출구에서 263m</li>
                    <li>시청역 2호선</li>
                </S.list>
            </S.DataBox>
            <S.ExhibitionBox>
                <p>현재 진행중인 전시 </p>
                <S.Exhibition>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                </S.Exhibition>
            </S.ExhibitionBox>
        </S.container>
    );
};

export default DetailedPage;

const S = {};

S.container = styled.div`
   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
S.DataBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

S.img = styled.div`
    width: 350px;
    height: 500px;
    background-color: #282c34;
    margin: 20px;
`
S.list = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    li{
        list-style: none;
        margin: 3px;
    }
`

S.ExhibitionBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

S.Exhibition = styled.div`
    display: flex;
    justify-content: space-around;
`
