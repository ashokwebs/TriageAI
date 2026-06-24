import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Activity,
  Shield,
  Building2,
  Stethoscope,
  Heart,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { getSymptomEntry } from '../lib/api';
import type { SymptomEntry } from '../types';
import {
  getUrgencyLabel,
  getUrgencyColor,
} from '../lib/triage';

export function TriageResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<SymptomEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (!id) {
        setError('No entry ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getSymptomEntry(id);
        if (!data) {
          setError('Entry not found');
        } else {
          setEntry(data);
        }
      } catch (err) {
        setError('Failed to load triage result');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const getCareTypeIcon = (type: string) => {
    switch (type) {
      case 'ER':
        return <AlertTriangle className="w-5 h-5" />;
      case 'URGENT_CARE':
        return <Clock className="w-5 h-5" />;
      case 'GP':
        return <Stethoscope className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const getCareTypeColor = (type: string) => {
    switch (type) {
      case 'ER':
        return 'bg-urgency-red/10 text-urgency-red border-urgency-red/30';
      case 'URGENT_CARE':
        return 'bg-urgency-yellow/10 text-urgency-yellow border-urgency-yellow/30';
      case 'GP':
        return 'bg-accent/10 text-accent border-accent/30';
      default:
        return 'bg-surface-light text-gray-400';
    }
  };

  const getCareTypeLabel = (type: string) => {
    switch (type) {
      case 'ER':
        return 'Emergency Room';
      case 'URGENT_CARE':
        return 'Urgent Care';
      case 'GP':
        return 'General Practice';
      default:
        return 'Medical Facility';
    }
  };

  const getGlowClass = (verdict: string) => {
    switch (verdict) {
      case 'GO_NOW':
        return 'glow-red';
      case 'SEE_THIS_WEEK':
        return 'glow-yellow';
      case 'MONITOR_HOME':
        return 'glow-accent';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your triage result...</p>
        </div>
      </div>
    );
  }

  if (error || !entry) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-urgency-yellow mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            {error || 'Entry not found'}
          </h1>
          <p className="text-gray-400 mb-6">
            We couldn't find the triage result you're looking for.
          </p>
          <Link
            to="/triage"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 transition-all"
          >
            <span>Check Your Symptoms</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Verdict Card */}
        <div
          className={`rounded-3xl p-8 sm:p-10 mb-10 border transition-all duration-700 animate-fade-in-up ${getUrgencyColor(
            entry.urgency_verdict
          )} ${getGlowClass(entry.urgency_verdict)} border-white/10 shadow-2xl relative overflow-hidden`}
        >
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm z-0"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>

          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
            <div className="flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-xl border border-white/20 animate-[float_4s_ease-in-out_infinite]">
                {entry.urgency_verdict === 'GO_NOW' ? (
                  <AlertTriangle className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md" />
                ) : entry.urgency_verdict === 'SEE_THIS_WEEK' ? (
                  <Clock className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md" />
                ) : (
                  <Shield className="w-14 h-14 sm:w-16 sm:h-16 text-white drop-shadow-md" />
                )}
              </div>
            </div>

            <div className="text-center sm:text-left flex-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
                {getUrgencyLabel(entry.urgency_verdict)}
              </h1>
              <p className="text-white/90 text-xl mb-6 font-medium">
                {entry.urgency_verdict === 'GO_NOW'
                  ? 'Seek emergency care immediately'
                  : entry.urgency_verdict === 'SEE_THIS_WEEK'
                  ? 'Schedule an appointment within the next few days'
                  : 'Monitor your symptoms at home'}
              </p>

              {/* Confidence Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-md border border-white/10 shadow-lg">
                <Activity className="w-4 h-4" />
                <span>
                  <span className="font-bold text-base">
                    {entry.confidence_percentage}%
                  </span>{' '}
                  confidence
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          {entry.urgency_verdict === 'GO_NOW' && (
            <div className="mt-8 p-5 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-md relative z-10">
              <p className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                If this is a life-threatening emergency, call 911 immediately.
              </p>
              <p className="text-white/80 text-base">
                Do not drive yourself to the hospital if you're experiencing severe
                symptoms.
              </p>
            </div>
          )}
        </div>

        {/* Symptom Summary Card */}
        <div className="glass-premium rounded-3xl p-8 mb-8 animate-fade-in-up delay-100">
          <h2 className="text-xl font-bold text-white mb-6">
            Your Symptom Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 bg-surface/50 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-sm mb-2 font-medium">Main Symptom</p>
              <p className="text-white font-semibold text-lg">{entry.main_symptom}</p>
            </div>
            <div className="p-5 bg-surface/50 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-sm mb-2 font-medium">Duration</p>
              <p className="text-white font-semibold text-lg">{entry.duration}</p>
            </div>
            <div className="p-5 bg-surface/50 rounded-2xl border border-white/5">
              <p className="text-gray-400 text-sm mb-2 font-medium">Severity</p>
              <div className="flex items-center gap-2">
                <p className="text-white font-semibold text-lg">{entry.severity}/10</p>
                <div className="flex-1 h-1.5 bg-surface-lighter rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${(entry.severity / 10) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {entry.associated_symptoms.length > 0 && (
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-gray-400 text-sm mb-3 font-medium">Associated Symptoms</p>
              <div className="flex flex-wrap gap-2">
                {entry.associated_symptoms.map((symptom) => (
                  <span
                    key={symptom}
                    className="px-4 py-1.5 bg-surface/50 rounded-full text-gray-300 text-sm border border-white/5"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Reasoning */}
        <div className="glass-premium rounded-3xl p-8 mb-8 animate-fade-in-up delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Clinical Reasoning
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed">{entry.reasoning}</p>
        </div>

        {/* Citations */}
        <div className="glass-premium rounded-3xl p-8 mb-8 animate-fade-in-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">Source Citations</h2>
          </div>
          <div className="space-y-3">
            {entry.citations.map((citation, idx) => (
              <a
                key={idx}
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-primary rounded-xl hover:bg-surface-light transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-semibold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{citation.title}</p>
                    <p className="text-gray-400 text-sm">{citation.source}</p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Nearby Care Options */}
        <div className="mb-10 animate-fade-in-up delay-400">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-urgency-red/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-urgency-red" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Nearby Care Options
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {entry.care_options.map((option, idx) => (
              <div
                key={idx}
                className={`glass-premium rounded-2xl p-6 transition-all hover:-translate-y-1 ${getCareTypeColor(
                  option.type
                )}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {getCareTypeIcon(option.type)}
                  <span className="text-sm font-medium">
                    {getCareTypeLabel(option.type)}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{option.name}</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {option.address}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-accent">{option.distance}</span>
                    {option.wait_time && (
                      <>
                        <span>•</span>
                        <span>{option.wait_time}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="mt-4 bg-surface-light rounded-xl p-8 flex items-center justify-center border border-surface-light">
            <div className="text-center text-gray-500">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p>Map integration coming soon</p>
            </div>
          </div>
        </div>

        {/* Track Button */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-accent" />
              <div>
                <h2 className="text-white font-semibold">Track this symptom</h2>
                <p className="text-gray-400 text-sm">
                  Monitor changes and updates over time
                </p>
              </div>
            </div>
            <Link
              to="/tracker"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 transition-all whitespace-nowrap"
            >
              <span>View Tracker</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-urgency-yellow/10 border border-urgency-yellow/30 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-urgency-yellow mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-urgency-yellow font-medium mb-1">
                Medical Disclaimer
              </p>
              <p className="text-gray-300">
                TriageAI provides guidance, not diagnosis. Always consult a
                healthcare professional for medical advice. If you're experiencing a
                life-threatening emergency, call 911 immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
