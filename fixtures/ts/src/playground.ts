// console.log('playground');

// How should we determine if __dirname should be permitted in .ts files?
if (__dirname) {
  void true;
}


export function foo() {
  // eslint-disable-next-line unicorn/no-null
  return null;
}
