import React from 'react';
import {AvatarWrapper} from './style';

const Avartar = ({src, icon, ...props}) => {

    return (
        <AvatarWrapper src={src} {...props}>
        {icon && <icon />}
        </AvatarWrapper>
    );
};

export default Avartar;

