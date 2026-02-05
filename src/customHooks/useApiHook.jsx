import { useEffect, useState } from "react";
import axios from "axios";


function useApiHook(api = 'https://dummyjson.com/products') {

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);



    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(api);
                setSuccess(res.data);
            } catch (err) {
                console.log(err.message);
                setError(err.message);
            }finally{
                setLoading(false);
            }

        };

        fetchData();

    }, [api]);

    return {
        loading, success, error
    };
}
export default useApiHook;