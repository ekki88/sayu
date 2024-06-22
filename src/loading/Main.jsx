import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import Pagination from 'react-js-pagination'


const Main = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [items, setItem] = useState(5)
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
                console.log(result.culturalEventInfo.row);
                setData(result);
            }
            catch(e) {
                console.log(e)
            }
        }
        getData()
    },[api_key])
    return (
        <Container>
            <div>
                <b> SAYU </b>
                <p>진행중인 행사</p>
            </div>
            <List>
                {data && data.culturalEventInfo.row.map((item)=>{
                    if(item.GUNAME == "종로구" && item.STRTDATE < time && item.END_DATE > time ) {
                        return(
                            <Box>
                                <Img src={item.MAIN_IMG} alt='poster' key={item.id}/>
                                <p>{item.DATE}</p>
                                <p>{item.TITLE}</p>
                                <p>{item.PLACE}</p>
                            </Box>
                        )
                    }
                })}
            </List>
        </Container>

    );
};

export default Main;


const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100%;
`
const Img = styled.img`
    width: 20vw;
    height: 50vh;
`

const List = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr ;
    width: 100%;
    height: 100%;
`

const Box =styled.div`
    margin: 10px;
`
