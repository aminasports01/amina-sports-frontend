"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Phone,
  User,
  Tag,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import { IProduct } from "@/types/products.type";
import { singleOrder } from "@/services/orders.service";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/order.store";
import { useProductStore } from "@/store/product.store";
import { trackBeginCheckout } from "../../shared/analytics/events";

interface BuyNowProps {
  product: IProduct;
}

/* ---------- Shared class names (global CSS variable based) ---------- */
// Label: 12px uppercase
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-subtitle";

const inputClass =
  "w-full rounded-md border border-input bg-muted/50 px-4 py-2.5 text-base text-foreground outline-none transition focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/10";

const BuyNow = ({ product }: BuyNowProps) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const hasTrackedCheckout = useRef(false);

  const selectedSize = useOrderStore((state) => state.selectedSize);
  const selectedColor = useProductStore((state) => state.selectedColor);

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    district: "",
    thana: "",
    address: "",
    note: "",
    isInsideDhaka: true,
  });

  // Delivery charge
  const shippingFee = form.isInsideDhaka ? 90 : 130;

  // Effective unit price
  const unitPrice =
    product.specialPrice && product.specialPrice > 0
      ? product.specialPrice
      : product.price;

  const hasDiscount =
    product.specialPrice &&
    product.specialPrice > 0 &&
    product.specialPrice < product.price;

  const discountAmount = hasDiscount ? product.price - unitPrice : 0;

  const subtotal = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const totalPrice = subtotal + shippingFee;

  useEffect(() => {
    if (!product) return;

    // Prevent duplicate begin_checkout
    if (hasTrackedCheckout.current) return;

    hasTrackedCheckout.current = true;

    trackBeginCheckout({
      value: totalPrice,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: Number(unitPrice),
          quantity,

          item_brand: product.brand || "",
          item_category: product.category?.name || "",
          item_variant: selectedColor
            ? `${selectedSize || ""} ${selectedColor}`.trim()
            : selectedSize || "",
          item_size: selectedSize || "",
          item_color: selectedColor || "",
        },
      ],
    });
  }, [product, totalPrice, unitPrice, quantity, selectedColor, selectedSize]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityIncrease = () => {
    if (quantity >= product.stock) {
      toast.error("Maximum stock limit reached!");
      return;
    }

    setQuantity((prev) => prev + 1);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error("Enter your name.");
      return false;
    }

    if (!form.phone.trim()) {
      toast.error("Enter your phone number.");
      return false;
    }

    if (!/^01\d{9}$/.test(form.phone.trim())) {
      toast.error("Phone number must be 11 digits long.");
      return false;
    }

    if (!form.district.trim()) {
      toast.error("Select or enter your district.");
      return false;
    }

    if (!form.thana.trim()) {
      toast.error("Enter your Thana.");
      return false;
    }

    if (!form.address.trim()) {
      toast.error("Enter your full address.");
      return false;
    }

    if (quantity <= 0) {
      toast.error("Please select at least 1 product.");
      return false;
    }

    if (product.stock <= 0) {
      toast.error("Sorry, this product is currently out of stock.");
      return false;
    }

    if (quantity > product.stock) {
      toast.error("Selected quantity exceeds available stock.");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity,
        name: form.name.trim(),
        phone: form.phone.trim(),
        district: form.district.trim(),
        thana: form.thana.trim(),
        address: form.address.trim(),
        note: form.note.trim() || undefined,
        isInsideDhaka: form.isInsideDhaka,
        unitPrice,
        totalPrice,
      };

      const res = await singleOrder(payload);

      if (res?.data?.success) {
        toast.success("Order placed successfully!");
      }

      // order form backend response
      const orderId = res?.data?.id;

      if (orderId) {
        router.push(`/thank-you?orderId=${orderId}`);
      } else {
        toast.error("Order ID not found.");
      }

      setForm({
        name: "",
        phone: "",
        district: "",
        thana: "",
        address: "",
        note: "",
        isInsideDhaka: true,
      });

      setQuantity(1);
    } catch (error) {
      console.error("ORDER ERROR:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted md:py-12">
      <div className="container mx-auto max-w-7xl  sm:px-6">
        {/* PAGE HEADER */}
        {/* <div className="mb-6 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="h-4 w-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-title md:text-3xl">
              Complete Order
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Please fill in the details below correctly to confirm your order.
          </p>
        </div> */}

        {/* =====================================================
            SINGLE UNIFIED MAIN CARD CONTAINER
        ====================================================== */}
        <div className="overflow-hidden md:rounded-md md:border border-border bg-card text-card-foreground shadow-sm">
          <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-12 lg:divide-x lg:divide-y-0">
            {/* =====================================================
                LEFT SIDE - ORDER SUMMARY (5 COLS)
            ====================================================== */}
            <div className="bg-muted/50 p-3 sm:p-6 lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="mb-4 text-base font-semibold text-title border-b border-border pb-3">
                  Order Summary
                </h2>

                {/* PRODUCT ITEM */}
                <div className="flex gap-4 rounded-md border border-border bg-card p-3.5 shadow-2xs">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-semibold text-title">
                        {product.name}
                      </h3>
                      {product.brand && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Brand: {product.brand}
                        </p>
                      )}
                      {selectedSize && (
                        <p className="mt-1 text-sm text-body">
                          Size:{" "}
                          <span className="font-semibold text-title">
                            {selectedSize}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* PRICE & DISCOUNT */}
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-base font-bold text-primary">
                        ৳{unitPrice.toLocaleString()}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-muted-foreground line-through font-normal">
                          ৳{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* DISCOUNT BADGE */}
                {hasDiscount && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-1.5 text-sm text-success font-medium border border-success/20">
                    <Tag className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      Save ৳{(discountAmount * quantity).toLocaleString()} on
                      this product!
                    </span>
                  </div>
                )}

                {/* QUANTITY PICKER */}
                <div className="mt-4 rounded-md border border-border bg-card p-3.5 flex items-center justify-between shadow-2xs">
                  <div>
                    <p className="text-sm font-medium text-subtitle">
                      Quantity
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Available Stock: {product.stock} pcs
                    </p>
                  </div>

                  <div className="flex items-center rounded-lg border border-border bg-card shadow-2xs">
                    <button
                      type="button"
                      onClick={handleQuantityDecrease}
                      disabled={quantity <= 1 || loading}
                      className="flex h-8 w-8 items-center justify-center text-body transition hover:bg-button-hover-1 hover:text-button-hover-1-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <span className="flex h-8 w-9 items-center justify-center border-x border-border text-sm font-bold text-foreground">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleQuantityIncrease}
                      disabled={loading || quantity >= product.stock}
                      className="flex h-8 w-8 items-center justify-center text-body transition hover:bg-button-hover-1 hover:text-button-hover-1-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* CALCULATION BREAKDOWN */}
                <div className="mt-5 space-y-2.5 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-body">
                    <span>Product Price</span>
                    <span className="font-semibold text-foreground">
                      ৳{unitPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-body">
                    <span>Quantity</span>
                    <span className="font-semibold text-foreground">
                      × {quantity}
                    </span>
                  </div>

                  <div className="flex justify-between text-body">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-body">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-foreground">
                      ৳{shippingFee.toLocaleString()}
                    </span>
                  </div>

                  {/* TOTAL */}
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-base font-bold text-title">
                      Total
                    </span>
                    <span className="text-xl font-extrabold text-primary">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="space-y-2.5 rounded-md border border-border bg-card p-3.5">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-body">
                    Fast Delivery Across Bangladesh
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                  <span className="text-sm text-body">
                    Cash on Delivery (Pay After Receiving)
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================
                RIGHT SIDE - CHECKOUT FORM (7 COLS)
            ====================================================== */}
            <div className="p-3 sm:p-6 lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-title">
                    Delivery Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Please provide your full name and detailed address.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* NAME */}
                <div>
                  <label className={labelClass}>
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Example: Md. Rahim Uddin"
                    className={inputClass}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className={labelClass}>
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 11) {
                          setForm((prev) => ({ ...prev, phone: value }));
                        }
                      }}
                      placeholder="017XXXXXXXX"
                      maxLength={11}
                      inputMode="numeric"
                      className={inputClass}
                    />
                    <Phone className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enter a valid 11-digit mobile number.
                  </p>
                </div>

                {/* DISTRICT + THANA */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>
                      District <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      placeholder="Example: Dhaka / Rajshahi"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Thana <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      name="thana"
                      value={form.thana}
                      onChange={handleChange}
                      placeholder="Example: Mirpur / Boalia"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div>
                  <label className={labelClass}>
                    Full Address <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Enter house number, road number, and area name..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* DELIVERY AREA SELECTOR */}
                <div>
                  <label className={`${labelClass} !mb-2`}>Delivery Area</label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, isInsideDhaka: true }))
                      }
                      className={`relative flex items-center gap-3 rounded-md border p-3.5 text-left transition ${
                        form.isInsideDhaka
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-card hover:border-input"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          form.isInsideDhaka
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input"
                        }`}
                      >
                        {form.isInsideDhaka && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Inside Dhaka
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Delivery Charge:{" "}
                          <span className="font-bold text-title">৳90</span>
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, isInsideDhaka: false }))
                      }
                      className={`relative flex items-center gap-3 rounded-md border p-3.5 text-left transition ${
                        !form.isInsideDhaka
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-card hover:border-input"
                      }`}
                    >
                      <div
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                          !form.isInsideDhaka
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input"
                        }`}
                      >
                        {!form.isInsideDhaka && (
                          <CheckCircle2 className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Outside Dhaka
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Delivery Charge:{" "}
                          <span className="font-bold text-title">৳130</span>
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* NOTE */}
                <div>
                  <label className={labelClass}>
                    Additional Notes{" "}
                    <span className="text-xs font-normal normal-case text-muted-foreground">
                      (Optional)
                    </span>
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Write any special instructions about the product or delivery..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* =====================================================
                  SINCERE NOTICE ABOUT FAKE ORDERS (HIGHLIGHTED)
              ====================================================== */}
              <div
                className="rounded-md border border-l-4 p-4"
                style={{
                  backgroundColor: "#fff7e0",
                  color: "#4a3200",
                  borderColor: "#f3d98a",
                  borderLeftColor: "#d99a00",
                }}
              >
                <div className="flex gap-3">
                  <AlertCircle
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "#d99a00" }}
                  />
                  <div className="space-y-1 text-sm leading-relaxed">
                    <p className="font-bold">
                      অনুগ্রহ করে নিশ্চিত হয়েই অর্ডার করুন।
                    </p>
                    <p className="opacity-90">
                      আপনার প্রতিটি অর্ডারের জন্য আমরা সময়, শ্রম ও প্যাকেজিং
                      খরচ ব্যয় করি। তাই অনুরোধ করছি, পণ্যটি কেনার বিষয়ে
                      নিশ্চিত হয়ে অর্ডার কনফার্ম করুন। আপনার আন্তরিকতা আমাদের
                      ব্যবসাকে এগিয়ে নিতে সাহায্য করবে। ধন্যবাদ!
                    </p>
                  </div>
                </div>
              </div>

              {/* ORDER SUBMIT BUTTON */}
              <button
                type="button"
                onClick={handleOrder}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-button px-5 py-3.5 text-base font-bold text-button-text shadow-md shadow-primary/20 transition hover:bg-button-hover focus:ring-2 focus:ring-ring/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span>Processing your order...</span>
                ) : (
                  <span>Confirm Order — ৳{totalPrice.toLocaleString()}</span>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                By confirming your order, you agree to our{" "}
                <Link
                  href="/terms-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-link underline underline-offset-2 hover:text-link-hover"
                >
                  Terms and Conditions
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
