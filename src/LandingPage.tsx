// src/components/LandingPage.tsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileSignature, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-lime-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 text-slate-900 dark:text-slate-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Lagos State Digital Signature Portal</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Secure • Efficient • Legally Binding
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
          >
            <FileSignature className="h-4 w-4" />
            Login with myID
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
            Sign Contracts Digitally, Securely, and Instantly
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Powered by Lagos State's myID system, our portal enables legally binding electronic signatures for all contracts, verifications, and approvals. No paper, no delays—just trust and efficiency.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="/login"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-lime-500 text-white font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started with myID
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Quick Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-16"
        >
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Government-Backed Security</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Utilize certified myID for tamper-proof signatures compliant with Lagos State regulations.</p>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <FileSignature className="h-10 w-10 text-lime-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Workflow</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Create, share, and sign contracts in minutes with integrated provider marketplace.</p>
          </div>
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-4" /> {/* Assuming CheckCircle2 from lucide-react */}
            <h3 className="text-lg font-semibold mb-2">Easy Verification</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Verify any document's authenticity anytime with our public portal—no hassle.</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; 2025 Lagos State Government. All rights reserved. | <a href="/privacy" className="underline hover:text-emerald-600">Privacy Policy</a> | <a href="/terms" className="underline hover:text-emerald-600">Terms of Service</a></p>
      </footer>
    </div>
  );
}