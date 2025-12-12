import { useState } from "react"; 
import { useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileSignature, Moon, Sun } from "lucide-react";


// Extend Window interface to include the global function from script.js
declare global {
  interface Window {
    generateQRCodeForAnotherDevice: () => void;
  }
}

// Login via myID
export function LoginScreen() {
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  // Listen for changes from the external script
  useEffect(() => {
    // Create a custom event listener for when PIN prompt should show
    const handleShowPinPrompt = () => {
      console.log("PIN prompt event received");
      setShowPinPrompt(true);
    };

    // Create a custom event listener for success
    const handleSuccess = () => {
      console.log("Success event received");
      setShowPinPrompt(false);
      // You can add success UI here
    };

    // Add event listeners
    window.addEventListener('showPinPrompt', handleShowPinPrompt);
    window.addEventListener('showSuccess', handleSuccess);

    return () => {
      window.removeEventListener('showPinPrompt', handleShowPinPrompt);
      window.removeEventListener('showSuccess', handleSuccess);
    };
  }, []);

  const handleSameDeviceLogin = () => {
    console.log("Continue with myID clicked");
    
    // Remove any existing containers first
    const existingContainer = document.getElementById("myid-ui-container");
    if (existingContainer) {
      existingContainer.remove();
    }
    
    // Create the container that the script expects
    const loginContainer = document.getElementById("login-container");
    if (loginContainer) {
      // Clear any existing content
      loginContainer.innerHTML = '';
      
      // Create the container that script.js expects
      const scriptContainer = document.createElement("div");
      scriptContainer.id = "myid-ui-container";
      scriptContainer.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        max-width: 90%;
        width: 400px;
        text-align: center;
      `;
      
      // Add a placeholder for the QR code
      scriptContainer.innerHTML = `
        <h2 style="color: #1b5e20; margin-top: 0;">Scan with MyID App</h2>
        <div style="margin: 20px 0;">
          <div id="qr-code-display" style="margin: 0 auto; width: fit-content;">
            <div style="width: 256px; height: 256px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
              <p style="color: #777;">Loading QR code...</p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #555;">
            Open the MyID app on your mobile device and scan this QR code to authenticate
          </p>
          <p style="font-size: 0.9em; color: #777;">
            This code will automatically refresh for security
          </p>
        </div>
      `;
      
      loginContainer.appendChild(scriptContainer);
      
      // Now call the script's function
      if (window.generateQRCodeForAnotherDevice) {
        console.log("Calling generateQRCodeForAnotherDevice");
        window.generateQRCodeForAnotherDevice();
      } else {
        console.error('generateQRCodeForAnotherDevice not found');
      }
    }
  };

  // PIN Prompt UI (shown when script triggers it)
  if (showPinPrompt) {
    return (
      <div id="login-container" className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6 border border-slate-200 dark:border-slate-800"
        >
          <h2 className="text-2xl font-bold text-emerald-600">Verify on Your Device</h2>
          
          <div className="flex justify-center my-6">
            <div className="relative">
              <div className="w-40 h-80 bg-blue-500 rounded-3xl relative overflow-hidden">
                {/* Phone body */}
                <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
                  {/* Animated dots */}
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Phone button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Please enter your security PIN in the MyID app to complete verification
          </p>
          
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Original login form (shown initially)
  return (
    <div id="login-container" className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-7 w-7 text-emerald-500" />
          <h1 className="text-2xl font-bold">Login with myID</h1>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Use your government-issued myID credentials to access secure digital signing services.
        </p>

        <button
          onClick={handleSameDeviceLogin}
          className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2"
        >
          <FileSignature className="h-4 w-4" />
          Continue to myID
        </button>

        <p className="text-xs text-slate-400">
          By continuing, you agree to Lagos State's digital signature terms and privacy notice.
        </p>
      </motion.div>
    </div>
  );
}

// Root Login Page (default entry point)
export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src="/img/lagos2.jpg"
                alt="Lagos Logo"
                style={{
                  // width: "80px",
                  // height: "80px",
                  objectFit: "cover",
                }}
              />
            </div>


            <div>
              <h1 className="text-xl font-bold leading-tight">Lagos State Digital Signature Portal</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Trusted contracts • Secure identity • Legally binding signatures
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Main content with transitions */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/60 dark:bg-slate-950/60">
          <AnimatePresence mode="wait">
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <LoginScreen />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}