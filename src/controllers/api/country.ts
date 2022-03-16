import axiosClient from './axiosClient'
import { ListParams, ListResponse, IIdCodeName, IApiResponse } from 'models'

const countryApi = {
    getCountryList(params: ListParams): Promise<ListResponse<IIdCodeName>> {
        const url = '/country'
        return axiosClient.get(url, { params })
    },
    getCountryById(id: string): Promise<IApiResponse<IIdCodeName>> {
        const url = `/country/${id}`
        return axiosClient.get(url)
    }
};

export default countryApi;