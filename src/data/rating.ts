/* =========================================================
   DEMO REVIEWS — শুধু ডিজাইন/টেস্টের জন্য
   ⚠️ সাইট চালুর আগে এগুলো আসল কাস্টমারের রিভিউ দিয়ে বদলে নিন।
   ফাইলের জায়গা: src/data/rating.ts   (import: "@/data/rating")
========================================================= */

export interface DemoReview {
  id: string;
  userName: string;
  rating: number; // 1 - 5
  comment: string;
  createdAt: string; // ISO format
}

export const demoReviews: DemoReview[] = [
  {
    id: "r1",
    userName: "Rahim Uddin",
    rating: 5,
    comment:
      "ছবির থেকে হাতে পাওয়ার পর জুতাটা আরও ভালো লেগেছে। খুব বেশি ভারী না এবং হাঁটার সময় বেশ comfortable।",
    createdAt: "2026-10-12",
  },
  {
    id: "r2",
    userName: "Nusrat Jahan",
    rating: 5,
    comment:
      "Looks even better in real life. I wear it every day and my feet feel good. Thank you!",
    createdAt: "2026-10-15",
  },
  {
    id: "r3",
    userName: "Tanvir Hasan",
    rating: 4,
    comment:
      "জুতাটা হাতে পাওয়ার পর কোয়ালিটি দেখে ভালো লেগেছে। পায়ে ফিটিং ভালো এবং দৈনন্দিন ব্যবহারের জন্য বেশ আরামদায়ক।",
    createdAt: "2026-10-18",
  },
  {
    id: "r4",
    userName: "Sadia Akter",
    rating: 5,
    comment:
      "They called me to confirm the order and the delivery was on time. Packing was very good.",
    createdAt: "2026-10-22",
  },
  {
    id: "r5",
    userName: "Mahmud Hasan",
    rating: 4,
    comment:
      "Nice design and comfortable. It was a bit tight at first, so I suggest taking one size up.",
    createdAt: "2026-10-27",
  },
];

/* ---------- Rating summary (গড় ও মোট সংখ্যা) ---------- */

export const getRatingSummary = (items: { rating: number }[] = demoReviews) => {
  const count = items.length;
  const average = count
    ? items.reduce((sum, review) => sum + review.rating, 0) / count
    : 0;

  return { average, count };
};
