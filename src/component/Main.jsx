import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import DetailedPage from "./DetailedPage";
import { useNavigate} from "react-router-dom";
import { useRecoilState } from 'recoil';
import { CartList,  } from '../recoil/atom';
import FavoriteIcon from "./FavoriteIcon";


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


    useEffect(()=>{
        async function getData(){
            try{
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/${api_key}/json/culturalEventInfo/1/1000/${keyword.keyword}/ `,{
                    signal:AbortSignal.timeout(5000)
                })
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

    const onClickDetail = (title) => {
        setSelectedTitle(title);
        navigate("detail",
            {state: {title:`${title}`}});
        setModal(true);
    };

    return (<>
            <S.container>
                {currentPageData ? <><S.list>
                        {currentPageData.map((item,idx) => (
                            <S.box key={item.TITLE}>
                                <S.imgBox>
                                    <S.img src={item.MAIN_IMG} alt="poster" onClick={() => onClickDetail(item.TITLE)}/>
                                    <FavoriteIcon title={item.TITLE} item={item} />
                                </S.imgBox>
                                <S.title onClick={() => {onClickDetail(item.TITLE)}}>{item.TITLE}</S.title>
                                <S.place onClick={() => {navigate(`/map/${item.LOT}/${item.LAT}`)}}>{item.PLACE}</S.place>
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
`
S.header = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
        border: 0;
        background-color: transparent;
        font-weight: bold;
        font-size: 14px;
    }
`
S.menu = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1{
        margin-right: 30px;
    }
    button{
        margin: 20px;
        border: 0;
        background-color: transparent;
        font-size: 14px;
        font-weight: normal;
    }
`

S.list = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr ;
    width: 1000px;
    height: 100%;
`

S.img = styled.img`
    width: 300px;
    height: 450px;
`
S.title = styled.p`
    font-weight: bold;
    word-break: keep-all;
`
S.place = styled.p`
    color: dimgrey;
    word-break: keep-all;
   
`
S.box =styled.div`
    margin: 10px;
`
S.imgBox = styled.div`
    position: relative;
    //FavoriteIcon{
    //    position: absolute;
    //    width: 30px;
    //    height: 30px;
    //    top: 5px;
    //    left: 10px;
    //}
`
S.icon = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    top: 5px;
    left: 10px;
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
  `
