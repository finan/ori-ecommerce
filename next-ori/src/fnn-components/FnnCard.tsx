import Image from 'next/image';

type FnnCardProps = {
  id: number;
  name: string;
  image: string;
  price: number;
  price_sale?: number | null;
};
export default function FnnCard({
  name,
  image,
  price,
  price_sale,
}: FnnCardProps) {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="aspect-square object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-base">{name}</h2>
        <p className="text-sm">
          {price_sale ? (
            <>
              <span className="mr-2 text-gray-400 line-through">¥{price}</span>
              <span className="text-error font-bold">¥{price_sale}</span>
            </>
          ) : (
            <span className="font-bold">¥{price}</span>
          )}
        </p>
      </div>
    </div>
  );
}
