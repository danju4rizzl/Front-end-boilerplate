export const safeAdd = (a: number, b: number | undefined | null): number => {
  if (b) {
    return a + b;
  }
  return a;
};
