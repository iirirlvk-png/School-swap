import React from 'react';

const KnotIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* L and E */}
    <path d="M5 5v14h7" />
    <path d="M5 12h5" />
    {/* A and H */}
    <path d="M19 5v14" />
    <path d="M12 12h7" />
    <path d="M12 12l3.5-7l3.5 7" />
  </svg>
);

export default KnotIcon;