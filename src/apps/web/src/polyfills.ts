import { Buffer } from 'buffer'

// Make Buffer available globally
window.Buffer = Buffer

// Also ensure global is defined
if (typeof window.global === 'undefined') {
  window.global = window
}