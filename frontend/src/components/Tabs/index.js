import React, { useState } from "react";
import { ActiveLink,  LinkContainer} from './style';

const Tabs = ({ tab, common }) => {

    const activeTab= tab? tab:common;
    
    return (
        <div css={LinkContainer}>
        <ActiveLink to="?tab=portfolio" isactive={activeTab === "portfolio"} >포트폴리오</ActiveLink>
        <ActiveLink to="?tab=review" isactive={activeTab === "review" } >리뷰</ActiveLink>
        </div>
    );
}

export default Tabs;