import React from 'react';
import {useRecoilState} from "recoil";
import heart from "../img/icons/red.svg";
import favorite from "../img/icons/grey.svg";
import {FavoriteList } from "../recoil/atom";

const FavoriteIcon = ({ title, item }) => {
    const [favoriteList, setFavoriteList] = useRecoilState(FavoriteList );

    const isFavorite = favoriteList.some(fav => fav.title === title);

    const handleIconClick = () => {
        let token = localStorage.getItem("token");
        if(token) {
            if (isFavorite) {
                setFavoriteList(favoriteList.filter(fav => fav.title !== title));
            } else {
                setFavoriteList([...favoriteList, { title, item }]);
            }
        } else {
            alert('로그인 후 사용가능합니다.')
        }

    };
    return (
        <img
            src={isFavorite ? heart : favorite}
            alt="icon"
            onClick={handleIconClick}
            style={{cursor: 'pointer'}}
        />
    );
};

export default FavoriteIcon;
