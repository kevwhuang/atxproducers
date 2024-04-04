import axios, { type AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

import links from '../assets/links.json';

interface AxiosParams {
    endpoint: string;
    options?: AxiosRequestConfig;
}

function useAxios(params: AxiosParams) {
    const { data, error, isLoading, mutate } = useSWR(params, fetcher);
    return { data, error, loading: isLoading, mutate };
}

async function fetcher(params: AxiosParams) {
    try {
        const res = await axios(`/.netlify/functions/${params.endpoint}`, params.options);
        if (params.endpoint === 'getSubmissions') {
            for (const e of res.data) {
                e.stream ||= links.defaultStream;
                e.stream = new URL(e.stream);
            }
            res.data.sort((a: Submission, b: Submission) => a.id - b.id);
        }
        return res.data;
    } catch (err) {
        alert(err);
    }
}

export default useAxios;
