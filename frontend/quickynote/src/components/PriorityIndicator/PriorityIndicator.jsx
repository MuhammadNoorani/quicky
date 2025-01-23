import React from 'react';
import { MdPriorityHigh, MdLowPriority } from 'react-icons/md';
import { TbArrowsExchange } from 'react-icons/tb';

const PriorityIndicator = ({ priority }) => {
  const getIcon = () => {
    switch (priority.level) {
      case 'high':
        return <MdPriorityHigh className="text-red-500" />;
      case 'low':
        return <MdLowPriority className="text-green-500" />;
      default:
        return <TbArrowsExchange className="text-yellow-500" />;
    }
  };

  return (
    <div 
      className="flex items-center gap-2 text-sm"
      title={`Priority: ${priority.level.charAt(0).toUpperCase() + priority.level.slice(1)}`}
    >
      {getIcon()}
      <span 
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: priority.color }}
      />
    </div>
  );
};



export default PriorityIndicator;
