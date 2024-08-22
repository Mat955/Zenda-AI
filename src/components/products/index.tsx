import React from 'react';
import TabsMenu from '../tabs';
import { SideSheet } from '../sheet';
import { Plus } from 'lucide-react';

type Props = {
  id: string;
};

const ProductTable = ({ id }: Props) => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Products</h2>
        <p className="text-sm font-light">
          Add products to your store and set them live to accept payments from
          your customers.
        </p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          { label: 'All Products' },
          { label: 'Live Products' },
          { label: 'Deactivated' },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Add products to your store and set them live to accept payments from your customers."
              title="Add Product"
              className="flex items-center gap-2 bg-orange px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus size={20} />
                  <p>Add Product</p>
                </>
              }
            >
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }
      ></TabsMenu>
    </div>
  );
};

export default ProductTable;
