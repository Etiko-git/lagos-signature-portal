import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, FileSignature, Moon, Sun } from "lucide-react";

// Extend Window interface to include the global function from script.js
declare global {
  interface Window {
    loginWithMyIDOnSameDevice: () => void;
  }
}

// Login via myID
export function LoginScreen() {
  // No need for local state/functions—use globals from script.js
  const handleSameDeviceLogin = () => {
    if (window.loginWithMyIDOnSameDevice) {
      window.loginWithMyIDOnSameDevice();  // Call global function
    } else {
      console.error('loginWithMyIDOnSameDevice not found—check script.js');
    }
  };

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

        {/* FIXED — added onClick */}
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
            {/* No login button on login page */}
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