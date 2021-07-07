export enum SortOpt {
  AVAILABLE = 'available',
  PRICE_ASC = 'priceAsc',
  PRICE_DESC = 'priceDesc',
}

export interface Category {
  ref: string
  name: string
}

export interface Product {
  ref: string
  name: string
  price: number
  quantity: number
}
