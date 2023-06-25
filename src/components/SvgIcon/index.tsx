type SvgIconProps = {
  name: string;
  prefix?: string;
  color?: string;
  [p:string]: any;
};

const SvgIcon:React.FC<SvgIconProps> = ({
  name,
  prefix = 'icon',
  color = 'currentColor',
  ...props
}) => {
  const symbolId = `#${prefix}-${name}`
  return (
    <svg {...props} aria-hidden="true" focusable="false" width="1em" height="1em" fill={color}>
      <use href={symbolId} />
    </svg>
  )
}

export default SvgIcon;
