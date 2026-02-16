import React from "react";


type ProfileIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 30,
  strokeWidth = 1.5,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Head */}
      <circle
        cx="12"
        cy="9"
        r="3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* Shoulders */}
      <path
        d="M6.5 18C7.8 15.8 9.8 15 12 15C14.2 15 16.2 15.8 17.5 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ProfileIcon;