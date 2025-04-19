export const metadata = {
  title: 'Product Detail | Ori Ecommerce',
  description: 'View details of our high-quality Japanese fabric.',
};

type ProductPageProps = {
  params: { slug: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  return <h1 className="text-2xl font-bold">Product: {params.slug}</h1>;
}
