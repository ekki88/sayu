/*global kakao */
import {useRef,useEffect} from "react";
function Map(){
    const container = useRef(null)
    const options=
        { center : new kakao.maps.LatLng(37.57037778, 126.9816417), level : 5 }

    useEffect(()=>{
        new kakao.maps.Map(container.current,options)
        return () => {};
    },[]);



    return(
        <div id="map" ref={container} style={{ width:'35vw', height:'70vh' }}>
        </div>
    )
}

export default Map;