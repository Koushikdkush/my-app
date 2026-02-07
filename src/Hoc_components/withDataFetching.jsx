import { useEffect, useState } from "react"

function withDataFetching(WrappedComponent, apiUrl) {

    return function Upgraded(props) {
        const [success, setSuccess] = useState(null);
        const [loading, setLoading] = useState(false);
        const [failed, setFailed] = useState(null);

        useEffect(() => {

            const fetchData = async () => {

                setLoading(true);
                setFailed(null);
                setSuccess(null);

                try {
                    const response = await fetch(apiUrl);
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message ?? 'Something went wrong')
                    }
                    setSuccess(data.products);
                } catch (error) {
                    setFailed(error.message);
                } finally {
                    setLoading(false);
                }

            }
            fetchData();

        }, []);

        if (loading) return (<h5>Loading...</h5>);

        if (failed) return (<h5 className="alert alert-danger">{failed}</h5>);

        return <WrappedComponent success={success} />
    }
}

export default withDataFetching;