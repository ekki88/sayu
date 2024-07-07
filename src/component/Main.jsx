import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import DetailedPage from "./DetailedPage";
import { useNavigate} from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";
import {media} from "../styles/media";
import upIcon from "../img/icons/arrow.svg";



const Main = (keyword) => {
    const [data, setData] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [modal, setModal] = useState(false);
    const itemsPerPage = 6;
    const api_key = process.env.REACT_APP_API_KEY;
    const today = new Date()
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const time = `${year}-${month}-${day}`;
    const navigate = useNavigate();

    const MAIN = window.location.hostname === 'localhost' ? 'http://openapi.seoul.go.kr:8088/' : '/main';
    const URL = `${MAIN}`;

 const api = axios.create({
        baseURL: URL,
        withCredentials: true, //옵션
        headers: { 'Content-Type': 'application/json' }, //옵션
    });

    useEffect(()=>{
        async function getData(){
            try{
                const response =
                    await api(
                        {
                            method: "get",
                            url: `/${api_key}/json/culturalEventInfo/1/1000/${keyword.keyword}/ `,
                            signal:AbortSignal.timeout(5000)
                        }
                    )
                const result = response.data
                const filteredData = result.culturalEventInfo.row.filter(
                    item => item.GUNAME === "종로구" && item.STRTDATE <= time && item.END_DATE >= time
                );
                setData(filteredData);
            }
            catch(e) {
                alert('조금만 기다려주세요.')
                console.log(e)
            }
        }
        getData()
    },[time, keyword])



    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (<>
            <S.container>
                {currentPageData ? <>
                        <S.list>
                        {currentPageData.map((item,idx) => (
                            <S.box key={item.TITLE}>
                                <S.imgBox>
                                    <S.img src={item.MAIN_IMG} alt="poster"/>
                                </S.imgBox>
                                <S.dataBox>
                                    <S.title>{item.TITLE}</S.title>
                                    <S.date>
                                        <li>{item.DATE}</li>
                                        <li>{item.IS_FREE}</li>
                                    </S.date>
                                    <S.place onClick={() => {
                                        navigate(`/map/${item.LOT}/${item.LAT}`)
                                    }}>{item.PLACE}</S.place>
                                    <S.btnBox>
                                        <S.bookMark><FavoriteIcon title={item.TITLE} item={item}/></S.bookMark>
                                        <S.button><a href={item.ORG_LINK} target="_blank">예약하기 ></a></S.button>
                                    </S.btnBox>
                                </S.dataBox>
                            </S.box>
                        ))}
                        </S.list>
                        {modal === true ? <DetailedPage keyword={keyword} selectedTitle={selectedTitle} setModal={setModal}/>:null}
                        <S.paginationBox>
                            {data.length > 0 && (
                                <ReactPaginate
                                    previousLabel={"이전"}
                                    nextLabel={"다음"}
                                    breakLabel={"..."}
                                    pageCount={Math.ceil(data.length / itemsPerPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"}
                                />
                            )}
                        </S.paginationBox></>:
                    <p>현재 진행중인 행사가 없습니다.</p>}
            </S.container>
            <S.icon src={upIcon} alt="icon" onClick={handleScroll}/>
    </>


    );
};

export default Main;

const S = {};

S.container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    place-items: center;
    cursor: pointer;
    ${media.phone`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
  `}
`

S.list = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr ;
    width: 90%;
    ${media.phone`
        display: grid;
        grid-template-columns: 0.5fr ;
        max-width: 90%;
  `}
`
S.box =styled.div`
    width: 350px;
    height: 500px;
    margin: 10px;
    li{
        text-align: start;
        list-style: none;
        margin: 3px;
    }
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    box-shadow: 1px 1px 5px #ccc;
`
S.dataBox =styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

S.img = styled.img`
    width: 350px;
    height: 450px;
    border-radius: 20px;
`
S.imgBox = styled.div`
    position: relative;
    width: 350px;
    height: 250px;
    overflow: hidden;
`

S.title = styled.p`
    font-weight: bold;
    word-break: normal;;
`
S.date =styled.div`
    display: flex;
    justify-content: space-between;
`
S.place = styled.p`
    color: dimgrey;
    word-break: keep-all;
    text-align: left;
    margin: 5px 0;
`
S.btnBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
`

S.button = styled.button`
    width: 53%;
    height: 40px;
    background-color: lightgrey;
    border: none;
    a{
        text-decoration: none;
        color: black;
        font-weight: bold;
    }
    border-radius: 5px;
    &:hover{
        background-color: #00A1E9;
        a{
            color: #FFF;
        }
    }
`
S.bookMark = styled.button`
    width: 40%;
    height: 40px;
    border: none;
    border-radius: 5px;
`
S.icon = styled.img`
    position: fixed;
    right: 10px;
    bottom: 30px;
    z-index: 22;
    background-color: lightgrey;
    border-radius: 50%;
    ${media.phone`
        width: 40px;
        height: 40px;
  `}
`

S.paginationBox = styled.div`
    display: flex;
    justify-content: center; 
    margin-top: 15px;
  ul { 
      display: flex;
      list-style: none; 
      padding: 0; }
  ul.pagination li {
    width: 40px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
  }
    ${media.phone`
        max-width: 90%;
  `}
  `
