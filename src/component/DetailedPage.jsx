import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import close from "../img/icons/close_s.svg";
import {useNavigate} from "react-router-dom";



const DetailedPage = (props) => {
    const navigate = useNavigate();
    const {keyword, selectedTitle, setModal} = props;
    const [item, setItem] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;


    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await axios.get(`http://openapi.seoul.go.kr:8088/${api_key}/json/culturalEventInfo/1/1000/${keyword.keyword}/ `);
                    const result = response.data.culturalEventInfo.row.find(item => item.TITLE === selectedTitle);
                    setItem(result);
                } catch (e) {
                    console.log(e);
                }
            }
            fetchData();
    }, [selectedTitle]);

    const onClickClose = () =>{
        setModal(false);
    };

    return (
        <>
            {item &&
                <S.Modal>
                    <S.container>
                        <S.dataBox>
                            <S.imgBox>
                                <S.img src={item.MAIN_IMG} alt='poster'/>
                            </S.imgBox>
                            <S.list>
                                <h3>{item.TITLE}</h3>
                                <li>{item.DATE}</li>
                                {item.USE_FEE === "무료" ? <li>{item.IS_FREE}</li> : <li>{item.IS_FREE} {item.USE_FEE}</li>}
                                {item.ORG_NAME === "기타" ? <li>{item.PLACE}</li> : <li>{item.ORG_NAME} {item.PLACE}</li>}
                                <li onClick={() => {navigate(`/map/${item.LOT}/${item.LAT}`)}}>지도 보기
                                </li>
                                <a href={item.ORG_LINK} target="_blank">예약하기 ></a>
                            </S.list>
                        </S.dataBox>
                        <S.button>
                            <img src={close} alt='closeIcon' onClick={onClickClose}/>
                        </S.button>
                    </S.container>
                </S.Modal>
            }
        </>
    );
};

export default DetailedPage;

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
    width: 50%;
    height: 450px;
    transform: translate(-50%, -50%);
    display :flex;
    justify-content: space-between;
    background-color: #ffff;
    padding: 10px;
    cursor: pointer;
`
S.button = styled.button`
    border: 0;
    background-color: transparent;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    img{
        width: 35px;
        height: 35px;
    }
`
S.dataBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: #ffff;
    margin-top: 5px;
`
S.imgBox = styled.div`
    position: relative;
`
S.img = styled.img`
    width: 300px;
    height: 400px;
    background-color: #282c34;
    margin: 20px;
`
S.icon = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 25px;
    left: 25px;
    img{
        z-index: 2;
    }
`
S.list = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    word-break: keep-all;
    text-align: start;
    h3{
        text-align: start;
    }
    li{
        text-align: start;
        list-style: none;
        margin: 3px;
    }
    a{
        text-decoration: none;
        color: black;
        font-weight: bold;
        font-size: 14px;
        margin: 3px;
    }
`
