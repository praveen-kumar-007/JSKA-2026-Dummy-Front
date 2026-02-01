import React from 'react';

interface SkeletonProps {
  variant?: 'card' | 'avatar' | 'text' | 'circle';
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ variant = 'card', count = 1, className = '' }) => {
  const items = new Array(count).fill(null);

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg ${
            variant === 'card' ? 'p-4' : variant === 'avatar' ? 'p-2' : variant === 'text' ? 'h-4 w-full p-0' : 'p-2'
          } ${className}`}
        >
          {variant === 'card' && (
            <div className="space-y-3">
              <div className="h-40 bg-slate-200 rounded-md" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          )}

          {variant === 'avatar' && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          )}

          {variant === 'text' && <div className="h-4 bg-slate-200 rounded" />}

          {variant === 'circle' && <div className="w-10 h-10 rounded-full bg-slate-200" />}
        </div>
      ))}
    </>
  );
};

export default Skeleton;
