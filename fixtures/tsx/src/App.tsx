import React from 'react';


// Named function declaration components should be allowed.
export function TestComponent() {
  // This lets us test that the NodeJS type is defined.
  const [timer] = React.useState<NodeJS.Timeout>(setTimeout(() => {
    return true;
  }));

  if (timer) {
    return null;
  }

  return (
    <div>.</div>
  );
}


// Named arrow function components should be allowed.
export const OtherComponent = () => {
  // This lets us test that the JSX global is defined.
  const content: JSX.Element = <span>Hello world.</span>;

  return (
    <div>{content}</div>
  );
};
