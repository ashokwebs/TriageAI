import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  Activity,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  User,
  CheckCircle2,
  X,
} from 'lucide-react';
import { saveSymptomEntry, generateTriageResult } from '../lib/api';
import type { SymptomFormData } from '../types';
import { commonSymptoms, associatedSymptomsList } from '../lib/triage';

const TOTAL_STEPS = 4;

const durations = [
  { value: 'less than 24 hours', label: '< 24 hours' },
  { value: '1-3 days', label: '1-3 days' },
  { value: '4-7 days', label: '4-7 days' },
  { value: 'more than a week', label: '> 1 week' },
  { value: 'more than a month', label: '> 1 month' },
];

const ageRanges = [
  { value: 'under_18', label: 'Under 18' },
  { value: '18_30', label: '18-30' },
  { value: '31_50', label: '31-50' },
  { value: '51_65', label: '51-65' },
  { value: 'over_65', label: '65+' },
];

const commonConditions = [
  'Diabetes',
  'Heart disease',
  'High blood pressure',
  'Asthma',
  'COPD',
  'Thyroid disorder',
  'Autoimmune condition',
  'Cancer (current or history)',
  'Pregnancy',
];

export function SymptomIntakePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SymptomFormData>({
    mainSymptom: '',
    duration: '',
    severity: 5,
    associatedSymptoms: [],
    ageRange: '',
    medicalConditions: [],
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');

  const filteredSymptoms = searchQuery
    ? commonSymptoms.filter((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : commonSymptoms;

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.mainSymptom.length > 0;
      case 2:
        return formData.duration.length > 0 && formData.severity >= 1;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSymptomSelect = (symptom: string) => {
    setFormData({ ...formData, mainSymptom: symptom });
    setSearchQuery('');
  };

  const handleCustomSymptom = () => {
    if (customSymptom.trim()) {
      setFormData({ ...formData, mainSymptom: customSymptom.trim() });
      setCustomSymptom('');
      setSearchQuery('');
    }
  };

  const toggleAssociatedSymptom = (symptom: string) => {
    const current = formData.associatedSymptoms;
    if (current.includes(symptom)) {
      setFormData({
        ...formData,
        associatedSymptoms: current.filter((s) => s !== symptom),
      });
    } else {
      setFormData({
        ...formData,
        associatedSymptoms: [...current, symptom],
      });
    }
  };

  const toggleCondition = (condition: string) => {
    const current = formData.medicalConditions || [];
    if (current.includes(condition)) {
      setFormData({
        ...formData,
        medicalConditions: current.filter((c) => c !== condition),
      });
    } else {
      setFormData({
        ...formData,
        medicalConditions: [...current, condition],
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = generateTriageResult(formData);
      const entry = await saveSymptomEntry(formData, result);
      navigate(`/result/${entry.id}`);
    } catch (err) {
      setError('Failed to process your symptoms. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stepLabels = ['Symptom', 'Duration', 'Details', 'History'];

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Symptom Intake
          </h1>
          <p className="text-gray-400">
            Let's understand what you're experiencing
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, idx) => (
              <div
                key={label}
                className={`flex-1 text-center transition-colors duration-500 ${
                  idx + 1 <= step ? 'text-accent font-semibold drop-shadow-[0_0_8px_rgba(0,214,143,0.5)]' : 'text-gray-500'
                }`}
              >
                <div className="text-xs sm:text-sm">{label}</div>
              </div>
            ))}
          </div>
          <div className="h-2.5 bg-surface-light rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-accent-50 to-accent transition-all duration-700 shadow-[0_0_10px_rgba(0,214,143,0.8)] relative"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
            <span>Step {step} of {TOTAL_STEPS}</span>
            <span className="text-accent">{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-premium rounded-3xl p-6 sm:p-10 transition-all duration-300 animate-fade-in-up delay-100 relative overflow-hidden">
          {/* Subtle background glow based on step */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
          {/* Step 1: Main Symptom */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Primary Chief Complaint
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Search or select from common clinical presentations
                  </p>
                </div>
              </div>

              {/* Selected Symptom */}
              {formData.mainSymptom && (
                <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/30 rounded-xl">
                  <span className="text-white font-medium">
                    {formData.mainSymptom}
                  </span>
                  <button
                    onClick={() =>
                      setFormData({ ...formData, mainSymptom: '' })
                    }
                    className="p-1 hover:bg-accent/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-accent" />
                  </button>
                </div>
              )}

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chief complaints..."
                  className="w-full pl-12 pr-4 py-3 bg-primary border border-surface-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Symptom Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => handleSymptomSelect(symptom)}
                    className={`px-4 py-3 rounded-xl text-left text-sm transition-all duration-300 ${
                      formData.mainSymptom === symptom
                        ? 'bg-accent text-primary font-bold shadow-[0_0_15px_rgba(0,214,143,0.4)] scale-[1.02]'
                        : 'bg-surface-light/50 border border-white/5 text-gray-300 hover:border-accent/50 hover:bg-surface-light hover:text-white hover:-translate-y-0.5'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              {/* Custom Symptom Input */}
              <div className="pt-4 border-t border-surface-light">
                <label className="block text-sm text-gray-400 mb-2">
                  Or enter a custom symptom:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customSymptom}
                    onChange={(e) => setCustomSymptom(e.target.value)}
                    placeholder="Describe your symptom..."
                    className="flex-1 px-4 py-3 bg-primary border border-surface-light rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                  />
                  <button
                    onClick={handleCustomSymptom}
                    disabled={!customSymptom.trim()}
                    className="px-4 py-3 bg-accent text-primary font-medium rounded-xl hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Duration & Severity */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-urgency-yellow/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-urgency-yellow" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    How long and how severe?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Duration and intensity of your symptom
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Symptom Duration (Onset)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {durations.map((d) => (
                    <button
                      key={d.value}
                      onClick={() =>
                        setFormData({ ...formData, duration: d.value })
                      }
                      className={`px-4 py-3 rounded-xl text-sm transition-all ${
                        formData.duration === d.value
                          ? 'bg-urgency-yellow text-primary font-medium'
                          : 'bg-primary border border-surface-light text-gray-300 hover:border-urgency-yellow hover:text-white'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Clinical Severity Scale (1-10)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        severity: parseInt(e.target.value),
                      })
                    }
                    className="flex-1 h-2 bg-surface-light rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold ${
                      formData.severity >= 8
                        ? 'bg-urgency-red/20 text-urgency-red'
                        : formData.severity >= 5
                        ? 'bg-urgency-yellow/20 text-urgency-yellow'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {formData.severity}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 mb-4">
                  <span>Mild (1-4)</span>
                  <span>Moderate (5-7)</span>
                  <span>Severe (8-10)</span>
                </div>
                {formData.severity >= 8 && (
                  <div className="mt-2 flex items-start gap-2 p-3 bg-urgency-red/10 border border-urgency-red/20 rounded-lg animate-fade-in-up">
                    <AlertCircle className="w-4 h-4 text-urgency-red mt-0.5" />
                    <span className="text-sm text-urgency-red">Severe pain or symptoms often require immediate medical evaluation. Please consider proceeding directly to an emergency department.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Associated Symptoms */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Any associated symptoms?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Select all that apply (optional)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-2">
                {associatedSymptomsList.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleAssociatedSymptom(symptom)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${
                      formData.associatedSymptoms.includes(symptom)
                        ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                        : 'bg-primary border border-surface-light text-gray-300 hover:border-blue-500/30'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                        formData.associatedSymptoms.includes(symptom)
                          ? 'bg-blue-500'
                          : 'bg-surface-light'
                      }`}
                    >
                      {formData.associatedSymptoms.includes(symptom) && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{symptom}</span>
                  </button>
                ))}
              </div>

              {formData.associatedSymptoms.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-light">
                  <span className="text-sm text-gray-400">Selected:</span>
                  {formData.associatedSymptoms.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Medical History */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Any relevant history?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    This helps improve accuracy (optional)
                  </p>
                </div>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Patient Age Demographic
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {ageRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          ageRange:
                            formData.ageRange === range.value ? '' : range.value,
                        })
                      }
                      className={`px-3 py-3 rounded-xl text-sm transition-all ${
                        formData.ageRange === range.value
                          ? 'bg-purple-500 text-white font-medium'
                          : 'bg-primary border border-surface-light text-gray-300 hover:border-purple-500'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medical Conditions */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Pre-existing Clinical Conditions (Comorbidities)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {commonConditions.map((condition) => (
                    <button
                      key={condition}
                      onClick={() => toggleCondition(condition)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                        formData.medicalConditions?.includes(condition)
                          ? 'bg-purple-500/20 border border-purple-500/30 text-white'
                          : 'bg-primary border border-surface-light text-gray-300 hover:border-purple-500/30'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                          formData.medicalConditions?.includes(condition)
                            ? 'bg-purple-500'
                            : 'bg-surface-light'
                        }`}
                      >
                        {formData.medicalConditions?.includes(condition) && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-left">{condition}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="p-4 bg-surface-light rounded-xl border border-surface-lighter">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-300">
                      This information helps our AI provide more accurate triage
                      recommendations. Your data is encrypted and never shared with
                      third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-urgency-red/10 border border-urgency-red/30 rounded-xl">
              <p className="text-urgency-red text-sm">{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-light">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>Get Triage Result</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
