import { Svg, Path } from '@blockit/cross-ui-toolkit';

interface RaysProps {
  size?: number;
  color?: string;
}

export function Rays({ size = 500, color = "#2D00F7" }: RaysProps) {

  return (
    <Svg width={size} height={size} viewBox="0 0 3000 3000" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M618.322 286.474L286.475 618.322L1500 1500L618.322 286.474Z" fill={color} fillOpacity="0.1" />
      <Path d="M1036.47 73.4153L618.322 286.474L1500 1500L1036.47 73.4153Z" fill={color} fillOpacity="0.05" />
      <Path d="M1500 0L1036.47 73.4153L1500 1500V0Z" fill={color} fillOpacity="0.1" />
      <Path d="M1963.53 73.4153L1500 0V1500L1963.53 73.4153Z" fill={color} fillOpacity="0.05" />
      <Path d="M2381.68 286.474L1963.53 73.4153L1500 1500L2381.68 286.474Z" fill={color} fillOpacity="0.1" />
      <Path d="M2713.53 618.322L2381.68 286.474L1500 1500L2713.53 618.322Z" fill={color} fillOpacity="0.05" />
      <Path d="M2926.58 1036.47L2713.53 618.322L1500 1500L2926.58 1036.47Z" fill={color} fillOpacity="0.1" />
      <Path d="M3000 1500L2926.58 1036.47L1500 1500H3000Z" fill={color} fillOpacity="0.05" />
      <Path d="M2926.58 1963.53L3000 1500H1500L2926.58 1963.53Z" fill={color} fillOpacity="0.1" />
      <Path d="M2713.53 2381.68L2926.58 1963.53L1500 1500L2713.53 2381.68Z" fill={color} fillOpacity="0.05" />
      <Path d="M2381.68 2713.53L2713.53 2381.68L1500 1500L2381.68 2713.53Z" fill={color} fillOpacity="0.1" />
      <Path d="M1963.53 2926.58L2381.68 2713.53L1500 1500L1963.53 2926.58Z" fill={color} fillOpacity="0.05" />
      <Path d="M1500 3000L1963.53 2926.58L1500 1500V3000Z" fill={color} fillOpacity="0.1" />
      <Path d="M1036.47 2926.58L1500 3000V1500L1036.47 2926.58Z" fill={color} fillOpacity="0.05" />
      <Path d="M618.322 2713.53L1036.47 2926.58L1500 1500L618.322 2713.53Z" fill={color} fillOpacity="0.1" />
      <Path d="M286.475 2381.68L618.322 2713.53L1500 1500L286.475 2381.68Z" fill={color} fillOpacity="0.05" />
      <Path d="M73.416 1963.53L286.475 2381.68L1500 1500L73.416 1963.53Z" fill={color} fillOpacity="0.1" />
      <Path d="M0 1500L73.4153 1963.53L1500 1500H0Z" fill={color} fillOpacity="0.05" />
      <Path d="M73.4153 1036.47L0 1500H1500L73.4153 1036.47Z" fill={color} fillOpacity="0.1" />
      <Path d="M286.475 618.322L73.416 1036.47L1500 1500L286.475 618.322Z" fill={color} fillOpacity="0.05" />
    </Svg>

  );
};