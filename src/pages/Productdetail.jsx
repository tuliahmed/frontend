import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Fetch_Product_Detail,
  Clear_Product_Detail_Data,
  Fetch_Create_Order,
  Clear_Order_Data,
} from "../reduxstore/Actioncreator.jsx";
import { Alert } from "../Alert/Alert.jsx";

// ==================== Redux connect ====================
const mapStateToProps = (state) => ({
  a_token: state.Auth_Reducer.a_token,
  r_token: state.Auth_Reducer.r_token,
  userId: state.Auth_Reducer.userId,
  iS_product_detail_data_loading:
    state.productReducer.iS_product_detail_data_loading,
  pRODUCT_detail_data_load_success:
    state.productReducer.pRODUCT_detail_data_load_success,
  pRODUCT_detail_data_load_failed:
    state.productReducer.pRODUCT_detail_data_load_failed,
  iS_order_data_loading: state.productReducer.iS_order_data_loading,
  oRDER_data_load_success: state.productReducer.oRDER_data_load_success,
  oRDER_data_load_failed: state.productReducer.oRDER_data_load_failed,
});

const mapDispatchToProps = (dispatch) => ({
  Fetch_Product_Detail: (id, token) =>
    dispatch(Fetch_Product_Detail(id, token)),
  Clear_Product_Detail_Data: () => dispatch(Clear_Product_Detail_Data()),

  // ✅ customerId বাদ + phoneNumber + note add
  Fetch_Create_Order: (obj, token) => dispatch(Fetch_Create_Order(obj, token)),

  Clear_Order_Data: () => dispatch(Clear_Order_Data()),
});

// ==================== Main Component ====================
function Productdetail(props) {
  const {
    a_token,
    r_token,
    userId,
    Fetch_Product_Detail,
    Clear_Product_Detail_Data,
    Fetch_Create_Order,
    Clear_Order_Data,
    iS_product_detail_data_loading,
    pRODUCT_detail_data_load_success,
    pRODUCT_detail_data_load_failed,
    iS_order_data_loading,
    oRDER_data_load_success,
    oRDER_data_load_failed,
  } = props;

  const { id } = useParams();
  const navigate = useNavigate();

  // ==================== State ====================
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // ✅ Order Modal
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");

  // ==================== Fetch product ====================
  useEffect(() => {
    if (id) Fetch_Product_Detail(id, a_token);
    return () => Clear_Product_Detail_Data();
  }, [id, a_token]);

  // ==================== Default image + variant ====================
  useEffect(() => {
    if (pRODUCT_detail_data_load_success) {
      const product = pRODUCT_detail_data_load_success;
      setQuantity(1);

      const primary =
        product.images?.find((i) => i.is_primary)?.image ||
        product.images?.[0]?.image ||
        null;
      setSelectedImage(primary);

      setSelectedVariant(product.variants?.[0] || null);
    }
  }, [pRODUCT_detail_data_load_success]);

  // ==================== Quantity handlers ====================
  const increaseQty = () => {
    if (selectedVariant && quantity < selectedVariant.stock) {
      setQuantity((q) => q + 1);
    }
  };
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  // ==================== Handlers ====================
  const handleAddToCart = () => {
    if (!selectedVariant) {
      Alert("warning", "Please select a variant", "Thank You");
      return;
    }
    if (!a_token) {
      Alert("warning", "Please Login First", "Thank You");
      navigate("/login");
      return;
    }
    console.log("Add to Cart:", {
      product_id: pRODUCT_detail_data_load_success.id,
      variant_id: selectedVariant.id,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      Alert("warning", "Please select a variant", "Thank You");
      return;
    }
    if (!a_token) {
      Alert("warning", "Please Login First", "Thank You");
      navigate("/login");
      return;
    }
    setShowOrderModal(true);
  };

  // ✅ Fixed: phoneNumber + note API-তে পাঠানো হচ্ছে, customerId বাদ
  const handlePlaceOrder = () => {
    // Validation
    if (!deliveryAddress.trim()) {
      Alert("warning", "Please enter delivery address", "Thank You");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 11) {
      Alert("warning", "Please enter valid 11-digit phone number", "Thank You");
      return;
    }
    if (!selectedVariant) {
      Alert("warning", "No variant selected", "Thank You");
      return;
    }

    const totalAmount = currentPrice * quantity;
    const orderItems = [
      {
        variant: selectedVariant.id,
        quantity: quantity,
        price_at_sale: currentPrice,
      },
    ];

    // ✅ পুরো obj বানাও
    const orderData = {
      total_amount: totalAmount,
      payment_by: "cash",
      delivery_address: deliveryAddress,
      phone_number: phoneNumber,
      note: note || "",
      ordritem: orderItems,
    };

    console.log("📤 Sending Order:", orderData);

    // ✅ শুধু obj + token পাঠাও
    Fetch_Create_Order(orderData, a_token);
  };

  // ==================== Order success / fail ====================
  useEffect(() => {
    if (oRDER_data_load_success) {
      Alert(
        "success",
        `Order placed successfully! Order ID: ${oRDER_data_load_success.order_id}`,
        "Thank You",
      );
      Clear_Order_Data();
      setShowOrderModal(false);
      setDeliveryAddress("");
      setPhoneNumber("");
      setNote("");
    }
    if (oRDER_data_load_failed) {
      Alert("error", oRDER_data_load_failed, "Failed");
      Clear_Order_Data();
    }
  }, [oRDER_data_load_success, oRDER_data_load_failed]);

  // ==================== Loading ====================
  if (iS_product_detail_data_loading) {
    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-sm shadow-sm p-16 text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#f43f5e] border-r-transparent"></div>
          <p className="mt-4 text-gray-500 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  // ==================== Error ====================
  if (pRODUCT_detail_data_load_failed) {
    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-sm shadow-sm p-16 text-center">
          <Icon
            name="x-circle"
            className="h-14 w-14 text-rose-500 mx-auto mb-3"
          />
          <p className="text-rose-500 font-semibold mb-3">
            {pRODUCT_detail_data_load_failed}
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-[#f43f5e] hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!pRODUCT_detail_data_load_success) return null;

  const product = pRODUCT_detail_data_load_success;
  const currentPrice = selectedVariant?.price ?? 0;
  const originalPrice = Math.round(currentPrice * 1.5);
  const discountPercent = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100,
  );
  const brandText =
    product.detail?.brand && product.detail.brand.toLowerCase() !== "none"
      ? product.detail.brand
      : null;
  const warrantyText =
    product.detail?.warranty && product.detail.warranty.toLowerCase() !== "none"
      ? product.detail.warranty
      : null;
  const isOutOfStock = !selectedVariant || selectedVariant.stock <= 0;

  return (
    <div className="w-full space-y-4 p-4 bg-gray-50 min-h-screen">
      {/* ==================== Breadcrumb ==================== */}
      <div className="bg-white rounded-sm shadow-sm px-4 py-2.5 text-xs text-gray-600 flex flex-wrap items-center gap-1.5">
        <Link to="/" className="hover:text-[#f43f5e] transition">
          Home
        </Link>
        <span className="text-gray-400">›</span>
        <Link
          to="/category/Handcrafts"
          className="hover:text-[#f43f5e] transition"
        >
          Handcrafts
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800 font-medium truncate">
          {product.p_name}
        </span>
      </div>

      {/* ==================== Main Grid ==================== */}
      <div className="grid grid-cols-12 gap-4">
        {/* 🔸 LEFT — Image Gallery */}
        <div className="col-span-12 md:col-span-5 bg-white rounded-sm shadow-sm p-4">
          <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-sm overflow-hidden relative group">
            {selectedImage ? (
              <img
                src={
                  selectedImage.startsWith("http")
                    ? selectedImage
                    : `http://127.0.0.1:8000${selectedImage}`
                }
                alt={product.p_name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            ) : (
              <Icon name="image" className="h-16 w-16 text-gray-300" />
            )}

            {selectedVariant && (
              <div
                className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-sm shadow-sm ${
                  selectedVariant.stock > 0 ? "bg-emerald-500" : "bg-gray-500"
                }`}
              >
                {selectedVariant.stock > 0
                  ? `✓ Stock: ${selectedVariant.stock}`
                  : "Out of Stock"}
              </div>
            )}

            <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-500 hover:text-[#f43f5e] rounded-full p-2 shadow-sm transition">
              <Icon name="heart" className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex items-center justify-between mt-4 gap-2">
              <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <Icon name="chevron-left" className="h-4 w-4 text-gray-600" />
              </button>
              <div className="flex gap-2 overflow-x-auto px-1">
                {product.images.map((img) => (
                  <img
                    key={img.id}
                    src={
                      img.image.startsWith("http")
                        ? img.image
                        : `http://127.0.0.1:8000${img.image}`
                    }
                    alt="thumb"
                    onClick={() => setSelectedImage(img.image)}
                    className={`w-16 h-16 object-cover rounded-sm border-2 cursor-pointer flex-shrink-0 transition ${
                      selectedImage === img.image
                        ? "border-[#f43f5e] shadow-sm"
                        : "border-gray-200 hover:border-[#f43f5e]"
                    }`}
                  />
                ))}
              </div>
              <button className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <Icon name="chevron-right" className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* 🔸 MIDDLE — Product Info */}
        <div className="col-span-12 md:col-span-7 bg-white rounded-sm shadow-sm p-5">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 leading-snug">
            {product.p_name}
          </h1>

          <div className="flex justify-between items-center mt-2 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-yellow-500 text-base">★★★★☆</span>
              <span className="text-[#f43f5e] hover:underline cursor-pointer font-medium">
                No Ratings
              </span>
            </div>
            <div className="flex gap-3 text-gray-500">
              <button title="Share" className="hover:text-[#f43f5e] transition">
                <Icon name="share-2" className="h-4 w-4" />
              </button>
            </div>
          </div>

          {brandText && (
            <div className="mt-3 text-xs">
              <span className="text-gray-500">Brand:</span>{" "}
              <span className="text-[#f43f5e] hover:underline cursor-pointer font-medium">
                {brandText}
              </span>
            </div>
          )}

          <div className="mt-4 bg-gradient-to-r from-[#f43f5e] to-[#e11d48] text-white rounded-sm px-4 py-3 flex justify-between items-center shadow-sm">
            <span className="font-bold text-sm tracking-wide">SHOP NOW!</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold">10.10</span>
              <span className="text-[10px] bg-yellow-400 text-black px-2 py-0.5 rounded-sm font-bold">
                SHOPPING FEST
              </span>
            </div>
          </div>

          <div className="mt-4 pb-4 border-b border-gray-100">
            <div className="flex items-baseline gap-3">
              <span className="text-[#f43f5e] text-3xl font-bold">
                ৳ {currentPrice}
              </span>
              {discountPercent > 0 && (
                <>
                  <span className="text-gray-400 line-through text-sm">
                    ৳ {originalPrice}
                  </span>
                  <span className="text-gray-600 text-xs font-medium bg-gray-100 px-2 py-0.5 rounded-sm">
                    -{discountPercent}%
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600 font-medium">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden">
              <button
                onClick={decreaseQty}
                disabled={quantity <= 1}
                className={`px-3 py-1.5 text-lg transition ${
                  quantity <= 1
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                −
              </button>
              <span className="px-4 py-1.5 text-sm font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                disabled={quantity >= (selectedVariant?.stock || 0)}
                className={`px-3 py-1.5 text-lg transition ${
                  quantity >= (selectedVariant?.stock || 0)
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                +
              </button>
            </div>
            {selectedVariant && (
              <span className="text-xs text-gray-500">
                {selectedVariant.stock} available
              </span>
            )}
          </div>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 font-medium mb-2">Variant:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock <= 0}
                    className={`px-3 py-1.5 border rounded-sm text-xs font-medium transition ${
                      selectedVariant?.id === v.id
                        ? "border-[#f43f5e] bg-rose-50 text-[#f43f5e]"
                        : "border-gray-200 text-gray-700 hover:border-[#f43f5e]"
                    } ${
                      v.stock <= 0
                        ? "opacity-40 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {v.sku}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Attributes */}
          {selectedVariant?.attributes &&
            Object.keys(selectedVariant.attributes).length > 0 && (
              <div className="mt-3 bg-gray-50 rounded-sm p-3 text-xs">
                <p className="font-semibold text-gray-700 mb-1.5">Details:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedVariant.attributes).map(
                    ([key, val]) => (
                      <span
                        key={key}
                        className="bg-white text-gray-600 px-2 py-1 rounded-sm border border-gray-200"
                      >
                        <span className="font-medium">{key}:</span> {val}
                      </span>
                    ),
                  )}
                </div>
              </div>
            )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock || iS_order_data_loading}
              className={`font-semibold py-3 rounded-sm text-white transition text-sm flex items-center justify-center gap-1.5 ${
                isOutOfStock || iS_order_data_loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600 shadow-sm hover:shadow"
              }`}
            >
              {iS_order_data_loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Placing Order...
                </>
              ) : (
                <>
                  <Icon name="zap" className="h-4 w-4" />
                  Buy Now
                </>
              )}
            </button>
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`font-semibold py-3 rounded-sm text-white transition text-sm flex items-center justify-center gap-1.5 ${
                isOutOfStock
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#f43f5e] hover:bg-[#e11d48] shadow-sm hover:shadow"
              }`}
            >
              <Icon name="shopping-cart" className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* ==================== Delivery / Seller ==================== */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 bg-white rounded-sm shadow-sm p-4 text-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700 text-sm">
              Delivery Options
            </span>
            <Icon name="info" className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-start gap-2">
            <Icon name="map-pin" className="h-4 w-4 text-gray-500 mt-0.5" />
            <p className="text-gray-600 flex-1">Dhaka, Dhaka North, Banani</p>
            <button className="text-[#f43f5e] text-[11px] font-medium">
              CHANGE
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Icon name="truck" className="h-4 w-4 text-gray-500" />
              <div>
                <p className="font-medium text-gray-700">Standard Delivery</p>
                <p className="text-[10px] text-gray-500">
                  Guaranteed by 14-17 Oct
                </p>
              </div>
            </div>
            <span className="font-semibold text-gray-800">৳ 90</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="dollar-sign" className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">Cash on Delivery Available</span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-sm shadow-sm p-4 text-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700 text-sm">
              Return & Warranty
            </span>
            <Icon name="info" className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <Icon name="rotate-ccw" className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">14 days easy return</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="shield" className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {warrantyText
                ? `Warranty: ${warrantyText}`
                : "Warranty not available"}
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white rounded-sm shadow-sm p-4 text-xs space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Sold by</p>
              <p className="text-[#f43f5e] font-semibold text-sm">
                Glow house Beauty
              </p>
            </div>
            <button className="text-sky-500 text-[11px] font-medium flex items-center gap-1">
              <Icon name="message-circle" className="h-3.5 w-3.5" />
              Chat Now
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-500">
                Positive Seller Ratings
              </p>
              <p className="font-bold text-gray-800 text-sm">91%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Ship on Time</p>
              <p className="font-bold text-gray-800 text-sm">100%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Chat Response</p>
              <p className="text-[10px] text-gray-400">Not enough data</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Description ==================== */}
      {product.detail?.description && (
        <div className="bg-white rounded-sm shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            Product Description
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {product.detail.description}
          </p>
        </div>
      )}

      {/* ====================================================
          🎯 ORDER MODAL — Cash on Delivery Only
      ==================================================== */}
      {showOrderModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => !iS_order_data_loading && setShowOrderModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ===== Header ===== */}
            <div className="flex justify-between items-center px-5 py-4 border-b bg-gradient-to-r from-[#f43f5e] to-[#e11d48]">
              <div className="flex items-center gap-2">
                <Icon name="shopping-bag" className="h-5 w-5 text-white" />
                <h2 className="font-bold text-white text-base">
                  Order Confirmation
                </h2>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                disabled={iS_order_data_loading}
                className="text-white/80 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* ===== Body ===== */}
            <div className="p-5 space-y-5 overflow-y-auto flex-1">
              {/* Product Summary */}
              <div className="flex gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                {selectedImage && (
                  <img
                    src={
                      selectedImage.startsWith("http")
                        ? selectedImage
                        : `http://127.0.0.1:8000${selectedImage}`
                    }
                    alt="product"
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm line-clamp-2">
                    {product.p_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Variant:{" "}
                    <span className="font-medium">{selectedVariant?.sku}</span>
                  </p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-[#f43f5e] font-bold">
                      ৳ {currentPrice}
                    </span>
                    <span className="text-xs text-gray-500">× {quantity}</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 font-medium mb-2">
                  <Icon name="hash" className="h-3.5 w-3.5 text-gray-400" />
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <button
                      onClick={decreaseQty}
                      disabled={quantity <= 1}
                      className={`px-3 py-2 text-base transition ${
                        quantity <= 1
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold min-w-[45px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQty}
                      disabled={quantity >= (selectedVariant?.stock || 0)}
                      className={`px-3 py-2 text-base transition ${
                        quantity >= (selectedVariant?.stock || 0)
                          ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {selectedVariant?.stock} available
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 font-medium mb-2">
                  <Icon name="map-pin" className="h-3.5 w-3.5 text-gray-400" />
                  Delivery Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House / Road / Area / City..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/20 focus:border-[#f43f5e] transition resize-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 font-medium mb-2">
                  <Icon name="phone" className="h-3.5 w-3.5 text-gray-400" />
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setPhoneNumber(val);
                  }}
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/20 focus:border-[#f43f5e] transition"
                />
              </div>

              {/* Note */}
              <div>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 font-medium mb-2">
                  <Icon
                    name="message-square"
                    className="h-3.5 w-3.5 text-gray-400"
                  />
                  Note{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any special instruction..."
                  className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f43f5e]/20 focus:border-[#f43f5e] transition"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="flex items-center gap-1.5 text-sm text-gray-700 font-medium mb-2">
                  <Icon
                    name="credit-card"
                    className="h-3.5 w-3.5 text-gray-400"
                  />
                  Payment Method
                </label>
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-md p-3.5">
                  <div className="h-10 w-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Icon name="banknote" className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-800 text-sm">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      Pay when you receive the product
                    </p>
                  </div>
                  <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Icon name="check" className="h-3 w-3 text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 flex items-center gap-1">
                  <Icon name="info" className="h-3 w-3" />
                  Only Cash on Delivery is currently available
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-md p-4 border border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>৳ {currentPrice * quantity}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="border-t border-dashed border-gray-300 pt-2 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-800">
                    Total
                  </span>
                  <span className="text-[#f43f5e] text-xl font-bold">
                    ৳ {currentPrice * quantity}
                  </span>
                </div>
              </div>
            </div>

            {/* ===== Footer ===== */}
            <div className="border-t px-5 py-4 flex gap-3 bg-gray-50">
              <button
                onClick={() => setShowOrderModal(false)}
                disabled={iS_order_data_loading}
                className="flex-1 py-3 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-white transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={
                  iS_order_data_loading ||
                  !deliveryAddress.trim() ||
                  phoneNumber.length !== 11
                }
                className={`flex-1 py-3 rounded-md text-sm font-semibold text-white transition flex items-center justify-center gap-2 shadow-sm ${
                  iS_order_data_loading ||
                  !deliveryAddress.trim() ||
                  phoneNumber.length !== 11
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#f43f5e] to-[#e11d48] hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                {iS_order_data_loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Icon name="check-circle" className="h-4 w-4" />
                    Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Productdetail);
