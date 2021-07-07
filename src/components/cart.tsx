import { FC } from 'react'
import { WithHeader } from './header'
import { Card } from './card'
import { InputGroup } from './inputGroup'

export const Cart: FC = () => (
  <WithHeader>
    <div className="container mx-auto py-8">
      <Card title="Confirm the Order" className="w-2/3 mx-auto">
        <ul className="divide-y">
          {[
            { name: 'Product One', price: 10 },
            { name: 'Product One', price: 10 },
          ].map((product, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center space-x-2 px-6 py-4"
            >
              <div className="flex space-x-2">
                <h4 className="font-semibold mr-4">{product.name}</h4>
                <input
                  className="w-16 border text-center rounded"
                  min="1"
                  type="number"
                  value={1}
                />
                <span>$10.00</span>
              </div>
              <h4 className="font-semibold">$40.00</h4>
            </li>
          ))}
        </ul>
        <div className="px-6 py-4 border-t-2 border-dashed">
          <InputGroup
            id="address"
            className="w-1/2"
            label="Address"
          />
          <InputGroup
            id="address"
            className="w-1/2"
            label="Address"
          />
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-t-2 border-dashed">
          <h4 className="font-semibold mr-4">Total:</h4>
          <h4 className="font-semibold">$350.00</h4>
        </div>
      </Card>
    </div>
  </WithHeader>
)
