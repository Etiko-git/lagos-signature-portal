export {};

declare global {
  interface Window {
    generateQRCodeForAnotherDevice: () => void;
  }
}
