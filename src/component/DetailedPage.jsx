import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import closeIcon from "../img/icons/close.svg";
import close01 from "../img/icons/close01.svg";
import heart from "../img/icons/heart.svg";
import heart01 from "../img/icons/heart01.svg";
// import heart02 from "../img/icons/heart02.svg";
import heart03 from "../img/icons/heart03.svg";
import heart04 from "../img/icons/heart04.svg";


const DetailedPage = (props) => {
    const {keyword, selectedTitle, modal, setModal} = props;
    const [item, setItem] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    console.log('selectedTitle',selectedTitle)
    console.log('keyword',keyword)
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
        console.log("닫음")
        setModal(false)
    }

    return (
        <S.Modal>
            <S.container>
                <button>
                    <img src={heart} alt='icon'/>
                </button>
                <S.DataBox>
                    {/*<S.img src={item.MAIN_IMG} alt='poster'></S.img>*/}
                    {/*<S.list>*/}
                    {/*    <h3>{item.TITLE}</h3>*/}
                    {/*    <li>{item.DATE}</li>*/}
                    {/*    <li>{item.IS_FREE}{item.FEE}</li>*/}
                    {/*    <li>{item.ORG_NAME}{item.PLACE}</li>*/}
                    {/*    <li>가는 길 </li>*/}
                    {/*    <li>{item.ORG_LINK}</li>*/}
                    {/*</S.list>*/}
                </S.DataBox>
                <button onClick={onClickClose}>
                    <img src={closeIcon} alt='closeIcon'/>
                </button>
            </S.container>
        </S.Modal>
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
    border: darkgreen solid 1px;
    button{
        border: 0;
        background-color: transparent;
        font-weight: bold;
        font-size: 14px;
        img{
            width: 50px;
            height: 50px;
        }
    }
`
S.container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 500px;
    transform: translate(-50%, -50%);
    display :flex;
    justify-content:center;
    align-items :center;
    background-color: #ffff;
`
S.DataBox = styled.div`
    width: 700px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
    background-color: #ffff;
`
S.img = styled.img`
    width: 350px;
    height: 400px;
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
