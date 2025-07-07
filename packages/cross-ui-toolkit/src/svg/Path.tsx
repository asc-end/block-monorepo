export interface PathProps extends React.SVGProps<SVGPathElement> {
  d: string;
  color?: string;
  fill?: string;
}

export function Path({ color = 'currentColor', fill, d, ...props }: PathProps) {
  return <path d={d} fill={fill} color={color} {...props} />;
}