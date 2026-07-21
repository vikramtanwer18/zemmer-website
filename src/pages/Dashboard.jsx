import { useAuthStore } from "../store/authStore";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-background-950 text-foreground-50 flex flex-col">
        <div className="p-5 flex items-center gap-2 border-b border-background-800">
          <span className="text-lg font-heading font-bold tracking-tight text-primary-500">
            Zemmer
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 bg-background-800 text-foreground-50 rounded-lg transition-colors text-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-foreground-400 hover:bg-background-800 hover:text-foreground-50 rounded-lg transition-colors text-sm"
          >
            <User className="w-4 h-4" />
            Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 text-foreground-400 hover:bg-background-800 hover:text-foreground-50 rounded-lg transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            Settings
          </a>
        </nav>

        <div className="p-3 border-t border-background-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-foreground-400 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white p-5 shadow-sm flex items-center justify-between border-b border-background-200">
          <h1 className="text-xl font-heading font-bold text-foreground-900">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-heading font-bold text-sm">
              {user?.name?.charAt(0) || "U"}
            </div>
            <span className="font-medium text-foreground-700 text-sm">
              {user?.name || "User"}
            </span>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-background-200">
              <h3 className="text-foreground-500 font-medium mb-2 text-sm">
                Next Workout
              </h3>
              <p className="text-xl font-heading font-bold text-foreground-900">
                Today, 5:00 PM
              </p>
              <p className="text-sm text-primary-500 mt-1.5 font-medium">
                Upper Body Strength
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-background-200">
              <h3 className="text-foreground-500 font-medium mb-2 text-sm">
                Active Plan
              </h3>
              <p className="text-xl font-heading font-bold text-foreground-900">
                Pro Membership
              </p>
              <p className="text-sm text-primary-500 mt-1.5 font-medium">
                Active until Dec 2026
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-background-200">
              <h3 className="text-foreground-500 font-medium mb-2 text-sm">
                Workouts Completed
              </h3>
              <p className="text-xl font-heading font-bold text-foreground-900">
                14
              </p>
              <p className="text-sm text-foreground-400 mt-1.5">This month</p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-xl shadow-sm border border-background-200 min-h-[360px]">
            <h2 className="text-lg font-heading font-bold text-foreground-900 mb-3">
              Welcome back, {user?.name || "User"}!
            </h2>
            <p className="text-foreground-500 text-sm leading-relaxed">
              This is your dashboard. Soon you'll be able to see your full
              workout history, trainer messages, and nutrition plans here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
