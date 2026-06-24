import { Link } from 'react-router-dom';
import { Activity, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary border-t border-white/5 mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="relative">
                <Activity className="w-6 h-6 text-accent group-hover:text-accent-100 transition-colors relative z-10" />
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full group-hover:bg-accent/40 transition-colors"></div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TriageAI</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Know when to go. Know when to wait. Know why. AI-powered symptom triage
              with clinical reasoning and nearby care options.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Built by</span>
              <span className="text-gray-400">Team Ospred</span>
              <span>•</span>
              <span>Ashok Pasala</span>
              <span>•</span>
              <span>Snigdha Gorai</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/triage"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  Check Symptoms
                </Link>
              </li>
              <li>
                <Link
                  to="/tracker"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  Symptom Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent text-sm transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-surface-light flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TriageAI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-urgency-red" />
            <span>for better health decisions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
