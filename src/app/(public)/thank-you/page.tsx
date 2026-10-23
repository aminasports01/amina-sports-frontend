import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

import DownloadOrderButton from "@/components/layouts/public/Thankyou/DownloadOrderButton";
import PurchaseEvent from "@/components/layouts/shared/analytics/PurchaseEvent";

interface PageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  size?: string;
  color?: string;
  product: {
    thumbnail: string;
    category?: string;
    brand?: string;
    variant?: string;
    specialPrice?: number;
    price: number;
  };
}

interface Order {
  id: string;
  userId?: string;
  total: number;
  totalAmount: number;
  status: string;
  name: string;
  phone: string;
  district: string;
  thana: string;
  address: string;
  note: string | null;
  isInsideDhaka: boolean;
  shippingFee: number;
  createdAt: string;
  items: OrderItem[];
}

const API_URL = process.env.NEXT_PUBLIC_BASE_API;

const getSingleOrder = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error("Failed to fetch order:", error);

    return null;
  }
};

const getUnitPrice = (item: OrderItem) => {
  const special = Number(item.product.specialPrice);
  const regular = Number(item.product.price);

  return special > 0 && special < regular ? special : regular;
};

const EmptyOrderState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <Package className="h-7 w-7 text-muted-foreground" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-title">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Link>
      </div>
    </main>
  );
};

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <EmptyOrderState
        title="Order Information Not Found"
        description="Sorry, no order ID was provided."
      />
    );
  }

  const order = await getSingleOrder(orderId);

  if (!order) {
    return (
      <EmptyOrderState
        title="Order Not Found"
        description="No records found for the provided order ID."
      />
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subtotal = Number(order.total) - Number(order.shippingFee);

  return (
    <main className="min-h-screen bg-muted py-8 sm:py-12">
      <PurchaseEvent
        transactionId={order.id}
        value={Number(order.total)}
        shipping={Number(order.shippingFee)}
        items={order.items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          category:
            typeof item.product.category === "string"
              ? item.product.category
              : "",
          brand: item.product.brand || "",
          variant: `${item.size || ""} ${item.color || ""}`.trim(),
          size: item.size || "",
          color: item.color || "",
        }))}
        customer={{
          first_name: order.name,
          phone: order.phone,
          address: order.address,
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* SUCCESS */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-title sm:text-3xl">
            Order Placed Successfully
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            ধন্যবাদ! আপনার অর্ডারটি আমরা পেয়েছি। খুব শীঘ্রই আমাদের প্রতিনিধি
            আপনাকে ফোন করে অর্ডারটি নিশ্চিত করবেন।
          </p>
        </div>

        {/* MAIN ORDER CARD */}
        <div
          id="order-receipt"
          className="overflow-hidden rounded-sm border border-border bg-card text-card-foreground shadow-sm"
        >
          {/* ORDER HEADER */}
          <div className="border-b border-border px-5 py-5 sm:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Order ID
                </p>

                <p className="mt-1 break-all text-sm font-bold text-title">
                  #{order.id}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  {formattedDate}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1.5 font-semibold text-warning">
                  <Clock3 className="h-3.5 w-3.5" />
                  {order.status}
                </span>
              </div>
            </div>
          </div>

          {/* CUSTOMER / DELIVERY */}
          <div className="grid border-b border-border sm:grid-cols-2">
            {/* CUSTOMER */}
            <div className="border-b border-border p-5 sm:border-b-0 sm:border-r sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Customer Information
                </h2>
              </div>

              <p className="text-sm font-semibold text-title">{order.name}</p>

              <div className="mt-2 flex items-center gap-2 text-sm text-body">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {order.phone}
              </div>
            </div>

            {/* DELIVERY */}
            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />

                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Delivery Address
                </h2>
              </div>

              <p className="text-sm font-medium leading-6 text-foreground">
                {order.address}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {order.thana}, {order.district}
              </p>

              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Truck className="h-3.5 w-3.5" />

                {order.isInsideDhaka
                  ? "Inside Dhaka • ৳90"
                  : "Outside Dhaka • ৳130"}
              </div>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="px-5 py-6 sm:px-7 sm:py-7">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-bold text-title">Ordered Products</h2>

              <span className="text-xs text-muted-foreground">
                {order.items.length} products
              </span>
            </div>

            <div className="divide-y divide-border">
              {order.items.map((item) => {
                const unitPrice = getUnitPrice(item);

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    {/* IMAGE */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:h-20 sm:w-20">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>

                    {/* INFO */}
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-title">
                        {item.name}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span>
                          ৳{unitPrice.toLocaleString()} × {item.quantity}
                        </span>

                        {item.size && <span>Size: {item.size}</span>}

                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                    </div>

                    {/* PRICE */}
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-title sm:text-base">
                        ৳{(unitPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NOTE */}
          {order.note && (
            <div className="mx-5 mb-6 border-l-2 border-input bg-muted px-4 py-3 sm:mx-7">
              <div className="flex items-center gap-2 text-xs font-semibold text-body">
                <FileText className="h-4 w-4" />
                Order Note
              </div>

              <p className="mt-1.5 text-sm leading-6 text-body">{order.note}</p>
            </div>
          )}

          {/* SUMMARY */}
          <div className="border-t border-border bg-muted/50 px-5 py-6 sm:px-7">
            <div className="ml-auto max-w-sm space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Product Price</span>

                <span className="font-medium text-subtitle">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery Charge</span>

                <span className="font-medium text-subtitle">
                  ৳{Number(order.shippingFee).toLocaleString()}
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-title">Total</span>

                  <span className="text-2xl font-extrabold tracking-tight text-primary">
                    ৳{Number(order.total).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TRUST */}
          <div className="flex items-center justify-center gap-2 border-t border-border px-5 py-4 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-success" />
            Your order has been securely saved.
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col items-center gap-4 print:hidden">
          <DownloadOrderButton />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-title"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
