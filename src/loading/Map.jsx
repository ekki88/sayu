/*global kakao */
import {useRef,useEffect} from "react";
import styled from "styled-components";


function Map(){
    const container = useRef(null)
    const options=
        { center : new kakao.maps.LatLng(37.57037778, 126.9816417), level : 5 }

    useEffect(()=>{
        new kakao.maps.Map(container.current,options)
        return () => {};
    },[]);



    return(
        <>
            <S.map ref={container}/>
        </>
    )
}

export default Map;

const S ={};

S.map = styled.div`
    width: 35vw;
    height: 70vh;
    
`