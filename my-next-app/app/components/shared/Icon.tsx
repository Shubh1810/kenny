import { Icon as TablerIcon } from "@tabler/icons-react";
import React from "react";

interface IconProps {
  icon: typeof TablerIcon;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className }) => {
  return <IconComponent className={className} />;
}; 