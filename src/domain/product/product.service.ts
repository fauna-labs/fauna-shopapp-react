import { apiClient } from '../apiClient'
import { Category, Product, SortOpt } from './product.type'

export interface ListProductsByCategoryInput {
  categoryRef: string
  sortBy?: SortOpt
}

export const listCategories = () =>
  apiClient()
    .get<Record<'data', Category[]>>('/categories')
    .then(({ data: { data } }) => data)

export const listProductsByCategory = ({
  categoryRef,
  sortBy = SortOpt.AVAILABLE,
}: ListProductsByCategoryInput) =>
  apiClient()
    .get<Record<'data', Product[]>>(
      `/categories/${categoryRef}/products`,
      { params: { sortBy } },
    )
    .then(({ data: { data } }) => data)
