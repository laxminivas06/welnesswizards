import React from 'react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  image,
  category,
  categoryColor,
}) => {
  const handleLearnMore = () => {
    // In a real app, this would navigate to a detailed view
    alert(`You clicked to learn more about: ${title}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-md card-hover"
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-40 object-cover"
      />
      <div className="p-5">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColor} mb-3`}>
          {category}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <button 
          className="text-primary font-medium hover:underline focus:outline-none"
          onClick={handleLearnMore}
        >
          Learn more
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;