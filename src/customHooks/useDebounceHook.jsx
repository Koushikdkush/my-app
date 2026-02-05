import { useEffect, useState } from "react";

export default function useDebounceHook(value, delay) {

    const [debouceValue, setDebounceValue] = useState(value);

    useEffect(() => {

        const timerId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);


        return () => clearTimeout(timerId);
    }, [value, delay]);

    return debouceValue;
}