import React from 'react';
import { Tab } from './types';

interface TabItemProps {
  tab: Tab;
  isSelected: boolean;
  onClick: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  isSelected,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2
        whitespace-nowrap cursor-pointer
        transition-all duration-200
        hover:bg-gray-100
        ${isSelected ? 'border-b-2 border-blue-500 bg-blue-50' : ''}
      `}
      role="tab"
      aria-selected={isSelected}
      tabIndex={0}
    >
      {tab.icon && <span className="text-gray-600">{tab.icon}</span>}
      <span className="font-medium">{tab.label}</span>
      {tab.badge !== undefined && (
        <span className="px-2 py-0.5 text-xs bg-gray-200 rounded-full">
          {tab.badge}
        </span>
      )}
    </div>
  );
};