import { FC, useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import cn from 'classnames'
import {
  Product as ProductType,
  SortOpt,
  listCategories,
  listProductsByCategory,
} from '../domain/product'
import { WithHeader } from './header'
import { Button } from './button'
import { FullScreenLoader } from './fullScreenLoader'
import { Product } from './product'

const SortNames: Record<SortOpt, string> = {
  [SortOpt.AVAILABLE]: 'By availability',
  [SortOpt.PRICE_ASC]: 'By Price (ASC)',
  [SortOpt.PRICE_DESC]: 'By Price (DESC)',
}

const useHomeFlow = () => {
  const [sortBy, setSortBy] = useState<SortOpt>(SortOpt.AVAILABLE)
  const [selectedCategoryRef, setSelectedCategoryRef] = useState<
    string | null
  >(null)
  const { data: categories = [], isLoading: areCategoriesLoading } =
    useQuery('categories', () => listCategories())
  const categoryToQuery =
    selectedCategoryRef ?? categories[0]?.ref ?? null
  const { data: products = [], isLoading: areProductsLoading } =
    useQuery(
      ['products', categoryToQuery, sortBy],
      ({ queryKey: [, categoryRef, sortBy] }) =>
        listProductsByCategory({
          categoryRef,
          sortBy: sortBy as SortOpt,
        }),
      {
        enabled: categoryToQuery != null,
      },
    )
  const staleProductsRef = useRef<ProductType[]>([])

  useEffect(() => {
    if (products.length) {
      staleProductsRef.current = products
    }
  }, [products])

  return {
    areCategoriesLoading,
    areProductsLoading,
    categories,
    products: areProductsLoading
      ? staleProductsRef.current
      : products,
    selectedCategory: categoryToQuery,
    sortBy,
    onCategorySelect: setSelectedCategoryRef,
    onSortByChange: setSortBy,
  }
}

export const Home: FC = () => {
  const flow = useHomeFlow()

  return (
    <WithHeader>
      <div className="container mx-auto py-4">
        <div className="flex justify-between">
          <div className="flex space-x-1.5 mr-6 overflow-x-scroll hide-scrollbar">
            {flow.areCategoriesLoading
              ? Array(3)
                  .fill(null)
                  .map((_, idx) => (
                    <Button key={idx} disabled>
                      ...
                    </Button>
                  ))
              : flow.categories.map(({ ref, name }) => (
                  <Button
                    key={ref}
                    selected={ref === flow.selectedCategory}
                    onClick={() => flow.onCategorySelect(ref)}
                  >
                    {name}
                  </Button>
                ))}
          </div>
          <select
            className="flex-shrink-0 w-40 rounded px-2 text-gray-700"
            value={flow.sortBy}
            onChange={({ target: { value } }) =>
              flow.onSortByChange(value as SortOpt)
            }
          >
            {Object.values(SortOpt).map(sortOpt => (
              <option key={sortOpt} value={sortOpt}>
                {SortNames[sortOpt]}
              </option>
            ))}
          </select>
        </div>
        {flow.areProductsLoading && !flow.products.length ? (
          <FullScreenLoader />
        ) : (
          <div
            className={cn(
              'grid grid-flow-row-dense justify-between',
              'gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mt-4',
            )}
          >
            {flow.products.map(product => (
              <Product key={product.ref} product={product} />
            ))}
          </div>
        )}
      </div>
    </WithHeader>
  )
}
