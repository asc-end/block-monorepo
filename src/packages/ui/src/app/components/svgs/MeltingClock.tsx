import { Svg, Path, Circle, G, Defs, LinearGradient, Stop } from "@blockit/cross-ui-toolkit";

export function MeltingClock() {
  return (
    <Svg width={300} height={400} viewBox="0 0 300 400" fill="none">
      <Defs>
        <LinearGradient id="meltGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FF006E" />
          <Stop offset="50%" stopColor="#8338EC" />
          <Stop offset="100%" stopColor="#3A86FF" />
        </LinearGradient>
        <LinearGradient id="meltGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#FB5607" />
          <Stop offset="50%" stopColor="#FFBE0B" />
          <Stop offset="100%" stopColor="#F72585" />
        </LinearGradient>
        <LinearGradient id="clockFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#7209B7" />
          <Stop offset="100%" stopColor="#560BAD" />
        </LinearGradient>
      </Defs>
      
      {/* Clock face - warped circle */}
      <Path 
        d="M 150 50 Q 220 60 250 130 Q 240 200 150 220 Q 60 200 50 130 Q 60 60 150 50" 
        fill="url(#clockFace)"
        stroke="#F72585"
        strokeWidth="3"
      />
      
      {/* Clock numbers - distorted */}
      <G opacity="0.8">
        <Path d="M 150 70 L 150 90" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 200 100 L 190 115" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 220 160 L 200 160" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 190 200 L 175 190" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 150 210 L 150 190" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 110 200 L 125 190" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 80 160 L 100 160" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
        <Path d="M 100 100 L 110 115" stroke="#FFBE0B" strokeWidth="4" strokeLinecap="round" />
      </G>
      
      {/* Clock hands - twisted */}
      <Path 
        d="M 150 140 Q 160 120 150 80" 
        stroke="#FF006E" 
        strokeWidth="6" 
        strokeLinecap="round"
      />
      <Path 
        d="M 150 140 Q 170 145 180 130" 
        stroke="#3A86FF" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Melting drips */}
      <Path 
        d="M 100 210 Q 100 250 95 290 Q 90 320 100 350 Q 110 380 95 400" 
        fill="url(#meltGradient1)"
      />
      <Path 
        d="M 150 220 Q 150 260 145 300 Q 140 340 155 370 Q 165 390 150 400" 
        fill="url(#meltGradient2)"
      />
      <Path 
        d="M 200 210 Q 200 240 205 280 Q 210 310 195 340 Q 185 370 200 400" 
        fill="url(#meltGradient1)"
      />
      
      {/* Psychedelic spiral in center */}
      <Path 
        d="M 150 140 Q 155 135 160 140 Q 155 145 150 140 Q 145 145 140 140 Q 145 135 150 140"
        stroke="#FFBE0B"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Floating time particles */}
      <Circle cx="80" cy="250" r="6" fill="#FF006E" opacity="0.7" />
      <Circle cx="220" cy="270" r="8" fill="#8338EC" opacity="0.6" />
      <Circle cx="120" cy="300" r="5" fill="#3A86FF" opacity="0.8" />
      <Circle cx="180" cy="320" r="7" fill="#FB5607" opacity="0.7" />
      <Circle cx="150" cy="280" r="4" fill="#FFBE0B" opacity="0.9" />
    </Svg>
  );
}