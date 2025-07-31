// Import required polyfills first
import "fast-text-encoding";
import "react-native-get-random-values";
import "@ethersproject/shims";
import structuredClone from "@ungap/structured-clone";
global.structuredClone = structuredClone;

// More comprehensive Buffer polyfill
import { Buffer } from "buffer";
global.Buffer = Buffer;
global.process = global.process || {};
global.process.env = global.process.env || {};
global.process.version = global.process.version || "v16.0.0";

// Ensure Buffer is available on the window object as well (some libraries check here)
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}

// Add TextEncoder/TextDecoder if not available
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("fast-text-encoding").TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = require("fast-text-encoding").TextDecoder;
}

Buffer.prototype.subarray = function subarray(begin, end) {
  const result = Uint8Array.prototype.subarray.apply(this, [begin, end]);
  Object.setPrototypeOf(result, Buffer.prototype); // Explicitly add the `Buffer` prototype (adds `readUIntLE`!)
  return result;
};

// Then import the expo router
import "expo-router/entry";
