import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Search,
  Brain,
  FileText,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Heart,
  Zap,
  Users,
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background gradient and animated orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-surface" />
        <div className="bg-orb w-[600px] h-[600px] bg-accent/20 top-[-200px] left-[-200px] animate-float delay-100" />
        <div className="bg-orb w-[800px] h-[800px] bg-blue-500/10 bottom-[-300px] right-[-200px] animate-float delay-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,214,143,0.08),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8 animate-fade-in-up">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Clinical Triage</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up delay-100 drop-shadow-2xl">
              <span className="text-white">Triage</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-100">AI</span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl sm:text-3xl text-gray-200 max-w-3xl mx-auto mb-6 animate-fade-in-up delay-200 font-medium">
              Know when to go. Know when to wait. Know why.
            </p>

            {/* Description */}
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 animate-fade-in-up delay-300 leading-relaxed">
              Get clear urgency verdicts with cited clinical reasoning and nearby
              care options — no panic, no guesswork.
            </p>

            {/* CTA */}
            <div className="animate-fade-in-up delay-400">
              <Link
                to="/triage"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold text-lg rounded-2xl hover:bg-accent-100 transition-all transform hover:scale-105 hover:-translate-y-1 glow-accent shadow-xl"
              >
                <span>Check Your Symptoms</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Stat Section */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-urgency-yellow/10 border border-urgency-yellow/20 mb-6">
              <AlertTriangle className="w-8 h-8 text-urgency-yellow" />
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <span className="text-urgency-yellow">77%</span> of patients Google
              symptoms before seeing a doctor
            </p>
            <p className="text-xl text-gray-400">
              — and get 20 conflicting answers that lead to anxiety and confusion
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Three simple steps to clarity and action
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group animate-fade-in-up delay-100">
              <div className="glass-premium rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,214,143,0.3)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Search className="w-7 h-7 text-accent" />
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-accent/20 transition-colors">01</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Describe</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Tell us your main symptom, how long you've had it, and how severe it
                  feels. Add any associated symptoms.
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-accent/20 group-hover:text-accent/60 transition-colors duration-500 group-hover:translate-x-2" />
            </div>

            {/* Step 2 */}
            <div className="relative group animate-fade-in-up delay-200">
              <div className="glass-premium rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,214,143,0.3)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Brain className="w-7 h-7 text-accent" />
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-accent/20 transition-colors">02</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Get Verdict</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Our AI analyzes your input and provides a clear urgency verdict with
                  cited clinical reasoning.
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-accent/20 group-hover:text-accent/60 transition-colors duration-500 group-hover:translate-x-2" />
            </div>

            {/* Step 3 */}
            <div className="relative group animate-fade-in-up delay-300">
              <div className="glass-premium rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,214,143,0.3)] h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-accent/20 transition-colors">03</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Find Care</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Get nearby care options tailored to your urgency level — ER, urgent
                  care, or schedule with your GP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-light/30 skew-y-3 transform origin-bottom-left" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Everything you need to make informed health decisions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Symptom Intake */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all shadow-[0_0_15px_rgba(0,214,143,0.1)] group-hover:shadow-[0_0_25px_rgba(0,214,143,0.3)]">
                <Activity className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Symptom Intake
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Guided multi-step form to capture all relevant symptom information
                accurately and efficiently.
              </p>
            </div>

            {/* Urgency Scoring */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-urgency-yellow/10 border border-urgency-yellow/20 flex items-center justify-center mb-6 group-hover:bg-urgency-yellow/20 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                <Zap className="w-7 h-7 text-urgency-yellow" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Urgency Scoring
              </h3>
              <p className="text-gray-400 leading-relaxed">
                AI-powered analysis to determine the precise level of care required for your
                unique situation.
              </p>
            </div>

            {/* Cited Reasoning */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                <FileText className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Cited Reasoning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Clear explanations backed by PubMed, WHO, and CDC clinical sources for total transparency.
              </p>
            </div>

            {/* Care Locator */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-urgency-red/10 border border-urgency-red/20 flex items-center justify-center mb-6 group-hover:bg-urgency-red/20 transition-all shadow-[0_0_15px_rgba(244,63,94,0.1)] group-hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]">
                <MapPin className="w-7 h-7 text-urgency-red" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Care Locator</h3>
              <p className="text-gray-400 leading-relaxed">
                Find nearby ERs, urgent care centers, and primary care providers
                instantly.
              </p>
            </div>

            {/* Symptom Tracker */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all shadow-[0_0_15px_rgba(0,214,143,0.1)] group-hover:shadow-[0_0_25px_rgba(0,214,143,0.3)]">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Symptom Tracker
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor your symptoms over time, record changes, and update their status seamlessly.
              </p>
            </div>

            {/* Confidence Score */}
            <div className="glass-premium rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <Shield className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Confidence Score
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Transparent confidence percentages so you know exactly how certain the AI is
                about its verdict.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-surface to-surface-light rounded-3xl p-8 sm:p-12 border border-surface-light">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  <span>Important Notice</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Not a Diagnosis. A Direction.
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  TriageAI is designed to help you understand the urgency of your
                  symptoms and make informed decisions about where to seek care.
                  It is not a replacement for professional medical advice.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">
                      Helps you decide when and where to seek care
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">
                      Provides cited clinical reasoning for transparency
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">
                      Reduces anxiety and guesswork about your symptoms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-urgency-yellow mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">
                      Always consult a healthcare professional for diagnosis
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary rounded-2xl p-8 border border-surface-light">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-urgency-red" />
                  <h3 className="text-xl font-semibold text-white">
                    Your Health, Your Data
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Privacy First</p>
                      <p className="text-gray-400 text-sm">
                        Your health data is encrypted and never shared with third
                        parties
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Transparent AI</p>
                      <p className="text-gray-400 text-sm">
                        Every recommendation comes with clear sources and confidence
                        scores
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Emergency Override</p>
                      <p className="text-gray-400 text-sm">
                        Clear warnings when symptoms require immediate emergency
                        attention
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-accent/20 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Check Your Symptoms?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Get a clear urgency verdict in under 2 minutes.
          </p>
          <Link
            to="/triage"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 transition-all transform hover:scale-105 glow-accent"
          >
            <span>Start Symptom Check</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-white">Team Ospred</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="px-4 py-2 rounded-lg bg-primary">
              <span className="font-medium text-white">Ashok Pasala</span>
              <span className="text-sm ml-2">— Full Stack Developer</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-primary">
              <span className="font-medium text-white">Snigdha Gorai</span>
              <span className="text-sm ml-2">— AI Integration & Health NLP</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
