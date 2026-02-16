import React from "react";


interface HeartIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({ 
  size = 25, 
  filled = false, 
  ...props 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 6.5s-2-2.5-4.5-2.5c-3 0-5.5 2.5-5.5 5.5 0 5 7 10 10 11.5 3-1.5 10-6.5 10-11.5 0-3-2.5-5.5-5.5-5.5-2.5 0-4.5 2.5-4.5 2.5z" />
    </svg>
  );
};

export default HeartIcon;