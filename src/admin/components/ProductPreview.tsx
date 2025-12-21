import { Star } from 'lucide-react';

interface ProductPreviewProps {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  customizable: boolean;
  colors?: string[];
}

const ProductPreview = ({
  name,
  description,
  price,
  originalPrice,
  image,
  category,
  badge,
  customizable,
  colors = [],
}: ProductPreviewProps) => {
  const badgeLabels: Record<string, string> = {
    bestseller: 'Best Seller',
    new: 'New',
    sale: 'Sale',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow max-w-[300px]">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
        {badge && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded uppercase z-10">
            {badgeLabels[badge] || badge}
          </span>
        )}
        {image ? (
          <img
            src={image}
            alt={name || 'Product preview'}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="text-gray-400 text-sm text-center px-4">
            [ Product Image Preview ]
          </div>
        )}
      </div>

      {/* Category */}
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {category || 'Category'}
      </p>

      {/* Title */}
      <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-2">
        {name || 'Product Name'}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 text-amber-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
        <span className="text-xs text-gray-500 ml-1">(0 Reviews)</span>
      </div>

      {/* Pricing */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xl font-extrabold text-gray-900">
          ₹{price?.toLocaleString() || '0'}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
        )}
        <span className="text-xs text-gray-500">/ per unit</span>
      </div>

      {/* Bulk Info */}
      <p className="text-xs text-green-600 font-semibold mb-3">
        Save 15% on orders over 50 units
      </p>

      {/* Colors Preview */}
      {colors.length > 0 && (
        <div className="flex items-center gap-1 mb-3">
          <span className="text-xs text-gray-500 mr-1">Colors:</span>
          {colors.slice(0, 4).map((color, i) => (
            <span
              key={i}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {colors.length > 4 && (
            <span className="text-xs text-gray-400">+{colors.length - 4}</span>
          )}
        </div>
      )}

      {/* Add to Quote Button */}
      <button className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-medium py-2 px-4 rounded-full text-sm transition-colors">
        Add to Quote
      </button>

      {/* Customize Link */}
      {customizable && (
        <a
          href="#"
          className="block text-center text-xs text-blue-600 hover:text-orange-600 hover:underline mt-2"
        >
          Customize with your Logo &gt;
        </a>
      )}
    </div>
  );
};

export default ProductPreview;
