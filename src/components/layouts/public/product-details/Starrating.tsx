import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
}

// ৫টা তারা, rating অনুযায়ী ভরা (server ও client দুই জায়গাতেই চলবে)
export default function StarRating({ rating, size = 16 }: StarRatingProps) {
  const filled = Math.round(rating || 0);

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rating: ${(rating || 0).toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}
