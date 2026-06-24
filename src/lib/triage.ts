import type { SymptomFormData, TriageResult, UrgencyVerdict, Citation, CareOption } from '../types';

// Medical knowledge base for symptom triage
const urgentSymptoms = [
  'chest pain',
  'difficulty breathing',
  'severe headache',
  'stroke symptoms',
  'severe bleeding',
  'loss of consciousness',
  'severe abdominal pain',
  'high fever',
  'confusion',
  'seizure',
];

const moderateSymptoms = [
  'persistent fever',
  'moderate pain',
  'unusual fatigue',
  'persistent cough',
  'ear infection',
  'sore throat',
  'sinus infection',
  'migraine',
  'back pain',
  'joint pain',
];

const commonSymptoms = [
  'Headache',
  'Chest pain',
  'Abdominal pain',
  'Fever',
  'Cough',
  'Fatigue',
  'Nausea',
  'Dizziness',
  'Shortness of breath',
  'Sore throat',
  'Back pain',
  'Joint pain',
  'Rash',
  'Muscle aches',
  'Runny nose',
  'Ear pain',
  'Eye irritation',
  'Tooth pain',
  'Anxiety',
  'Insomnia',
];

const associatedSymptomsList = [
  'Fever or chills',
  'Nausea or vomiting',
  'Fatigue or weakness',
  'Dizziness or lightheadedness',
  'Shortness of breath',
  'Chest tightness',
  'Rapid heartbeat',
  'Sweating',
  'Loss of appetite',
  'Difficulty sleeping',
  'Muscle weakness',
  'Numbness or tingling',
  'Swelling',
  'Redness or warmth',
  'Weight loss',
  'Mood changes',
  'Confusion or disorientation',
];

const citations: Citation[] = [
  {
    source: 'PubMed',
    title: 'Clinical Decision Support for Symptom Triage',
    url: 'https://pubmed.ncbi.nlm.nih.gov/',
  },
  {
    source: 'CDC',
    title: 'When to Seek Emergency Care',
    url: 'https://www.cdc.gov/emergency-care/',
  },
  {
    source: 'WHO',
    title: 'Primary Care Guidelines',
    url: 'https://www.who.int/health-topics/primary-care',
  },
  {
    source: 'Mayo Clinic',
    title: 'Symptom Checker Guidelines',
    url: 'https://www.mayoclinic.org/symptom-checker',
  },
];

const careOptions: CareOption[] = [
  {
    name: 'City Emergency Room',
    type: 'ER',
    distance: '2.3 miles',
    address: '123 Emergency Way, Downtown',
    wait_time: '~45 min',
  },
  {
    name: 'MedExpress Urgent Care',
    type: 'URGENT_CARE',
    distance: '1.1 miles',
    address: '456 Main Street, Suite 100',
    wait_time: '~20 min',
  },
  {
    name: 'Downtown Family Practice',
    type: 'GP',
    distance: '0.8 miles',
    address: '789 Health Avenue, Floor 2',
    wait_time: 'By appointment',
  },
];

export function generateTriageResult(data: SymptomFormData): TriageResult {
  const mainSymptomLower = data.mainSymptom.toLowerCase();

  let urgencyVerdict: UrgencyVerdict;
  let reasoning: string;

  const hasUrgent = urgentSymptoms.some(s => mainSymptomLower.includes(s));
  const hasModerate = moderateSymptoms.some(s => mainSymptomLower.includes(s));

  if (hasUrgent || data.severity >= 8) {
    urgencyVerdict = 'GO_NOW';
    reasoning = generateReasoning('GO_NOW', data);
  } else if (hasModerate || data.severity >= 5) {
    urgencyVerdict = 'SEE_THIS_WEEK';
    reasoning = generateReasoning('SEE_THIS_WEEK', data);
  } else {
    urgencyVerdict = 'MONITOR_HOME';
    reasoning = generateReasoning('MONITOR_HOME', data);
  }

  const confidencePercentage = calculateConfidence(data, urgencyVerdict);

  const relevantCitations = citations.slice(0, Math.floor(Math.random() * 2) + 2);

  return {
    urgencyVerdict,
    confidencePercentage,
    reasoning,
    citations: relevantCitations,
    careOptions: careOptions.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)),
  };
}

function generateReasoning(verdict: UrgencyVerdict, data: SymptomFormData): string {
  const duration = data.duration;
  const severity = data.severity;
  const associated = data.associatedSymptoms.length;

  if (verdict === 'GO_NOW') {
    return `Based on your report of ${data.mainSymptom.toLowerCase()} with a severity of ${severity}/10, this symptom pattern suggests the need for immediate medical evaluation. ${associated > 0 ? `The presence of ${data.associatedSymptoms.length} additional symptom(s) further supports urgent assessment.` : ''} ${duration !== 'less than 24 hours' ? `The duration of ${duration} combined with severity warrants prompt attention.` : 'While this may be a new onset, the severity level requires immediate evaluation to rule out serious conditions.'} Emergency services are recommended given the clinical indicators present.`;
  }

  if (verdict === 'SEE_THIS_WEEK') {
    return `Your ${data.mainSymptom.toLowerCase()} with ${severity}/10 severity indicates a moderate concern that should be evaluated within the next few days. ${associated > 0 ? `The associated symptoms you reported (${data.associatedSymptoms.length} additional) suggest this isn't likely to resolve on its own quickly.` : ''} ${duration !== 'less than 24 hours' ? `Since this has been ongoing for ${duration}, professional evaluation is advised.` : 'While early in onset, the severity level warrants a medical opinion to prevent worsening.'} Schedule an appointment with your primary care physician or visit an urgent care facility.`;
  }

  return `Your ${data.mainSymptom.toLowerCase()} at ${severity}/10 severity appears to be a mild concern that can likely be managed at home initially. ${associated > 0 ? `The ${data.associatedSymptoms.length} associated symptom(s) you noted are common with this type of complaint.` : ''} Monitor for changes in severity or new symptoms developing. ${duration !== 'less than 24 hours' ? `If symptoms persist beyond expected timelines for ${duration}, consider scheduling a routine appointment.` : 'Most mild symptoms of this nature resolve within a few days with appropriate self-care.'} If symptoms worsen significantly, re-evaluate using TriageAI or seek medical attention.`;
}

function calculateConfidence(data: SymptomFormData, verdict: UrgencyVerdict): number {
  let base = 75;

  if (data.medicalConditions && data.medicalConditions.length > 0) base += 5;
  if (data.ageRange) base += 3;
  if (data.associatedSymptoms.length > 0) base += 5;
  if (data.associatedSymptoms.length > 2) base += 3;

  if (verdict === 'GO_NOW') base += 10;

  base = Math.min(base, 94);
  base = Math.max(base, 65);

  return base;
}

export function getUrgencyLabel(verdict: UrgencyVerdict): string {
  switch (verdict) {
    case 'GO_NOW': return 'Go Now';
    case 'SEE_THIS_WEEK': return 'See Someone This Week';
    case 'MONITOR_HOME': return 'Monitor at Home';
  }
}

export function getUrgencyColor(verdict: UrgencyVerdict): string {
  switch (verdict) {
    case 'GO_NOW': return 'bg-urgency-red';
    case 'SEE_THIS_WEEK': return 'bg-urgency-yellow';
    case 'MONITOR_HOME': return 'bg-urgency-green';
  }
}

export function getUrgencyTextColor(verdict: UrgencyVerdict): string {
  switch (verdict) {
    case 'GO_NOW': return 'text-urgency-red';
    case 'SEE_THIS_WEEK': return 'text-urgency-yellow';
    case 'MONITOR_HOME': return 'text-urgency-green';
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'Active';
    case 'RESOLVED': return 'Resolved';
    case 'WORSING': return 'Worsening';
    case 'STABLE': return 'Stable';
    default: return 'Unknown';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'text-urgency-yellow';
    case 'RESOLVED': return 'text-urgency-green';
    case 'WORSING': return 'text-urgency-red';
    case 'STABLE': return 'text-blue-400';
    default: return 'text-gray-400';
  }
}

export { commonSymptoms, associatedSymptomsList };
