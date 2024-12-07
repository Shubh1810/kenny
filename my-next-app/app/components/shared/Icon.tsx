import { Icon as TablerIcon, TablerIconsProps } from "@tabler/icons-react";
import React from "react";

interface IconProps {
  icon: (props: TablerIconsProps) => JSX.Element;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className }) => {
  return <IconComponent className={className} />;
}; 