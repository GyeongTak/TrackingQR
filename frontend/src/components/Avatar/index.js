import React from 'react';
import {AvatarWrapper} from './style';

const Avatar = ({src, icon, ...props}) => {

    return (
        <AvatarWrapper src={src} {...props}>
        {icon && <icon />}
        </AvatarWrapper>
    );
};

export default Avatar;

