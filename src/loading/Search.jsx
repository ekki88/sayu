import React from 'react';
import styled from "styled-components";

const Search = () => {
    return (
        <S.container>
            <S.map>지도</S.map>
            <S.keywordBox>
                <S.keyword>
                    <div>미술관</div>
                    <div>|</div>
                    <div>박물관</div>
                </S.keyword>
                <S.list>
                    <li>서울시립미술관</li>
                    <li>서울공예박물관</li>
                    <li>국립현대미술관</li>
                    <li>서울역사박물관</li>
                    <li>서울시립미술관</li>
                    <li>서울공예박물관</li>
                    <li>국립현대미술관</li>
                    <li>서울역사박물관</li>
                </S.list>
                <S.number>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                </S.number>
            </S.keywordBox>
        </S.container>
    );
};

export default Search;

const S = {};

S.container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

S.map = styled.div`
    width: 500px;
    height: 500px;
    background-color: #282c34;
    margin: 20px;
`
S.keywordBox = styled.div`
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border: #282c34 1px solid;
`
S.keyword = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 5px;
`
S.list = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    li{
        list-style: none;
        margin: 5px;
    }
`
S.number = styled.div`
    display: flex;
    justify-content: space-around;
`