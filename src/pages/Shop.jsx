import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';

import FnnListProducts from '@/fnn-components/FnnListProducts';
import productsData from '@/data/x.json';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get('category') ?? '';
  const selectedCategories = rawCategory ? rawCategory.split(',') : [];
  const sort = searchParams.get('sort') ?? 'newest';
  const rawPage = searchParams.get('page');
  const page = Number.isNaN(parseInt(rawPage)) ? 1 : parseInt(rawPage);

  const [loadCount, setLoadCount] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setLoadCount(1);
  }, [rawCategory, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

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

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.details?.category),
    );
  }

  if (sort === 'sale') {
    filteredProducts = filteredProducts.filter((p) => p.price_sale !== null);
  }

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
      filteredProducts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
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
    <section className="container mx-auto py-14">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
            className="btn btn-sm btn-outline btn-category-toggle flex items-center gap-2"
          >
            {`Category${selectedCategories.length > 0 ? ` (${selectedCategories.length})` : ''}`}
            {showCategoryDropdown ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => {
              setSearchParams((prev) => {
                prev.set('sort', e.target.value);
                prev.set('page', '1');
                return prev;
              });
            }}
            className="select select-ghost select-neutral w-fit"
          >
            <option value="newest">Newest</option>
            <option value="lowest">Lowest Price</option>
            <option value="highest">Highest Price</option>
            <option value="sale">On Sale</option>
          </select>
        </div>

        {showCategoryDropdown && (
          <div
            ref={dropdownRef}
            className="bg-accent/10 mb-6 w-full rounded p-4"
          >
            <div className="mb-10 flex flex-wrap gap-2">
              {categories
                .filter((cat) => cat !== 'all')
                .map((cat) => {
                  const isSelected = selectedCategories.includes(cat);

                  const handleToggle = () => {
                    const updated = isSelected
                      ? selectedCategories.filter((c) => c !== cat)
                      : [...selectedCategories, cat];

                    const newParams = new URLSearchParams(searchParams);
                    if (updated.length === 0) {
                      newParams.delete('category');
                    } else {
                      newParams.set('category', updated.join(','));
                    }
                    newParams.set('page', '1');
                    setSearchParams(newParams);
                  };

                  return (
                    <button
                      key={cat}
                      onClick={handleToggle}
                      className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline border-white bg-white hover:border-1 hover:border-neutral-900'}`}
                    >
                      {cat}
                    </button>
                  );
                })}
            </div>
            <div className="flex flex-row justify-end gap-2">
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('category');
                  newParams.set('page', '1');
                  setSearchParams(newParams);
                }}
                className="btn btn-sm btn-ghost"
              >
                Reset
              </button>

              <button
                onClick={() => setShowCategoryDropdown(false)}
                className="btn btn-sm btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}

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
  );
}

export default Shop;
