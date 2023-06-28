import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchGet(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    cancelToken: source.token,
                });

                setData(response.data);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    setError(error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // Cleanup function
            // Cancel the ongoing request if the component unmounts
            source.cancel('Request canceled');
        };
    }, [url]);

    return [data, loading, error];
}

export default useFetchGet;
