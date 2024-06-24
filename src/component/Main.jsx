import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Header from "./Header";


const Main = () => {
    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const api_key = process.env.REACT_APP_API_KEY;
    const today = new Date()
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const time = `${year}-${month}-${day}`;

    useEffect(()=>{
        async function getData(){
            try{
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/${api_key}/json/culturalEventInfo/1/1000/전시/ `)
                const result = response.data
                const filteredData = result.culturalEventInfo.row.filter(
                    item => item.GUNAME === "종로구" && item.STRTDATE <= time && item.END_DATE >= time
                );
                setData(filteredData);
            }
            catch(e) {
                console.log(e)
            }
        }
        getData()
    },[])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = Array.isArray(data) ? data.slice(offset, offset + itemsPerPage) : [];
    const onClick = () =>{
        console.log('전시 상세페이지로 ')
    }
    const onClickPlace = () => {
        console.log('장소 상세페이지 , 카카오 ')
    }
    return (
        <S.container>
            <Header/>
            <S.list>
                {currentPageData.map((item) => (
                    <S.box key={item.TITLE}>
                        <S.img src={item.MAIN_IMG} alt="poster" onClick={onClick}/>
                        <S.title onClick={onClick}>{item.TITLE}</S.title>
                        <S.place onClick={onClickPlace}>{item.PLACE}</S.place>
                    </S.box>
                ))}
            </S.list>
            <S.paginationBox>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </S.paginationBox>
        </S.container>

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
`
S.header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    div{
        p{
            display: flex;
            justify-content: center;
            align-content: center;
        }
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
  }
  `
