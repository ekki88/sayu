import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";

import img04 from "../img/004.png";
import img03 from "../img/03.jpg";
import img01 from "../img/01.jpg";
import img02 from "../img/02.jpg";


const Main = () => {
    const [data, setData] = useState();
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(()=>{
        async function getData(){
            try{
                const response = await axios.get(`http://openapi.seoul.go.kr:8088/${api_key}/json/culturalEventInfo/1/100/전시/ `)
                const result = response.data
                // console.log(result.culturalEventInfo.row)
                setData(result)
            }
            catch(e) {
                console.log(e)
            }
        }
        getData()
    },[])
    return (
        <Container>
            <div>
                <b> ^ </b>
                <p>종로구</p>
                <p>강남구</p>
                <p>용산구</p>
                <p>관악구</p>
                <b> ^ </b>
            </div>
            <List>
                {data && data.culturalEventInfo.row.map((item)=>{
                    if(item.GUNAME == '종로구') {
                        return(
                            <>
                                <Img src={item.MAIN_IMG} alt='poster' key={item.id}/>
                            </>
                        )
                    }

                })}
            </List>

            <p>지도 api 미술관  </p>
        </Container>

    );
};

export default Main;


const Container = styled.div`
    display: flex;
    justify-content: center;
    
`
const Img = styled.img`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    width: 100px;
    height: 200px;
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const Li = styled.li`
`
