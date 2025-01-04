import React from "react";
import { TabItem } from "./TabItem";
import { Tab } from "./types";

interface DraggableTabProps {
  tab: Tab;
  index: number;
  isSelected: boolean;
  moveTab: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
}

export const DraggableTab: React.FC<DraggableTabProps> = ({
  tab,
  isSelected,
  onClick,
}) => {
  return <TabItem tab={tab} isSelected={isSelected} onClick={onClick} />;
};
