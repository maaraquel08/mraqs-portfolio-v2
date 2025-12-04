export interface MousePosition {
  x: number;
  y: number;
}

export interface HolographicCardProps {
  width?: number;
  height?: number;
  children?: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  topSection?: React.ReactNode;
  middleSection?: React.ReactNode;
  bottomSection?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  mousePosition?: MousePosition;
  isHovering?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  isMobile?: boolean;
}

