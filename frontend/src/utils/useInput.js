import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const useInput = (initialState) => {
    const [value, setter] = useState(initialState);
    
    const handler = (e) => {
        setter(e.target.value);
    };

    return [value, handler, setter];
}

export {useInput};
//search 값이 바뀌지 않으면 컴포넌트를 메모이제이션