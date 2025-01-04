import React, { useRef, useState, useEffect } from 'react';
import { ScrollButton } from './ScrollButton';
import { DraggableTab } from './DraggableTab';
import { ScrollableTabsProps, Tab } from './types';

export const ScrollableTabs: React.FC<ScrollableTabsProps> = ({
  tabs,
  selectedTab,
  onTabChange,
  onTabsReorder,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftScroll(container.scrollLeft > 0);
      setShowRightScroll(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [tabs]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const moveTab = (dragIndex: number, hoverIndex: number) => {
    const newTabs = [...tabs];
    const draggedTab = newTabs[dragIndex];
    newTabs.splice(dragIndex, 1);
    newTabs.splice(hoverIndex, 0, draggedTab);
    onTabsReorder?.(newTabs);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = tabs.findIndex((tab) => tab.id === tabId) - 1;
        if (prevIndex >= 0) onTabChange(tabs[prevIndex].id);
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = tabs.findIndex((tab) => tab.id === tabId) + 1;
        if (nextIndex < tabs.length) onTabChange(tabs[nextIndex].id);
        break;
    }
  };

  return (
      <div 
        className="relative flex items-center w-full bg-white shadow-sm"
        onKeyDown={(e) => handleKeyDown(e, selectedTab)}
      >
        {showLeftScroll && (
          <ScrollButton
            direction="left"
            onClick={() => scroll('left')}
            disabled={!showLeftScroll}
          />
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={checkScrollButtons}
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <DraggableTab
              key={tab.id}
              tab={tab}
              index={index}
              isSelected={selectedTab === tab.id}
              moveTab={moveTab}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {showRightScroll && (
          <ScrollButton
            direction="right"
            onClick={() => scroll('right')}
            disabled={!showRightScroll}
          />
        )}
      </div>
  );
};