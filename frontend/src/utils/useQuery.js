import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
    const { search } = useLocation();

    return React.memo(()=> new URLSearchParams(search), [search]);
}

export default useQuery;
//search 값이 바뀌지 않으면 컴포넌트를 메모이제이션