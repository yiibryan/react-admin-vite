import React from 'react';

import Select, {components, ValueContainerProps} from "react-select";
export const colourOptions : ColourOption[] = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

interface ColourOption {
  value: string;
  label: string;
  color: string;
  isFixed?: boolean;
  disabled?: boolean;
}

const ValueContainer = ({ children, ...props }: ValueContainerProps<ColourOption>) => {
  const length = props.getValue().length;

  return (
    <components.ValueContainer {...props}>
      {!props.selectProps.inputValue &&
        `${length} Item${length !== 1 ? "s" : ""} selected`}
      {React.Children.map(children, child => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return child.type === components.Input ? child : null;
      })}
    </components.ValueContainer>
  );
};

const CustomSelect = () => (
  <Select
    defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    options={colourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    components={{ ValueContainer }}
  />
);

export default CustomSelect;
