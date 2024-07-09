// 메인화면 프로젝트 리스트
import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import DetailedPage from "./DetailedPage";
import {useNavigate} from "react-router-dom";
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
        headers: {'Content-Type': 'application/json'}, //옵션
    });

    useEffect(() => {
        async function getData() {
            try {
                const response =
                    await api(
                        {
                            method: "get",
                            url: `/${api_key}/json/culturalEventInfo/1/1000/${keyword.keyword}/ `,
                            signal: AbortSignal.timeout(5000)
                        }
                    )
                const result = response.data
                const filteredData = result.culturalEventInfo.row.filter(
                    item => item.GUNAME === "종로구" && item.STRTDATE <= time && item.END_DATE >= time
                );
                setData(filteredData);
            } catch (err) {
                alert('조금만 기다려주세요.')
                console.log(err)
            }
        }

        getData()
    }, [time, keyword])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];

    const handleScroll = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    return (<>
            <S.container>
                {currentPageData ? <>
                        <S.list>
                            {currentPageData.map((item, idx) => (
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
                        {modal === true ?
                            <DetailedPage keyword={keyword} selectedTitle={selectedTitle} setModal={setModal}/> : null}
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
                        </S.paginationBox></> :
                    <p>현재 진행중인 행사가 없습니다.</p>}
            </S.container>
            {media.phone ? <S.icon src={upIcon} alt="icon" onClick={handleScroll}/> : null}
        </>


    );
};

export default Main;

const S = {};

S.container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    align-items: center;
    cursor: pointer;
`

S.list = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 0.3fr 0.3fr;
    ${media.phone`
        grid-template-columns: 0.5fr ;
  `}
`
S.box = styled.div`
    width: 350px;
    height: 500px;
    margin: 10px;

    li {
        text-align: start;
        list-style: none;
        margin: 3px;
    }

    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 1px 1px 5px #ccc;
`
S.dataBox = styled.div`
    height: 250px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
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
S.date = styled.div`
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
    margin-bottom: 20px;
`

S.button = styled.button`
    width: 62%;
    height: 40px;
    background-color: transparent;
    border: 1px solid dimgrey;
    border-radius: 5px;

    a {
        text-decoration: none;
        color: black;
        font-weight: bold;
    }

    &:hover {
        background-color: dimgrey;

        a {
            color: #FFF;
        }
    }
`
S.bookMark = styled.button`
    width: 35%;
    height: 40px;
    padding-top: 2px;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: lightgrey;
    }
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
        padding: 0;
    }

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
