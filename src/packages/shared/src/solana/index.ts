import BN from "bn.js"

export function timeToUnix(timestamp: BN): Date {
    return new Date(timestamp.toNumber() * 1000);
}

export function unixToTime(timestamp: Date): BN {
    return new BN(Math.floor(timestamp.getTime() / 1000));
}