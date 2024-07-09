// 북마크 페이지
import React, {useState} from 'react';
import styled from "styled-components";
import close from "../img/icons/close_s.svg";
import {useRecoilState} from 'recoil';
import {CartList, FavoriteList} from '../recoil/atom';
import heart from "../img/icons/red.svg";
import favorite from "../img/icons/grey.svg";
import {useNavigate} from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";
import ReactPaginate from "react-paginate";
import DetailedPage from "./DetailedPage";
import {media} from "../styles/media";

const BookMark = () => {
    const [favoriteList, setFavoriteList] = useRecoilState(FavoriteList);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    const offset = currentPage * itemsPerPage;
    const currentPageData = Array.isArray(favoriteList) ? favoriteList.slice(offset, offset + itemsPerPage) : [];

    const onClickClose = () => {
        navigate('/home')
    }


    return (
        <S.Modal>
            <S.container>
                {currentPageData.length > 0 ? <>
                    <S.button>
                        <img src={close} alt='closeIcon' onClick={onClickClose}/>
                    </S.button>
                    {currentPageData.map((item, idx) => {
                        return (
                            <S.bookMark idx={item.title}>
                                <img src={item.item.MAIN_IMG} alt="poster"/>
                                <p>{item.title}</p>
                                <FavoriteIcon item={item} title={item.title}/>
                                {/*<img src={close} alt='closeIcon' id="close"/>*/}
                            </S.bookMark>
                        )
                    })}
                    <S.paginationBox>
                        {favoriteList.length > 0 && (
                            <ReactPaginate
                                previousLabel={"이전"}
                                nextLabel={"다음"}
                                breakLabel={"..."}
                                pageCount={Math.ceil(favoriteList.length / itemsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                            />
                        )}
                    </S.paginationBox>
                </> : <>
                    <S.button>
                        <img src={close} alt='closeIcon' onClick={onClickClose}/>
                    </S.button>
                    <S.noBookMark>현재 북마크한 행사가 없습니다.</S.noBookMark>
                </>}
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
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.2);
`
S.container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 500px;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #ffff;

    p {
        align-items: center;
    }

    ${media.phone`
        width: 80%;
  `}
`

S.button = styled.button`
    border: 0;
    background-color: transparent;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    img {
        width: 35px;
        height: 35px;
        margin-top: 5px;
        margin-left: auto;
    }
`

S.bookMark = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;

    img {
        width: 80px;
        height: 100px;
        margin: 15px;
    }

    #close {
        width: 30px;
        height: 30px;
        margin-left: auto;
    }

    FavoriteIcon {
        background-color: dimgrey;
    }

    ${media.phone`
        img{
        width: 50px;
        height: 70px;
        margin: 10px;
        }
        p{
        text-align: left;
        font-size:10px;
        }
        #close{
        width: 20px;
        height: 20px;
        margin:3px;
        }
  `}
`
S.icon = styled.img`
    width: 10px;
    height: 10px;
`

S.paginationBox = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
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
`

S.noBookMark = styled.p`

`