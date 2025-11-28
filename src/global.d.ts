declare global {
  interface Window {
    loginWithMyIDOnSameDevice: () => void;
  }
}

export {}; // Ensures this is treated as a module for global augmentation