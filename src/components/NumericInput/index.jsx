import { Input, Tooltip } from 'antd';

function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export function number2Chinese (n) {
  if (!/^(0|[1-9]\d*)(\.\d*)?$/.test(n)) {
    return "数据非法";  //判断数据是否大于0
  }

  let unit = "仟佰拾万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  n += "00";

  let indexPoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数

  if (indexPoint >= 0) {
    n = n.substring(0, indexPoint) + n.substr(indexPoint + 1, 2);   // 若为小数，截取需要使用的unit单位
  }
  unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
  for (let i = 0; i < n.length; i++) {
    str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
  }
  return str
    .replace(/零(仟|佰|拾|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(万|亿|元)/g, "$1")
    .replace(/(亿)万|壹(拾)/g, "$1$2")
    .replace(/^元零?|零分/g, "")
    .replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果
}

const NumericInput = (props) => {
  const { value, placeholder='Input a number' } = props;
  const title = value ? (
    <>
      <p className="numeric-input-title">{value !== '-' ? number2Chinese(value) : '-'}</p>
      <p className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</p>
    </>
  ) : (
    placeholder
  );

  const onChange = e => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  const onBlur = () => {
    const { value, onBlur, onChange } = props;
    let valueTemp = value ?? "";
    if (value && (value.charAt(value.length - 1) === '.' || value === '-')) {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Input
        {...props}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={25}
      />
    </Tooltip>
  );
}

export default NumericInput;
