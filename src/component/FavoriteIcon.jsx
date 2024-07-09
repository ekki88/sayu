// 북마크 아이콘
import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import heart from "../img/icons/red.svg";
import favorite from "../img/icons/grey.svg";
import {FavoriteList, UserIdState} from "../recoil/atom";
import styled from "styled-components";

const FavoriteIcon = ({title, item}) => {
    const [bookmarkList, setBookmarkList] = useRecoilState(FavoriteList);
    const [userId] = useRecoilState(UserIdState);
    const isBookmark = bookmarkList.some(fav => fav.title === title);

    useEffect(() => {
        if (userId) {
            const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
            if (savedBookmarks) {
                setBookmarkList(JSON.parse(savedBookmarks));
            }
        }
    }, [userId, setBookmarkList]);

    const handleIconClick = () => {
        let token = localStorage.getItem("token");
        if (token) {
            let newBookmarkList;
            if (isBookmark) {
                newBookmarkList = bookmarkList.filter(fav => fav.title !== title);
            } else {
                newBookmarkList = [...bookmarkList, {title, item}];
            }
            setBookmarkList(newBookmarkList);
            localStorage.setItem(`bookmarks_${userId}`, JSON.stringify(newBookmarkList));
        } else {
            alert('로그인 후 사용가능합니다.');
        }
    };
    return (
        <S.heart
            id='heart'
            src={isBookmark ? heart : favorite}
            alt="icon"
            onClick={handleIconClick}
            style={{cursor: 'pointer'}}
        />
    );
};

export default FavoriteIcon;

const S = {};
S.heart = styled.img`
    width: 35px;
    height: 35px;
`
