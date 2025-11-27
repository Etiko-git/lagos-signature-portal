import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FileSignature,
  Users,
  Search,
  Moon,
  Sun,
  LayoutDashboard,
  CheckCircle2,
  Settings,
  Store,
  FileCheck2,
  Clock,
  AlertTriangle,
} from "lucide-react";

// Simple route type for in-memory navigation
export type Route =
  | "dashboard"
  | "login"
  | "create"
  | "providers"
  | "verify"
  | "admin"
  | "approval"
  | "contracts"
  | "contractDetails"
  | "mdaDashboard";

// Root App with navigation, dark mode, and page transitions
export default function LagosSignaturePortalApp() {
  const [route, setRoute] = useState<Route>("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const renderScreen = () => {
    switch (route) {
      case "login":
        return <LoginScreen />;
      case "create":
        return <CreateContractWorkflow />;
      case "providers":
        return <ProviderMarketplace />;
      case "verify":
        return <VerificationPortal />;
      case "admin":
        return <AdminConsole />;
      case "mdaDashboard":
        return <MDADashboardScreen />;
      case "approval":
        return <SignatureApprovalScreen />;
      case "contracts":
        return <MyContracts goToDetails={() => setRoute("contractDetails")} />;
      case "contractDetails":
        return (
          <ContractDetails
            onBack={() => setRoute("contracts")}
            onSign={() => setRoute("approval")}
          />
        );
      case "dashboard":
      default:
        return <DashboardScreen goToCreate={() => setRoute("create")} />;
    }
  };

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
              onClick={() => setRoute("login")}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
            >
              <FileSignature className="h-4 w-4" />
              Login with myID
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Body layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 gap-4">
            <NavButton
              icon={LayoutDashboard}
              label="Dashboard"
              active={route === "dashboard"}
              onClick={() => setRoute("dashboard")}
            />
            <NavButton
              icon={FileCheck2}
              label="My Contracts"
              active={route === "contracts"}
              onClick={() => setRoute("contracts")}
            />
            <NavButton
              icon={FileSignature}
              label="Create Contract"
              active={route === "create"}
              onClick={() => setRoute("create")}
            />
            <NavButton
              icon={Store}
              label="Provider Marketplace"
              active={route === "providers"}
              onClick={() => setRoute("providers")}
            />
            <NavButton
              icon={Search}
              label="Verification Portal"
              active={route === "verify"}
              onClick={() => setRoute("verify")}
            />
            <NavButton
              icon={Settings}
              label="Admin Console"
              active={route === "admin"}
              onClick={() => setRoute("admin")}
            />
            <NavButton
              icon={ShieldCheck}
              label="MDA Dashboard"
              active={route === "mdaDashboard"}
              onClick={() => setRoute("mdaDashboard")}
            />
          </aside>

          {/* Main content with transitions */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-50/60 dark:bg-slate-950/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={route}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// Reusable navigation button
function NavButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition border
        ${active
          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/60 text-emerald-800 dark:text-emerald-200"
          : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/70"}
      `}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}

// Dashboard screen with high-fidelity cards and tables
function DashboardScreen({ goToCreate }: { goToCreate: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-emerald-500" />
            Dashboard
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overview of signatures, contracts and verification activity across Lagos State.
          </p>
        </div>
        <button
          onClick={goToCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition"
        >
          <FileSignature className="h-4 w-4" />
          New Contract
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Pending Signatures"
          value="12"
          trend="+3 today"
          accent="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
          icon={Users}
        />
        <StatCard
          label="Completed Contracts (30d)"
          value="148"
          trend="+21 vs last month"
          accent="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
          icon={FileCheck2}
        />
        <StatCard
          label="Verified Documents"
          value="327"
          trend="99.2% valid"
          accent="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
          icon={ShieldCheck}
        />
        <StatCard
          label="Suspicious Events"
          value="2"
          trend="Under review"
          accent="bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
          icon={Settings}
        />
      </div>

      {/* Recent activity table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Recent Activities
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Last 24 hours</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/80">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                  Contract
                </th>
                <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">Type</th>
                <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                  Provider
                </th>
                <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2">Housing Lease #2031</td>
                <td className="px-4 py-2">Housing</td>
                <td className="px-4 py-2">
                  <StatusBadge status="Signed" />
                </td>
                <td className="px-4 py-2">Lagos Default Provider</td>
                <td className="px-4 py-2 text-slate-500 dark:text-slate-400">Just now</td>
              </tr>
              <tr className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2">Employment Offer #778</td>
                <td className="px-4 py-2">Employment</td>
                <td className="px-4 py-2">
                  <StatusBadge status="Pending" />
                </td>
                <td className="px-4 py-2">Tecres Digital Sign</td>
                <td className="px-4 py-2 text-slate-500 dark:text-slate-400">12 min ago</td>
              </tr>
              <tr className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-4 py-2">Service Contract #992</td>
                <td className="px-4 py-2">Business</td>
                <td className="px-4 py-2">
                  <StatusBadge status="Verified" />
                </td>
                <td className="px-4 py-2">Certum Nigeria</td>
                <td className="px-4 py-2 text-slate-500 dark:text-slate-400">1 hr ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  accent,
  icon: Icon,
}: {
  label: string;
  value: string;
  trend: string;
  accent: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${accent}`}
        >
          <Icon className="h-3 w-3" />
          Overview
        </span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{trend}</div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: "Signed" | "Pending" | "Verified" }) {
  const base = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold";
  if (status === "Signed")
    return (
      <span className={`${base} bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200`}>
        <CheckCircle2 className="h-3 w-3" /> Signed
      </span>
    );
  if (status === "Verified")
    return (
      <span className={`${base} bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200`}>
        <ShieldCheck className="h-3 w-3" /> Verified
      </span>
    );
  return (
    <span className={`${base} bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200`}>
      Pending
    </span>
  );
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
    <div className="min-h-[70vh] flex items-center justify-center">
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


<<<<<<< HEAD
=======



>>>>>>> b41372189563b135910b84cf7eeee74d291faf50
// Create Contract workflow
export function CreateContractWorkflow() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-emerald-500" />
            Create New Contract
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Define the contract, upload the document, and configure parties and providers.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <label className="font-medium text-sm">Contract Title</label>
          <input
            className="mt-1 w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm"
            placeholder="e.g. Housing Lease Agreement for Flat 3B, Yaba"
          />
        </div>

        <div>
          <label className="font-medium text-sm">Upload Document</label>
          <div className="mt-1 flex flex-col md:flex-row items-center gap-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-slate-50/60 dark:bg-slate-900/60">
            <input type="file" className="text-xs" />
            <p className="text-xs text-slate-500 dark:text-slate-400">PDF, DOCX up to 10MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-sm">Primary Party (Initiator)</label>
            <input
              className="mt-1 w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm"
              placeholder="Enter name, email or myID reference"
            />
          </div>
          <div>
            <label className="font-medium text-sm">Counterparty</label>
            <input
              className="mt-1 w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm"
              placeholder="Enter name, email or myID reference"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition">
            Continue to Workflow Setup
          </button>
        </div>
      </div>
    </div>
  );
}

// Provider Marketplace UI
export function ProviderMarketplace() {
  const providers = [
    {
      name: "Lagos Default Provider",
      type: "State-backed",
      desc: "Official Lagos State signing engine for public services and regulated contracts.",
      badge: "Recommended",
    },
    {
      name: "Certum Nigeria",
      type: "Qualified Signature",
      desc: "Qualified digital certificates and signatures for high-assurance contracts.",
      badge: "High Assurance",
    },
    {
      name: "Tecres Digital Sign",
      type: "Workflow Platform",
      desc: "Enterprise document management and e-signature workflows.",
      badge: "Enterprise",
    },
    {
      name: "Axendit Signature",
      type: "Security & Trust",
      desc: "Security-focused certificates and trust services for banks and fintechs.",
      badge: "Finance",
    },
    {
      name: "Flowmono Sign",
      type: "SaaS E-sign",
      desc: "Cloud-based e-sign for SMEs and distributed teams.",
      badge: "SME",
    },
    {
      name: "Adobe Sign",
      type: "Global Platform",
      desc: "International e-signature service integrated with Adobe ecosystem.",
      badge: "Global",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Store className="h-5 w-5 text-emerald-500" />
            Provider Marketplace
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose a Lagos-certified signature provider for your workflows.
          </p>
        </div>
        <div className="relative">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs"
            placeholder="Search providers"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.type}</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                {p.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">{p.desc}</p>
            <button className="mt-2 w-full px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition">
              Select Provider
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Signature approval screen
export function SignatureApprovalScreen() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-10 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Approve Signature</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You are about to sign this contract using your verified myID identity.
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-4 text-left text-sm space-y-1 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Document</span>
            <span className="text-slate-500 dark:text-slate-400">Housing Lease Agreement #2031</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Role</span>
            <span className="text-slate-500 dark:text-slate-400">Tenant</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Provider</span>
            <span className="text-slate-500 dark:text-slate-400">Lagos Default Provider</span>
          </div>
        </div>
        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Approve with myID
        </button>
        <p className="text-[11px] text-slate-400">
          A record of this signature will be stored in the Lagos State Signature Transaction Registry for legal and security purposes.
        </p>
      </motion.div>
    </div>
  );
}

// Verification portal
export function VerificationPortal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Search className="h-5 w-5 text-emerald-500" />
            Document Verification
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload a signed document or enter a Lagos State Signature ID to verify validity.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 max-w-2xl">
        <div>
          <label className="font-medium text-sm">Upload Signed Document</label>
          <div className="mt-1 flex flex-col md:flex-row items-center gap-3 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 bg-slate-50/60 dark:bg-slate-900/60">
            <input type="file" className="text-xs" />
            <p className="text-xs text-slate-500 dark:text-slate-400">PDF with embedded Lagos digital signature</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          <span className="px-3 text-xs text-slate-500 dark:text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div>
          <label className="font-medium text-sm">Enter Signature ID</label>
          <input
            className="mt-1 w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm"
            placeholder="LAG-SIG-2025-000123"
          />
        </div>

        <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition inline-flex items-center justify-center gap-2">
          <Search className="h-4 w-4" />
          Verify Document
        </button>
      </div>
    </div>
  );
}

// Admin console
export function AdminConsole() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-500" />
            Admin Console
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage users, providers, and monitor the Lagos digital signature ecosystem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4"
        >
          <h3 className="font-semibold text-sm mb-1">Manage Users</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Configure admin roles, permissions and access policies.
          </p>
          <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Open user management
          </button>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4"
        >
          <h3 className="font-semibold text-sm mb-1">Provider Accreditation</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Approve, monitor and revoke certified signature providers.
          </p>
          <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">View providers</button>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, scale: 1.01 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4"
        >
          <h3 className="font-semibold text-sm mb-1">Analytics Dashboard</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Monitor volume, anomalies and enforcement indicators.
          </p>
          <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Open analytics</button>
        </motion.div>
      </div>
    </div>
  );
}

// My Contracts screen
function MyContracts({ goToDetails }: { goToDetails: () => void }) {
  const contracts = [
    {
      id: "LAG-CON-2031",
      title: "Housing Lease Agreement #2031",
      type: "Housing",
      status: "Signed" as const,
      updated: "Just now",
      provider: "Lagos Default Provider",
    },
    {
      id: "LAG-CON-0778",
      title: "Employment Offer #778",
      type: "Employment",
      status: "Pending" as const,
      updated: "12 min ago",
      provider: "Tecres Digital Sign",
    },
    {
      id: "LAG-CON-0992",
      title: "Service Contract #992",
      type: "Business",
      status: "Verified" as const,
      updated: "1 hr ago",
      provider: "Certum Nigeria",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-emerald-500" />
            My Contracts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View all contracts you have initiated or been invited to sign.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/80">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Contract ID
              </th>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Title
              </th>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Type
              </th>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Provider
              </th>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Status
              </th>
              <th className="px-4 py-2 text-left font-semibold text-xs text-slate-500 dark:text-slate-400">
                Updated
              </th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr
                key={c.id}
                className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-900/60"
              >
                <td className="px-4 py-2 text-xs font-mono text-slate-500 dark:text-slate-400">{c.id}</td>
                <td className="px-4 py-2">{c.title}</td>
                <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">{c.type}</td>
                <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">{c.provider}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">{c.updated}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={goToDetails}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Contract Details screen
function ContractDetails({ onBack, onSign }: { onBack: () => void; onSign: () => void }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <button
        onClick={onBack}
        className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-2"
      >
        ← Back to My Contracts
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Housing Lease Agreement #2031</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Contract ID: LAG-CON-2031 • Housing • Lagos Island
          </p>
        </div>
        <StatusBadge status="Pending" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 text-sm space-y-1">
          <h3 className="font-semibold mb-1">Parties</h3>
          <p className="text-slate-500 dark:text-slate-400">Tenant: John Doe (myID-xxxx)</p>
          <p className="text-slate-500 dark:text-slate-400">Landlord: XYZ Estates Ltd</p>
          <p className="text-slate-500 dark:text-slate-400">Guarantor: —</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 text-sm space-y-1">
          <h3 className="font-semibold mb-1">Signing Configuration</h3>
          <p className="text-slate-500 dark:text-slate-400">Provider: Lagos Default Provider</p>
          <p className="text-slate-500 dark:text-slate-400">Order: Tenant → Landlord</p>
          <p className="text-slate-500 dark:text-slate-400">Signature Level: Advanced</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 text-sm">
        <h3 className="font-semibold mb-2">Document Preview</h3>
        <div className="h-40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">
          PDF preview placeholder
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onSign}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-2"
        >
          <ShieldCheck className="h-4 w-4" />
          Review and Sign
        </button>
      </div>
    </div>
  );
}

// MDA Dashboard view (for government agencies)
function MDADashboardScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            MDA Dashboard (Government Agencies)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Agency-level overview of contracts, signatures and verification across Lagos State.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <option>All MDAs</option>
            <option>Housing</option>
            <option>Lands & Physical Planning</option>
            <option>Civil Service Commission</option>
            <option>Ministry of Justice</option>
          </select>
          <select className="text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Year to date</option>
          </select>
        </div>
      </div>

      {/* KPI row for agencies */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Contracts (All MDAs)"
          value="1,284"
          trend="Last 30 days"
          accent="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
          icon={FileCheck2}
        />
        <StatCard
          label="Avg. Time to Sign"
          value="3.2 days"
          trend="Down from 5.1 days"
          accent="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
          icon={Clock}
        />
        <StatCard
          label="Verification Success Rate"
          value="99.3%"
          trend="Valid vs total checks"
          accent="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
          icon={ShieldCheck}
        />
        <StatCard
          label="Flagged / Suspicious"
          value="7"
          trend="Awaiting review"
          accent="bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
          icon={AlertTriangle}
        />
      </div>

      {/* MDA breakdown table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold">MDA Breakdown</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">Top agencies by volume</span>
        </div>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/80">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                Agency
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                Contracts
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                Signed
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                Avg. Time
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500 dark:text-slate-400">
                Flagged
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100 dark:border-slate-800">
              <td className="px-4 py-2">Lagos State Housing Authority</td>
              <td className="px-4 py-2">432</td>
              <td className="px-4 py-2">417</td>
              <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">2.8 days</td>
              <td className="px-4 py-2 text-xs text-rose-500">3</td>
            </tr>
            <tr className="border-t border-slate-100 dark:border-slate-800">
              <td className="px-4 py-2">Lands & Physical Planning</td>
              <td className="px-4 py-2">301</td>
              <td className="px-4 py-2">289</td>
              <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">3.9 days</td>
              <td className="px-4 py-2 text-xs text-rose-500">2</td>
            </tr>
            <tr className="border-t border-slate-100 dark:border-slate-800">
              <td className="px-4 py-2">Civil Service Commission</td>
              <td className="px-4 py-2">221</td>
              <td className="px-4 py-2">218</td>
              <td className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">2.1 days</td>
              <td className="px-4 py-2 text-xs text-rose-500">1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

