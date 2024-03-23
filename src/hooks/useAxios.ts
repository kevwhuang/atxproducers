'use strict';

import axios, { type AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

interface Params {
    endpoint: string;
    options?: AxiosRequestConfig;
}

function fetcher(params: Params) {
    return axios(`/.netlify/functions/${params.endpoint}`, params.options)
        .then(res => res.data)
        .catch(err => alert(err));
}

function useAxios(params: Params) {
    const { data, error, isLoading, mutate } = useSWR(params, fetcher);
    return { data, error, loading: isLoading, mutate };
}

export default useAxios;
