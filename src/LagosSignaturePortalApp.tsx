import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Moon, Sun } from "lucide-react";

export default function LagosSignaturePortalApp() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white">
              <ShieldCheck className="h-6 w-6" />
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

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/60 dark:bg-slate-950/60">
          <LoginScreen />
        </main>
      </div>
    </div>
  );
}

export function LoginScreen() {
  // No need for local state/functions—use globals from script.js
  const handleSameDeviceLogin = () => {
    if (window.loginWithMyIDOnSameDevice) {
      window.loginWithMyIDOnSameDevice();  // Call global function
    } else {
      console.error('loginWithMyIDOnSameDevice not found—check script.js');
    }
  };

  const handleDifferentDevice = () => {
    if (window.generateQRCodeForAnotherDevice) {
      window.generateQRCodeForAnotherDevice();  // Call global function (should generate/show QR)
    } else {
      console.error('generateQRCodeForAnotherDevice not found—check script.js');
    }
  };

  return (
    <div id="login-container" className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        id="myid-ui-container"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6 border border-slate-200 dark:border-slate-800"
      >
        <h2 className="text-2xl font-bold">Choose Login Method</h2>
        <div className="space-y-4">
          <button
            className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-3"
            onClick={handleSameDeviceLogin}
          >
            <img
              src="/img/myid-logo.png"
              alt="myID"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <span className="text-gray-100 font-semibold">Start myID</span>
            </div>
          </button>
          <button
            className="w-full py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition flex items-center justify-center"
            onClick={handleDifferentDevice}
          >
            <div>
              <span className="font-semibold">myID on a different device</span>
            </div>
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Having trouble? <a href="#" className="text-emerald-500 hover:underline">Contact support</a>
        </p>
      </motion.div>
    </div>
  );
}