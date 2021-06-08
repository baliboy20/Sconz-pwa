

export const ToCurrencyStringFn = (val: number) => {
  return (val * 100).toPrecision(2);
};
