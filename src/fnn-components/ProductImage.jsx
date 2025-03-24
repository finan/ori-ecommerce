/**
 * Komponen untuk menampilkan gambar produk dengan fallback image.
 * @param {string} src - URL gambar produk.
 * @param {string} alt - Alt text untuk gambar.
 */
const ProductImage = ({ src, alt }) => {
  const imageSrc = src || '/images/products/help-placeholder.jpg';

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="aspect-square object-cover transition-opacity duration-200 hover:opacity-80"
    />
  );
};

export default ProductImage;
