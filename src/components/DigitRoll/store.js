import {arrayFromCache} from '@components/DigitRoll/utils';

export function init(len){
  const newArr = arrayFromCache(len);
  const tmpDigitStatArr = newArr.map(() => ({ offset:0, figure: 0 }));
  const tmpBeforeDigits = Array(len).join('0'); // 0000000
  return {
    digitStatArr: [...tmpDigitStatArr],
    beforeDigits: tmpBeforeDigits
  }
}

export function reducer(state, action) {
  console.log(JSON.parse(JSON.stringify(state)))
  switch(action.type) {
    case 'changeDigitStatArr':
      return {
        ...state,
        digitStatArr: [...action.digitStatArr]
      }
    case 'changeBeforeDigits':
      return {
        ...state,
        beforeDigits: action.beforeDigits
      }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error();
  }
}
