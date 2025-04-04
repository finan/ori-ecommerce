/**
 * Komponen untuk menampilkan gambar produk dengan fallback jika tidak ada gambar.
 *
 * @param {string} src - URL gambar produk.
 * @param {string} alt - Alt text untuk gambar.
 * @param {string} className - Tambahan class dari luar (opsional).
 */
const ProductImage = ({ src, alt, className = '' }) => {
  const imageSrc = src || '/images/products/help-placeholder.jpg';

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`rounded-field aspect-square object-cover transition-opacity duration-200 hover:opacity-80 ${className}`}
    />
  );
};

export default ProductImage;
