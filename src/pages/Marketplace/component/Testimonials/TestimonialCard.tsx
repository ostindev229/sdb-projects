import React from 'react';
import StarRating from './StarRating';
interface TestimonialCardProps {
  image: string;
  rating: number;
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ image, rating, quote, author }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <img 
          src={image} 
          alt={author} 
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <StarRating rating={rating} className="flex justify-center mb-4" />
      <p className="text-[#1D252C] text-lg font-medium mb-2">"{quote}"</p>
      <p className="text-[#1D252C]/60">{author}</p>
    </div>
  );
}

export default TestimonialCard;