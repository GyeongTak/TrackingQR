import { atom } from 'recoil';

const textState = atom({
    key: 'userState',
    default: {
        userId: null,
        isClient: null,
        profileImage: '',
    }
});

export default textState;