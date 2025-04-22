import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import FnnListProducts from '@/fnn-components/FnnListProducts';

import productsData from '@/data/x.json';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get('category') ?? 'all';
  const sort = searchParams.get('sort') ?? 'newest';
  const rawPage = searchParams.get('page');
  const page = Number.isNaN(parseInt(rawPage)) ? 1 : parseInt(rawPage);

  const [loadCount, setLoadCount] = useState(1);

  useEffect(() => {
    setLoadCount(1);
  }, [category, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const categories = [
    'all',
    'Kawaii',
    'Sanrio',
    'Nintendo',
    'Disney',
    'San-X',
    'Nickelodeon',
  ];

  let filteredProducts = [...productsData];

  // 1. Filter kategori
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(
      (p) => p.details?.category === category,
    );
  }

  // 2. Filter produk diskon jika sort === 'sale'
  if (sort === 'sale') {
    filteredProducts = filteredProducts.filter((p) => p.price_sale !== null);
  }

  // 3. Sorting
  switch (sort) {
    case 'lowest':
      filteredProducts.sort((a, b) => {
        const aPrice = a.price_sale ?? a.price;
        const bPrice = b.price_sale ?? b.price;
        return aPrice - bPrice;
      });
      break;

    case 'highest':
      filteredProducts.sort((a, b) => {
        const aPrice = a.price_sale ?? a.price;
        const bPrice = b.price_sale ?? b.price;
        return bPrice - aPrice;
      });
      break;

    case 'newest':
      filteredProducts.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      break;
  }

  const PRODUCTS_PER_PAGE = 10;
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const safePage = Math.min(Math.max(1, page), totalPages);

  const paginatedProducts = isMobile
    ? filteredProducts.slice(0, loadCount * PRODUCTS_PER_PAGE)
    : filteredProducts.slice(
        (safePage - 1) * PRODUCTS_PER_PAGE,
        safePage * PRODUCTS_PER_PAGE,
      );

  const startIndex = isMobile ? 1 : (safePage - 1) * PRODUCTS_PER_PAGE + 1;

  const endIndex = isMobile
    ? paginatedProducts.length
    : Math.min(safePage * PRODUCTS_PER_PAGE, totalProducts);

  return (
    <>
      <section className="container mx-auto py-14">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <ul className="flex flex-row gap-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSearchParams((prev) => {
                        prev.set('category', cat);
                        prev.set('page', '1');
                        return prev;
                      });
                    }}
                    className={`btn btn-sm justify-start ${
                      category === cat ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>

            <select
              value={sort}
              onChange={(e) =>
                setSearchParams((prev) => {
                  prev.set('sort', e.target.value);
                  prev.set('page', '1'); // reset halaman saat sort berubah
                  return prev;
                })
              }
              className="select select-ghost select-neutral w-fit"
            >
              <option value="newest">Newest</option>
              <option value="lowest">Lowest Price</option>
              <option value="highest">Highest Price</option>
              <option value="sale">On Sale</option>
            </select>
          </div>

          <p className="text-neutral mb-8 text-sm">
            {isMobile
              ? `Showing ${endIndex} products`
              : `Showing ${startIndex}–${endIndex} of ${totalProducts} products`}
          </p>

          {totalProducts === 0 && (
            <p className="mt-8 text-center text-white">No products found.</p>
          )}

          <FnnListProducts
            products={paginatedProducts}
            className="grid grid-cols-2 gap-6 space-y-10 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5"
          />

          {!isMobile && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {/* Prev, page numbers, Next — seperti sebelumnya */}
              <button
                disabled={safePage <= 1}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set('page', String(safePage - 1));
                    return prev;
                  });
                }}
                className="btn btn-sm"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set('page', String(p));
                      return prev;
                    });
                  }}
                  className={`btn btn-sm ${safePage === p ? 'btn-primary' : 'btn-outline'}`}
                >
                  {p}
                </button>
              ))}

              <button
                disabled={safePage >= totalPages}
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set('page', String(safePage + 1));
                    return prev;
                  });
                }}
                className="btn btn-sm"
              >
                Next
              </button>
            </div>
          )}

          {isMobile && paginatedProducts.length < filteredProducts.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setLoadCount((prev) => prev + 1)}
                className="btn btn-primary"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Shop;
