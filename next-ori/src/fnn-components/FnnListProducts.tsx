import FnnCard from './FnnCard';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  price_sale?: number | null;
};

type FnnListProductsProps = {
  products: Product[];
};

export default function FnnListProducts({ products }: FnnListProductsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <FnnCard key={product.id} {...product} />
      ))}
    </div>
  );
}
