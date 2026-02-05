import { useEffect, useRef, useState } from "react";

function About() {


    const searchBoxRef = useRef(null);
    const timerRef = useRef(null);
    const lockRef = useRef(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [failed, setFailed] = useState(null);



    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    async function call_api(value) {
        const api = `https://dummyjson.com/products/${value}`;

        setLoading(true);
        setSuccess(null);
        setFailed(null);
        try {
            const result = await fetch(api);
            const data = await result.json();
            if (!result.ok) {
                throw new Error(data.message || 'Something went Wrong!');
            }
            setSuccess(data);
        } catch (error) {
            console.log(error.message);
            setFailed(error.message || 'NetWork Error');
        } finally {
            setLoading(false);
            lockRef.current = false;
        }
    }

    function search() {
        if (lockRef.current) return;

        lockRef.current = true;
        timerRef.current = setTimeout(() => {
            call_api(searchBoxRef.current.value);
        }, 1000);

    }


    return (
        <>
            <div className="container p-2 mt-2">
                <div className="row">
                    <div className="col-6 d-flex">
                        <input
                            placeholder="Search Item"
                            type="text" ref={searchBoxRef}
                            className="form-control"
                        />
                        <button
                            onClick={search}
                            className="btn btn-primary"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>
            </div>

            <div className="container p-2 mt-2">
                <div className="row">
                    <div className="col-12">
                        {
                            loading && (<p className="alert alert-info">Fetching Data</p>)
                        }
                        {
                            success && (
                                <p className="alert alert-success">
                                    {success.title}
                                </p>
                            )
                        }
                        {
                            failed && (
                                <p className="alert alert-danger">
                                    {JSON.stringify(failed)}
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>

        </>

    );
}

export default About;
