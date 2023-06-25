// TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { GetManualChunk } from 'rollup';

const vendorLibs: { match: string[]; output: string }[] = [
  // {
  //   match: ['xlsx'],
  //   output: 'xlsx',
  // },
];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const configManualChunk: GetManualChunk = (id: string) => {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};
