import React from 'react';
import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

const localStorageEffect = (key) => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};


export const LoginState = atom({
    key: 'LoginState',
    default: false,
    effects: [localStorageEffect('user')],
});

export const UserIdState = atom({
    key: 'UserIdState',
    default: '',
    effects: [localStorageEffect('userId')],
});

export const FavoriteList = atom({
    key: 'FavoriteList ',
    default: [],
    effects_UNSTABLE: [localStorageEffect('bookmarks')],
})

const Atom = () => {
    return (
        <div>

        </div>
    );
};

export default Atom;
