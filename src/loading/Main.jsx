import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import Pagination from 'react-js-pagination'
import ReactPaginate from "react-paginate";


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
        <Container>
            <div>
                <b> SAYU : 사대문 안에서 뭘 하지?  </b>
            </div>
            <List>
                {currentPageData.map((item, index) => (
                    <Box key={index}>
                        <Img src={item.MAIN_IMG} alt="poster" onClick={onClick}/>
                        <Title onClick={onClick}>{item.TITLE}</Title>
                        <Place onClick={onClickPlace}>{item.PLACE}</Place>
                    </Box>
                ))}
            </List>
            <PaginationBox>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    breakLabel={"..."}
                    pageCount={Math.ceil( itemsPerPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </PaginationBox>
        </Container>

    );
};

export default Main;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100%;
    place-items: center;
`
const List = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 0.5fr ;
    width: 1000px;
    height: 100%;
`

const Img = styled.img`
    width: 300px;
    height: 450px;
`
const Title = styled.p`
    font-weight: bold;
    word-break: keep-all;
`
const Place = styled.p`
    color: dimgrey;
    word-break: keep-all;
`
const Box =styled.div`
    margin: 10px;
`
const PaginationBox = styled.div`
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
