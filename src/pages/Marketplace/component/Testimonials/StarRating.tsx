import React from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
    rating: number;
    className?: string;
  }

const StarRating: React.FC<StarRatingProps> = ({ rating, className = '' }) => {
    return (
      <div className={`flex gap-1 ${className}`}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating 
                ? 'fill-[#56B280] text-[#56B280]' 
                : 'fill-[#56B280]/20 text-[#56B280]/20'
            }`}
          />
        ))}
      </div>
    );
  };

export default StarRating