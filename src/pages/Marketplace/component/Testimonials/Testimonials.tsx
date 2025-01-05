import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.5,
    quote: "I love it! No more air fresheners",
    author: "Luisa"
  },
  {
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5,
    quote: "Raccomended for everyone",
    author: "Edoardo"
  },
  {
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.5,
    quote: "Looks very natural, the smell is awesome",
    author: "Mart"
  }
];

const Testimonials:React.FC = () => {
  return (
    <section className="py-20 bg-[#e9f3ee] ">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#1D252C] text-4xl font-medium mb-4">
            Testimonials
          </h2>
          <p className="text-[#1D252C]/60 text-lg">
            Some quotes from our happy customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;