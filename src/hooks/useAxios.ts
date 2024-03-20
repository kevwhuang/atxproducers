'use strict';

import axios from 'axios';
import useSWR from 'swr';

function fetcher(params: AxiosParams) {
    return axios(`/.netlify/functions/${params.endpoint}`, params.options)
        .then(res => res.data)
        .catch(err => alert(err));
}

function useAxios(params: AxiosParams) {
    const { data, error, isLoading, mutate } = useSWR(params, fetcher);
    return { data, error, loading: isLoading, mutate };
}

export default useAxios;
