import { useState, useMemo } from 'react';
import { getSelectedVariant } from '@/utils/getSelectedVariant';
import ProductImage from '@/fnn-components/ProductImage';
import ProductTitle from '@/fnn-components/ProductTitle';
import ProductPrice from '@/fnn-components/ProductPrice';
import ProductStockStatus from '@/fnn-components/ProductStockStatus';

const FnnCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.[0]?.color || 'Default Color',
  ); // Warna default

  const selectedVariant = useMemo(() => {
    return getSelectedVariant(product.variants, selectedColor);
  }, [selectedColor, product.variants]);

  return (
    <div className="flex w-full cursor-pointer flex-col gap-3">
      <div className="flex flex-col gap-2">
        <ProductImage src={selectedVariant?.images?.[0]} alt={product.name} />
        <ProductTitle
          category={product.details?.category}
          name={product.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-slate-500">
          {selectedVariant?.color || 'Unknown Color'}
        </p>

        {/* Warna yang tersedia */}
        <h4 className="sr-only">Available colors</h4>
        <ul role="list" className="flex flex-wrap space-x-2">
          {product.variants?.map((variant) => (
            <li
              key={variant.color}
              className={`size-5 cursor-pointer rounded-full border border-black/10 transition ${
                selectedColor === variant.color ? 'ring-1 ring-slate-500' : ''
              }`}
              style={{ backgroundColor: variant.colorBg }}
              onClick={() => setSelectedColor(variant.color)}
            >
              <span className="sr-only">{variant.color}</span>
            </li>
          )) || <p className="text-red-500">No variants available</p>}
        </ul>

        {/* Menampilkan Harga atau Harga Diskon */}
        <ProductPrice price={product.price} salePrice={product.price_sale} />

        {/* Tampilkan status stok */}
        <ProductStockStatus quantity={selectedVariant?.quantity} />
      </div>
    </div>
  );
};

export default FnnCard;
