import React from 'react';

export function SocialLogo(attrs: React.SVGAttributes<SVGElement>) {
  return (
    <svg viewBox="0 0 122 123" xmlns="http://www.w3.org/2000/svg" {...attrs}>
      <g fillRule="nonzero" fill="none">
        <circle fill="#5F32F9" cx="61" cy="61" r="61" />
        <path
          d="M122 63.954L76.353 18l1.546 31.552L48.323 19.78 26 93.279l29.233 29.428a61.19 61.19 0 005.985.293c32.865 0 59.64-26.241 60.782-59.046z"
          fill="#191694"
        />
        <path
          d="M100 59.838C100 72.63 89.479 83 76.5 83S53 72.63 53 59.838 76.5 18 76.5 18 100 47.046 100 59.838z"
          fill="#64E1DC"
        />
        <path
          d="M77.036 18L77 83h.036C89.72 83 100 72.63 100 59.838S77.036 18 77.036 18z"
          fill="#00C8C8"
        />
        <path
          d="M78 74.424C78 90.758 64.568 104 48 104c-16.569 0-30-13.242-30-29.576C18 58.089 48 21 48 21s30 37.09 30 53.424z"
          fill="#EDFAFA"
        />
        <path
          d="M48.005 21L48 104h.005C64.57 104 78 90.758 78 74.424 78 58.089 48.005 21 48.005 21z"
          fill="#CBF7F7"
        />
      </g>
    </svg>
  );
}
