import { Link } from 'react-router-dom';
import { Activity, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-6 h-6 text-accent" />
              <span className="text-lg font-bold text-white">TriageAI</span>
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
