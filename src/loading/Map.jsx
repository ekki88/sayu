/*global kakao */
import {useRef,useEffect} from "react";
import styled from "styled-components";


function Map(){
    const container = useRef(null)
    const options=
        { center : new kakao.maps.LatLng(37.576032, 126.9780123146), level : 5 }

    useEffect(()=>{
        const map = new kakao.maps.Map(container.current,options)
        const ps = new kakao.maps.services.Places();
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        const center = map.getCenter();
        const option = {
            location: center,
            radius: 3000
        };

        ps.keywordSearch('미술관', placesSearchCB, option);

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();

                data.forEach((place) => {
                    displayMarker(place);
                    bounds.extend(new kakao.maps.LatLng(place.y, place.x));
                });

                map.setBounds(bounds);
            }
        }

        function displayMarker(place) {
            const marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
                infowindow.open(map, marker);
            });
        }
        return () => {};
    },[]);

    return(
        <>
            <S.map id="map" ref={container}/>
        </>
    )
}

export default Map;

const S ={};

S.map = styled.div`
    width: 35vw;
    height: 70vh;
`
S.polygon = styled.div`

`