import { IApiResponse, ListParams, ListResponse } from 'models'
import { ICategory } from 'models/types/categories'
import axiosClient from './axiosClient'

const categoriesApi = {
    getCategoriesList(params: ListParams): Promise<ListResponse<ICategory[]>> {
        const url = '/categories'
        return axiosClient.get(url, { params })
    },
    getCategoryById(id: string): Promise<IApiResponse<ICategory>> {
        const url = `/categories/${id}`
        return axiosClient.get(url)
    },
    // add(data: IProductItem): Promise<IProductItem> {
    //     const url = '/categories'
    //     return axiosClient.post(url, data)
    // },
    // update(data: IProductItem): Promise<IProductItem> {
    //     const url = `/categories/${data.id}`
    //     return axiosClient.patch(url, data)
    // },
    // remove(id: string): Promise<string> {
    //     const url = `/categories/${id}`
    //     return axiosClient.delete(url)
    // },
}

export default categoriesApi;