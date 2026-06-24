import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Brain,
  Database,
  FileText,
  CheckCircle,
  Heart,
  Users,
  ArrowRight,
} from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold mb-8 shadow-[0_0_15px_rgba(0,214,143,0.1)]">
            <Shield className="w-5 h-5" />
            <span>About TriageAI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Know when to go.<br />
            Know when to wait.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-100">Know why.</span>
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
            TriageAI is an AI-powered symptom triage tool designed to help you
            make informed decisions about your health.
          </p>
        </div>

        {/* Medical Disclaimer - Important */}
        <div className="bg-urgency-red/10 border border-urgency-red/30 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-urgency-red/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-urgency-red" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Medical Disclaimer
              </h2>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-urgency-yellow">Important:</strong>{' '}
                  TriageAI is NOT a diagnostic tool. It provides guidance on the
                  urgency of seeking medical care, but it cannot and should not
                  replace professional medical advice, diagnosis, or treatment.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-urgency-yellow mt-1 flex-shrink-0" />
                    <span>
                      Always consult a qualified healthcare professional for
                      medical advice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-urgency-yellow mt-1 flex-shrink-0" />
                    <span>
                      If you're experiencing a life-threatening emergency, call
                      911 or your local emergency services immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-urgency-yellow mt-1 flex-shrink-0" />
                    <span>
                      Never disregard professional medical advice or delay
                      seeking treatment because of information from this tool
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How the AI Model Works */}
        <div className="glass-premium rounded-3xl p-8 sm:p-12 mb-10 animate-fade-in-up delay-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shadow-[0_0_15px_rgba(0,214,143,0.1)]">
              <Brain className="w-7 h-7 text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              How the AI Model Works
            </h2>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-surface/50 border border-white/5 rounded-2xl transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 border border-accent/20">
                  <Database className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  Medical Knowledge Base
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our system is built on established clinical guidelines from
                  PubMed, CDC, WHO, and other authoritative medical sources.
                </p>
              </div>

              <div className="p-6 bg-surface/50 border border-white/5 rounded-2xl transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  Pattern Recognition
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The AI analyzes symptom patterns, duration, severity, and
                  associated factors to determine urgency levels.
                </p>
              </div>

              <div className="p-6 bg-surface/50 border border-white/5 rounded-2xl transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">
                  Transparent Reasoning
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every recommendation comes with clear clinical reasoning and
                  source citations for transparency.
                </p>
              </div>
            </div>

            <div className="p-6 bg-accent/10 border border-accent/20 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>
              <div className="flex items-start gap-4 relative z-10">
                <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-bold text-white text-lg mb-2">
                    Confidence-Based Recommendations
                  </p>
                  <p className="leading-relaxed">
                    We provide confidence percentages with each verdict, so you
                    understand how certain the AI is about its recommendation.
                    Lower confidence scores indicate cases where additional
                    clinical evaluation is especially important.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="glass-premium rounded-3xl p-8 sm:p-12 mb-10 animate-fade-in-up delay-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Lock className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
            <div className="bg-surface/30 p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold text-lg mb-3">
                Data Collection & Use
              </h3>
              <p className="leading-relaxed">
                We collect the symptom information you provide to generate
                triage recommendations. This data is stored securely and used
                only to provide you with personalized guidance and track your
                symptom history over time.
              </p>
            </div>

            <div className="bg-surface/30 p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold text-lg mb-3">
                Data Security
              </h3>
              <p className="leading-relaxed">
                All data is encrypted in transit and at rest using
                industry-standard encryption protocols. We use Supabase to store your data with
                enterprise-grade security measures.
              </p>
            </div>

            <div className="bg-surface/30 p-6 rounded-2xl border border-white/5 md:col-span-2">
              <h3 className="text-white font-bold text-lg mb-3">
                Third-Party Sharing & Your Rights
              </h3>
              <p className="leading-relaxed mb-4">
                <strong className="text-accent">We never sell or share your
                health data with third parties.</strong> Your health information
                remains completely private.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Access your stored history at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Delete your data upon request</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span>Use anonymously</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms of Use */}
        <div className="glass-premium rounded-3xl p-8 sm:p-12 mb-10 animate-fade-in-up delay-400">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-urgency-yellow/10 border border-urgency-yellow/20 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <FileText className="w-7 h-7 text-urgency-yellow" />
            </div>
            <h2 className="text-3xl font-bold text-white">Terms of Use</h2>
          </div>

          <div className="text-gray-300 space-y-6">
            <p className="text-lg">
              By using TriageAI, you acknowledge and agree to the following:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-5 bg-surface/30 rounded-2xl border border-white/5">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white flex-shrink-0">
                  1
                </span>
                <span className="leading-relaxed">
                  TriageAI provides guidance, not diagnosis. It is not a
                  substitute for professional medical advice.
                </span>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface/30 rounded-2xl border border-white/5">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white flex-shrink-0">
                  2
                </span>
                <span className="leading-relaxed">
                  You will seek appropriate medical care for any health concerns,
                  especially in emergency situations.
                </span>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface/30 rounded-2xl border border-white/5">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white flex-shrink-0">
                  3
                </span>
                <span className="leading-relaxed">
                  The information provided is for informational
                  purposes only and should not be the sole basis for
                  medical decisions.
                </span>
              </div>
              <div className="flex items-start gap-4 p-5 bg-surface/30 rounded-2xl border border-white/5">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white flex-shrink-0">
                  4
                </span>
                <span className="leading-relaxed">
                  You understand the limitations of AI-based health tools and
                  will use judgment when interpreting results.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 sm:p-8 border border-accent/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">
            We believe that everyone deserves clear, evidence-based guidance
            when making decisions about their health. Too often, people turn to
            search engines and find conflicting, alarming, or misleading
            information that creates unnecessary anxiety or causes them to
            delay needed care.
          </p>
          <p className="text-gray-300 leading-relaxed">
            TriageAI aims to bridge this gap by providing transparent, cited
            clinical guidance that helps you understand when your symptoms
            require immediate attention, when you can monitor at home, and
            where to find appropriate care. We're not here to replace doctors —
            we're here to help you make better decisions about when to see one.
          </p>
        </div>

        {/* Team */}
        <div className="glass-premium rounded-3xl p-8 sm:p-12 mb-16 animate-fade-in-up delay-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <Users className="w-7 h-7 text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Team Ospred</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-surface/30 rounded-2xl border border-white/5 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-accent font-bold text-xl">AP</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Ashok Pasala</h3>
                  <p className="text-accent font-medium">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Building the user experience and backend infrastructure that
                makes TriageAI accessible, fast, and completely reliable.
              </p>
            </div>

            <div className="p-8 bg-surface/30 rounded-2xl border border-white/5 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-xl">SG</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Snigdha Gorai</h3>
                  <p className="text-blue-400 font-medium">
                    AI Integration & Health NLP
                  </p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Developing the clinical reasoning engine and advanced natural language
                processing that powers TriageAI's recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to Check Your Symptoms?
          </h2>
          <p className="text-gray-400 mb-6">
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
      </div>
    </div>
  );
}
