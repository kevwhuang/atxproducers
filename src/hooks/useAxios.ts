'use strict';

import axios, {
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import useSWR, { SWRResponse } from 'swr';

interface Params {
    endpoint: string,
    options?: AxiosRequestConfig,
}

const BASE: string = '';

function fetcher(params: Params): Promise<any> {
    return axios(`${BASE}/${params.endpoint}`, params.options)
        .then((res: AxiosResponse<any, any>): any => res.data)
        .catch((err: Error): void => console.log(err));
}

function useAxios(params: Params): any {
    const { data, error, isLoading, mutate }: SWRResponse<any, Error, any>
        = useSWR<Params, Error>(params, fetcher);

    return { data, error, loading: isLoading, mutate };
}

export default useAxios;
