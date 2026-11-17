import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Fetch_Products_By_Category } from "../reduxstore/Actioncreator.jsx";

// ==================== Redux connect ====================
const mapStateToProps = (state) => {
  return {
    a_token:state.Auth_Reducer.a_token,
    iS_product_data_loading: state.productReducer.iS_product_data_loading,
    pRODUCT_data_load_success: state.productReducer.pRODUCT_data_load_success,
    pRODUCT_data_load_failed: state.productReducer.pRODUCT_data_load_failed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Fetch_Products_By_Category: (ct) =>
      dispatch(Fetch_Products_By_Category(ct)),
  };
};

// ==================== Categories ====================
const categories = [
  { name: "Handcrafts", icon: "sparkles" },
  { name: "Hand Tools", icon: "tool" },
  { name: "Power Tools", icon: "zap" },
  { name: "Gadgets", icon: "smartphone" },
  { name: "Food", icon: "coffee" },
  { name: "Cloths", icon: "shopping-bag" },
  { name: "Shoes", icon: "activity" },
];

// ==================== Main Component ====================
function EcommerceHome(props) {
  const [activeCategory, setActiveCategory] = useState("Handcrafts");
  const navigate = useNavigate();

  const {
    a_token,
    Fetch_Products_By_Category,
    iS_product_data_loading,
    pRODUCT_data_load_success,
    pRODUCT_data_load_failed,
  } = props;

  // ============ Fetch when category changes ============
  useEffect(() => {
    if (activeCategory) {
      Fetch_Products_By_Category(activeCategory);
    }
  }, [activeCategory]);

  // ============ API data ============
  const products = pRODUCT_data_load_success || [];

  // ============ Handlers ============
  const handleAddToCart = (product, variant) => {
    console.log("Add to Cart:", {
      product_id: product.id,
      p_name: product.p_name,
      variant_id: variant.id,
      sku: variant.sku,
      price: variant.price,
      quantity: 1,
    });
    // TODO: dispatch(addToCart(...))
    if(a_token){
      console.log('add in card')
    }
    else{
      alert(`please log in firt dear`);
    }
  };

  const handleBuyNow = (product, variant) => {
    console.log("Buy Now:", {
      product_id: product.id,
      variant_id: variant.id,
      price: variant.price,
    });
    navigate(`/product/${variant.id}`);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="w-full space-y-5 p-4">
      {/* ==================== Categories ==================== */}
      <div className="bg-white rounded-sm p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Handcrafts</h2>
        </div>
        {/* <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-0 border border-gray-100">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex flex-col items-center justify-center p-4 border-r border-b border-gray-100 hover:shadow-sm transition cursor-pointer bg-white ${
                activeCategory === cat.name ? "bg-rose-50 border-rose-200" : ""
              }`}
            >
              <div
                className={`h-14 w-14 rounded-full flex items-center justify-center mb-2 ${
                  activeCategory === cat.name
                    ? "bg-[#f43f5e] text-white"
                    : "bg-gray-50 text-[#f43f5e]"
                }`}
              >
                <Icon name={cat.icon} className="h-7 w-7" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div> */}
      </div>

      {/* ==================== Products Grid ==================== */}
      <div className="bg-white rounded-sm shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3 bg-gray-50">
          <h2 className="font-bold text-gray-800 text-lg">
            {activeCategory} Products
          </h2>
          <Link
            to="/all-products"
            className="text-xs font-semibold text-[#f43f5e] hover:text-[#e11d48]"
          >
            View All
          </Link>
        </div>

        {/* Loading */}
        {iS_product_data_loading && (
          <div className="p-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#f43f5e] border-r-transparent"></div>
            <p className="mt-3 text-gray-500">Loading products...</p>
          </div>
        )}

        {/* Error */}
        {pRODUCT_data_load_failed && (
          <div className="p-12 text-center">
            <Icon
              name="x-circle"
              className="h-12 w-12 text-rose-500 mx-auto mb-2"
            />
            <p className="text-rose-500 font-semibold">
              {pRODUCT_data_load_failed}
            </p>
          </div>
        )}

        {/* Empty */}
        {!iS_product_data_loading &&
          !pRODUCT_data_load_failed &&
          products.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <Icon name="box" className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No products found in {activeCategory}</p>
            </div>
          )}

        {/* Product Grid */}
        {!iS_product_data_loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
            {products.map((p) => {
              const firstVariant = p.variants?.[0];
              const price = firstVariant?.price || 0;
              const stock = firstVariant?.stock || 0;
              const attributes = firstVariant?.attributes || {};

              const primaryImage =
                p.images?.find((img) => img.is_primary) || p.images?.[0];

              const isOutOfStock = stock === 0;

              return (
                <div
                  key={p.id}
                  className="group border border-gray-100 rounded-sm p-3 hover:shadow-lg transition-all bg-white flex flex-col justify-between relative"
                >
                  {/* Image */}
                  <div
                    onClick={() => handleProductClick(p)}
                    className="h-40 bg-gray-100 rounded-sm mb-3 flex items-center justify-center text-gray-400 overflow-hidden relative cursor-pointer"
                  >
                    {primaryImage?.image ? (
                      <img
                        src={
                          primaryImage.image.startsWith("http")
                            ? primaryImage.image
                            : `http://127.0.0.1:8000${primaryImage.image}`
                        }
                        alt={p.p_name}
                        className="h-full w-full object-cover group-hover:scale-105 transition"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x300?text=No+Image";
                        }}
                      />
                    ) : (
                      <Icon name="image" className="h-12 w-12 opacity-30" />
                    )}

                    {stock > 0 ? (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        Stock: {stock}
                      </div>
                    ) : (
                      <div className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        Out of Stock
                      </div>
                    )}

                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 text-gray-400 hover:text-[#f43f5e] bg-white rounded-full p-1 shadow-sm"
                    >
                      <Icon name="heart" className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Info */}
                  <div
                    onClick={() => handleProductClick(p)}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                      {p.p_name}
                    </div>

                    {p.detail?.description && (
                      <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                        {p.detail.description}
                      </p>
                    )}

                    {Object.keys(attributes).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(attributes).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-sm"
                          >
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-2">
                      <span className="text-lg font-bold text-[#f43f5e]">
                        ৳{price}
                      </span>
                    </div>
                  </div>

                  {/* ==================== Buttons ==================== */}
                  <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">
                      {p.detail?.brand && p.detail.brand !== "None"
                        ? p.detail.brand
                        : activeCategory}
                    </span>
                  </div>

                  {/* Buy Now + Add to Cart */}
                  <div className="mt-2 flex gap-1.5">
                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(p, firstVariant)}
                      disabled={isOutOfStock}
                      className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 rounded-sm transition ${
                        isOutOfStock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Icon name="shopping-cart" className="h-3.5 w-3.5" />
                      Add
                    </button>

                    {/* Buy Now */}
                    <button
                      onClick={() => handleBuyNow(p, firstVariant)}
                      disabled={isOutOfStock}
                      className={`flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 rounded-sm transition ${
                        isOutOfStock
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-[#f43f5e] hover:bg-[#e11d48] text-white"
                      }`}
                    >
                      <Icon name="zap" className="h-3.5 w-3.5" />
                      Buy Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EcommerceHome);