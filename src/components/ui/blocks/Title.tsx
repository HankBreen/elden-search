'use client';

import React from 'react';

interface TitleProps {
    // only prop is the title string
  title?: string;
}

export default function Title({ title = 'Elden Search' }: TitleProps) {
  return (
    <div className="flex items-center mr-4">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {title}
      </h1>
    </div>
  );
}