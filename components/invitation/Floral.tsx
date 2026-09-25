"use client";

import { useEffect, useState, type CSSProperties } from "react";

function Blossom({
  outer = 16,
  inner = 9,
  petals = 7,
}: {
  outer?: number;
  inner?: number;
  petals?: number;
}) {
  return (
    <g>
      {Array.from({ length: petals }, (_, index) => (
        <g key={index} transform={`rotate(${(360 / petals) * index})`}>
          <ellipse
            cx="0"
            cy={-outer}
            rx={outer * 0.56}
            ry={outer}
            fill={index % 2 === 0 ? "#dcb3ae" : "#c99590"}
          />
        </g>
      ))}
      {Array.from({ length: 5 }, (_, index) => (
        <g key={`inner-${index}`} transform={`rotate(${(360 / 5) * index + 18})`}>
          <ellipse cx="0" cy={-inner} rx={inner * 0.62} ry={inner} fill={index % 2 === 0 ? "#c99590" : "#e4c2bd"} />
        </g>
      ))}
      <circle r="5.5" fill="#c9b08c" />
      <circle r="3.1" fill="#a68455" />
    </g>
  );
}

export function FloralFrame() {
  return (
    <div className="pointer-events-none absolute inset-2.5 sm:inset-4" aria-hidden="true">
      <div className="absolute inset-7 border border-gold/55" />
      <div className="absolute inset-9 border border-blush/70" />

      <FlowerCorner className="absolute top-0 left-0 h-28 w-28 sm:h-32 sm:w-32" />
      <FlowerCorner className="absolute top-0 right-0 h-28 w-28 -scale-x-100 sm:h-32 sm:w-32" />
      <FlowerCorner className="absolute bottom-0 left-0 h-28 w-28 -scale-y-100 sm:h-32 sm:w-32" />
      <FlowerCorner className="absolute right-0 bottom-0 h-28 w-28 -scale-100 sm:h-32 sm:w-32" />

      <FlowerSprig className="absolute top-1/2 left-1 h-14 w-8 -translate-y-1/2" />
      <FlowerSprig className="absolute top-1/2 right-1 h-14 w-8 -translate-y-1/2 -scale-x-100" />
    </div>
  );
}

function FlowerCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className}>
      <path d="M52 18c22 8 48 8 96 2" stroke="#a68455" strokeWidth="1.1" fill="none" opacity="0.8" />
      <path d="M18 52c8 22 8 48 2 96" stroke="#a68455" strokeWidth="1.1" fill="none" opacity="0.8" />
      <path d="M22 62c16-4 26 8 18 18-14 2-24-8-18-18Z" fill="#8b9a78" />
      <path d="M62 22c-4 16 8 26 18 18 2-14-8-24-18-18Z" fill="#7d8d6c" />
      <path d="M40 48c8 1 14 10 8 16-10-1-16-8-8-16Z" fill="#a3b18a" />
      <path d="M96 24c8 10 4 18-4 16-2-10 0-16 4-16Z" fill="#8b9a78" opacity="0.9" />
      <path d="M24 96c10 8 18 4 16-4-10-2-16 0-16 4Z" fill="#7d8d6c" opacity="0.9" />
      <g transform="translate(40 40)">
        <Blossom />
      </g>
      <g transform="translate(104 30) scale(0.42)">
        <Blossom outer={14} inner={8} petals={6} />
      </g>
      <g transform="translate(30 104) scale(0.42)">
        <Blossom outer={14} inner={8} petals={6} />
      </g>
    </svg>
  );
}

type Bloom = {
  id: number;
  top: number;
  left: number;
  size: number;
  rotate: number;
  opacity: number;
};

function scatterBlooms(): Bloom[] {
  const columns = 2;
  const rows = 12;
  const blooms: Bloom[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      blooms.push({
        id: row * columns + column,
        top: ((row + 0.12 + Math.random() * 0.76) / rows) * 100,
        left: ((column + 0.08 + Math.random() * 0.84) / columns) * 100,
        size: 68 + Math.random() * 58,
        rotate: Math.random() * 360,
        opacity: 0.16 + Math.random() * 0.16,
      });
    }
  }

  return blooms;
}

export function FloralBackground() {
  const [blooms, setBlooms] = useState<Bloom[]>([]);

  useEffect(() => {
    setBlooms(scatterBlooms());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blooms.map((bloom) => (
        <svg
          key={bloom.id}
          viewBox="-40 -40 80 80"
          className="absolute"
          style={
            {
              top: `${bloom.top}%`,
              left: `${bloom.left}%`,
              width: bloom.size,
              height: bloom.size,
              transform: `translate(-50%, -50%) rotate(${bloom.rotate}deg)`,
              opacity: bloom.opacity,
            } satisfies CSSProperties
          }
        >
          <path d="M-20 6c14-2 22 10 12 18-12 2-20-8-12-18Z" fill="#8b9a78" />
          <path d="M16 8c2 14-10 20-16 12-2-12 6-16 16-12Z" fill="#7d8d6c" />
          <Blossom />
        </svg>
      ))}
    </div>
  );
}

function FlowerSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className}>
      <path d="M20 8c2 16 1 34 0 64" stroke="#a68455" strokeWidth="1" fill="none" />
      <path d="M20 28c-10 2-14 10-8 14 8-2 12-8 8-14Z" fill="#8b9a78" />
      <path d="M20 46c10 2 14 10 8 14-8-2-12-8-8-14Z" fill="#7d8d6c" />
      <g transform="translate(20 18) scale(0.55)">
        <Blossom outer={12} inner={7} petals={6} />
      </g>
    </svg>
  );
}
