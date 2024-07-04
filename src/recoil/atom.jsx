import React from 'react';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const localStorageEffect =(token)=> {
    return ({ setSelf, onSet }) => {
        const savedValue = localStorage.getItem(token);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        } else {
            // 로컬 스토리지에 저장된 값이 없으면 로그아웃 처리
            localStorage.removeItem(token);
            localStorage.removeItem('recoil-persist');
        }

        onSet((newValue, _, isReset) => {
            isReset
                ? localStorage.removeItem(token)
                : localStorage.setItem(token, JSON.stringify(newValue));
        });
    };
}


export const LoginState = atom({
    key: 'LoginState',
    default: false,
    effects: [localStorageEffect('user')],
});

export const FavoriteList  = atom({
    key: 'FavoriteList ',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

const Atom = () => {
    return (
        <div>

        </div>
    );
};

export default Atom;
