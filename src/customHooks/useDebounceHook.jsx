import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {

    const [debounce, setDebounce] = useState(value);

    useEffect(() => {

        const timerId = setTimeout(() => {
            setDebounce(value);
        }, delay);


        return () => clearTimeout(timerId);

    }, [delay, value]);

    return debounce;
}

export default useDebounce;