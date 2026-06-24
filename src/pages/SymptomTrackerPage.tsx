import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  ChevronRight,
  Plus,
  AlertTriangle,
  CheckCircle,
  Activity,
  RefreshCw,
  X,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { getSymptomEntries, updateSymptomEntryStatus } from '../lib/api';
import type { SymptomEntry } from '../types';
import {
  getUrgencyLabel,
  getStatusLabel,
  getStatusColor,
} from '../lib/triage';

export function SymptomTrackerPage() {
  const [entries, setEntries] = useState<SymptomEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateModalEntry, setUpdateModalEntry] = useState<SymptomEntry | null>(
    null
  );

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getSymptomEntries();
        setEntries(data);
      } catch (err) {
        setError('Failed to load symptom entries');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateSymptomEntryStatus(
        id,
        newStatus as SymptomEntry['status']
      );
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? { ...entry, status: newStatus as SymptomEntry['status'] }
            : entry
        )
      );
      setUpdateModalEntry(null);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getUrgencyBgColor = (verdict: string) => {
    switch (verdict) {
      case 'GO_NOW':
        return 'bg-urgency-red';
      case 'SEE_THIS_WEEK':
        return 'bg-urgency-yellow';
      case 'MONITOR_HOME':
        return 'bg-urgency-green';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your symptom history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Symptom Tracker
            </h1>
            <p className="text-gray-400">
              Monitor your symptoms over time and track changes
            </p>
          </div>
          <Link
            to="/triage"
            className="flex items-center gap-2 px-5 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>New Check</span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-urgency-red/10 border border-urgency-red/30 rounded-xl">
            <p className="text-urgency-red">{error}</p>
          </div>
        )}

        {entries.length === 0 ? (
          <div className="bg-surface rounded-2xl p-12 border border-surface-light text-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              No symptoms tracked yet
            </h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start by checking your symptoms. We'll keep a record so you can
              monitor changes over time.
            </p>
            <Link
              to="/triage"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 transition-all"
            >
              <span>Check Your Symptoms</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, idx) => (
              <div
                key={entry.id}
                className="bg-surface rounded-xl border border-surface-light overflow-hidden hover:border-surface-lighter transition-colors"
              >
                {/* Timeline connector */}
                <div className="relative">
                  {idx < entries.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-surface-light" />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-primary flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {new Date(entry.created_at).getDate()}
                        </span>
                        <span className="text-xs text-gray-400 uppercase">
                          {new Date(entry.created_at).toLocaleDateString(
                            'en-US',
                            { month: 'short' }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Link
                          to={`/result/${entry.id}`}
                          className="text-lg font-semibold text-white hover:text-accent transition-colors"
                        >
                          {entry.main_symptom}
                        </Link>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getUrgencyBgColor(
                            entry.urgency_verdict
                          )} text-white`}
                        >
                          {getUrgencyLabel(entry.urgency_verdict)}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium bg-primary border ${getStatusColor(
                            entry.status
                          )} border-current`}
                        >
                          {getStatusLabel(entry.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatTime(entry.created_at)}
                        </span>
                        <span>Severity: {entry.severity}/10</span>
                        <span>{entry.duration}</span>
                      </div>

                      {entry.associated_symptoms.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {entry.associated_symptoms.slice(0, 3).map((symptom) => (
                            <span
                              key={symptom}
                              className="px-2 py-0.5 bg-primary rounded text-xs text-gray-400"
                            >
                              {symptom}
                            </span>
                          ))}
                          {entry.associated_symptoms.length > 3 && (
                            <span className="px-2 py-0.5 text-xs text-gray-500">
                              +{entry.associated_symptoms.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => setUpdateModalEntry(entry)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-surface-light rounded-lg transition-colors"
                        title="Update status"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <Link
                        to={`/result/${entry.id}`}
                        className="p-2 text-gray-400 hover:text-accent hover:bg-surface-light rounded-lg transition-colors"
                        title="View details"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div className="mt-4 pt-4 border-t border-surface-light">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">AI Confidence</span>
                      <span className="text-white font-medium">
                        {entry.confidence_percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-primary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getUrgencyBgColor(
                          entry.urgency_verdict
                        )} transition-all`}
                        style={{ width: `${entry.confidence_percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {entries.length > 0 && (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface rounded-xl p-4 border border-surface-light">
              <p className="text-gray-400 text-sm mb-1">Total Checks</p>
              <p className="text-2xl font-bold text-white">{entries.length}</p>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-surface-light">
              <p className="text-gray-400 text-sm mb-1">Resolved</p>
              <p className="text-2xl font-bold text-urgency-green">
                {entries.filter((e) => e.status === 'RESOLVED').length}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-surface-light">
              <p className="text-gray-400 text-sm mb-1">Active</p>
              <p className="text-2xl font-bold text-urgency-yellow">
                {entries.filter((e) => e.status === 'ACTIVE').length}
              </p>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-surface-light">
              <p className="text-gray-400 text-sm mb-1">First Check</p>
              <p className="text-lg font-bold text-white">
                {entries.length > 0
                  ? formatDate(entries[entries.length - 1].created_at)
                  : '-'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {updateModalEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl p-6 max-w-md w-full border border-surface-light">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Update Status
              </h2>
              <button
                onClick={() => setUpdateModalEntry(null)}
                className="p-1 hover:bg-surface-light rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              How has "{updateModalEntry.main_symptom}" changed?
            </p>

            <div className="space-y-2">
              <button
                onClick={() =>
                  handleStatusUpdate(updateModalEntry.id, 'RESOLVED')
                }
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  updateModalEntry.status === 'RESOLVED'
                    ? 'bg-urgency-green/20 border border-urgency-green/40'
                    : 'bg-primary border border-surface-light hover:border-urgency-green/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-urgency-green/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-urgency-green" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Resolved</p>
                  <p className="text-gray-400 text-sm">Symptoms have gone away</p>
                </div>
              </button>

              <button
                onClick={() => handleStatusUpdate(updateModalEntry.id, 'STABLE')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  updateModalEntry.status === 'STABLE'
                    ? 'bg-blue-500/20 border border-blue-500/40'
                    : 'bg-primary border border-surface-light hover:border-blue-500/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Stable</p>
                  <p className="text-gray-400 text-sm">
                    No change in symptoms
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  handleStatusUpdate(updateModalEntry.id, 'WORSING')
                }
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  updateModalEntry.status === 'WORSING'
                    ? 'bg-urgency-red/20 border border-urgency-red/40'
                    : 'bg-primary border border-surface-light hover:border-urgency-red/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-urgency-red/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-urgency-red" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Worsening</p>
                  <p className="text-gray-400 text-sm">
                    Symptoms are getting worse
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleStatusUpdate(updateModalEntry.id, 'ACTIVE')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                  updateModalEntry.status === 'ACTIVE'
                    ? 'bg-urgency-yellow/20 border border-urgency-yellow/40'
                    : 'bg-primary border border-surface-light hover:border-urgency-yellow/40'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-urgency-yellow/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-urgency-yellow" />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">Active</p>
                  <p className="text-gray-400 text-sm">Still monitoring</p>
                </div>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-surface-light">
              <Link
                to="/triage"
                className="flex items-center justify-center gap-2 w-full p-3 bg-accent text-primary font-medium rounded-xl hover:bg-accent-100 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-triage with updated symptoms</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
