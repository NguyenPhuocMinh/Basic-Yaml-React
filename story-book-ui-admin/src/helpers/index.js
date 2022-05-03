import { toNumber } from 'lodash';

const UNITS_VI = ['N', 'Tr', 'Tỉ', 'T'];
const UNITS_EN = ['K', 'M', 'B', 'T'];

const formatQuantity = (string, locale = 'vi-VN') => {
  const number = toNumber(string);
  const UNITS = locale === 'vi-VN' ? UNITS_VI : UNITS_EN;
  const shouldShowDecimalPlace = UNITS.some((element, index) => {
    const lowerBound = Math.pow(1000, index + 1);
    const upperBound = lowerBound + lowerBound * 10;
    return number > lowerBound && number < upperBound;
  });
  const digits = shouldShowDecimalPlace ? 1 : 0;
  for (let i = UNITS.length - 1; i >= 0; i--) {
    const decimal = Math.pow(1000, i + 1);
    if (number >= decimal) {
      return (
        (number / decimal).toLocaleString(locale, {
          maximumFractionDigits: digits
        }) +
        ' ' +
        UNITS[i]
      );
    }
  }
  return number.toString();
};

export { formatQuantity };
