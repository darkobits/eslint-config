import React from 'react';

export const SomeComponent = () => {
  const foo = true;

  if (foo) {
    return null;
  }

  // const bar = new Animation();

  return (
    <div>{foo}</div>
  );
};
