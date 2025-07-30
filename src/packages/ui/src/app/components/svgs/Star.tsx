import { Path, Svg } from "@blockit/cross-ui-toolkit";

export function Star({ className, size = 29 }: { className?: string, size?: number }) {
    return (<Svg width={size} height={38} viewBox="0 0 29 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <Path d="M14.5 0C14.5 4.864 11.7234 14.592 0 18.848C9.87221 23.712 11.7234 25.84 14.5 38C18.5106 30.4 16.0426 22.192 29 18.848C17.8936 14.896 17.5851 9.12 14.5 0Z" fill="#FFB600" />
    </Svg>)
}
