import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";

const KakaoMap = (props) => {
    const {} = props;
    const { lat, lng } = useParams();
console.log("지도 확인 ",lat)
    useEffect(() => {
        const { kakao } = window;
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        const mapContainer = document.getElementById('map');
        const mapOption = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 3,
        };

        const map = new kakao.maps.Map(mapContainer, mapOption);

        const markerPosition = new kakao.maps.LatLng(latitude, longitude);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
        });
        marker.setMap(map);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(longitude, latitude, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const detailAddr = result[0].road_address
                    ? result[0].road_address.address_name
                    : result[0].address.address_name;
                const content = `<div class="bAddr">
                          <span class="title">주소정보</span>
                          <div>${detailAddr}</div>
                        </div>`;

                const infowindow = new kakao.maps.InfoWindow({
                    content: content,
                    removable: true,
                });
                infowindow.open(map, marker);
            }
        });
    }, [lat, lng]);

    return (
        <div>
            <S.mapContainer  id="map" ></S.mapContainer>
        </div>
    );
};

export default KakaoMap;
const S = {};

S.mapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;