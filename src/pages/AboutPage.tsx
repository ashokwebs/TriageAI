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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>About TriageAI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Know when to go. Know when to wait. Know why.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-light mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              How the AI Model Works
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-medium mb-2">
                  Medical Knowledge Base
                </h3>
                <p className="text-gray-400 text-sm">
                  Our system is built on established clinical guidelines from
                  PubMed, CDC, WHO, and other authoritative medical sources.
                </p>
              </div>

              <div className="p-4 bg-primary rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-medium mb-2">
                  Pattern Recognition
                </h3>
                <p className="text-gray-400 text-sm">
                  The AI analyzes symptom patterns, duration, severity, and
                  associated factors to determine urgency levels.
                </p>
              </div>

              <div className="p-4 bg-primary rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-white font-medium mb-2">
                  Transparent Reasoning
                </h3>
                <p className="text-gray-400 text-sm">
                  Every recommendation comes with clear clinical reasoning and
                  source citations for transparency.
                </p>
              </div>
            </div>

            <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium text-white mb-1">
                    Confidence-Based Recommendations
                  </p>
                  <p className="text-sm">
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
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-light mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Privacy Policy</h2>
          </div>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-white font-medium mb-2">
                Data Collection & Use
              </h3>
              <p className="text-sm leading-relaxed">
                We collect the symptom information you provide to generate
                triage recommendations. This data is stored securely and used
                only to provide you with personalized guidance and track your
                symptom history over time.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Data Security
              </h3>
              <p className="text-sm leading-relaxed">
                All data is encrypted in transit and at rest using
                industry-standard encryption protocols. We use Supabase (a
                secure PostgreSQL-based platform) to store your data with
                enterprise-grade security measures.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Third-Party Sharing
              </h3>
              <p className="text-sm leading-relaxed">
                <strong className="text-accent">We never sell or share your
                health data with third parties.</strong> Your health information
                remains completely private and is only used to provide the
                services you've requested.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">
                Your Rights
              </h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                  <span>Access your stored symptom history at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                  <span>Delete your data upon request</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5" />
                  <span>Use the service anonymously without creating an account</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Terms of Use */}
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-light mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-urgency-yellow/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-urgency-yellow" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Terms of Use</h2>
          </div>

          <div className="text-gray-300 text-sm space-y-4">
            <p>
              By using TriageAI, you acknowledge and agree to the following:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                  1
                </span>
                <span>
                  TriageAI provides guidance, not diagnosis. It is not a
                  substitute for professional medical advice.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                  2
                </span>
                <span>
                  You will seek appropriate medical care for any health concerns,
                  especially in emergency situations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                  3
                </span>
                <span>
                  The information provided by TriageAI is for informational
                  purposes only and should not be used as the sole basis for
                  medical decisions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-light flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                  4
                </span>
                <span>
                  You understand the limitations of AI-based health tools and
                  will use judgment when interpreting results.
                </span>
              </li>
            </ul>
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
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-surface-light mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Team Ospred</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-primary rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">AP</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ashok Pasala</h3>
                  <p className="text-accent text-sm">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Building the user experience and backend infrastructure that
                makes TriageAI accessible and reliable.
              </p>
            </div>

            <div className="p-5 bg-primary rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">SG</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Snigdha Gorai</h3>
                  <p className="text-blue-400 text-sm">
                    AI Integration & Health NLP
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Developing the clinical reasoning engine and natural language
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
