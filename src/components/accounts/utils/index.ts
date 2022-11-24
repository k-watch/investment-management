import { numberFormatMap } from '../types';

export function convertNumberFormat(key: number, accountNumber: string) {
  const content = numberFormatMap.get(key);
  if (content) {
    const [reg, expression] = content;
    const regex = new RegExp(reg);
    return accountNumber.replace(regex, expression);
  }

  return accountNumber;
}
