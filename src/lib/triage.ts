import type { SymptomFormData, TriageResult, UrgencyVerdict, Citation, CareOption } from '../types';

// Medical knowledge base for symptom triage
const urgentSymptoms = [
  'chest pain',
  'crushing chest pressure',
  'difficulty breathing',
  'severe shortness of breath',
  'severe headache',
  'sudden severe "thunderclap" headache',
  'stroke symptoms',
  'sudden facial drooping',
  'unilateral weakness',
  'severe bleeding',
  'loss of consciousness',
  'syncope',
  'severe abdominal pain',
  'acute rigid abdomen',
  'high fever with stiff neck',
  'confusion or altered mental status',
  'seizure',
  'anaphylaxis',
  'coughing up blood',
  'sudden vision loss'
];

const moderateSymptoms = [
  'persistent fever',
  'moderate pain',
  'unusual fatigue',
  'persistent cough',
  'productive cough with colored sputum',
  'ear infection',
  'sore throat with white patches',
  'sinus infection',
  'migraine',
  'localized back pain',
  'joint pain with swelling',
  'unexplained weight loss',
  'persistent nausea or vomiting',
  'urinary tract infection symptoms'
];

const commonSymptoms = [
  'Abdominal pain',
  'Anxiety',
  'Back pain',
  'Chest pain',
  'Cough',
  'Diarrhea',
  'Dizziness',
  'Ear pain',
  'Eye irritation',
  'Fatigue',
  'Fever',
  'Headache',
  'Insomnia',
  'Joint pain',
  'Muscle aches',
  'Nausea',
  'Palpitations',
  'Rash',
  'Runny nose',
  'Shortness of breath',
  'Sinus congestion',
  'Sore throat',
  'Tooth pain',
  'Vertigo',
  'Vomiting'
];

const associatedSymptomsList = [
  'Altered mental status',
  'Chest tightness or pressure',
  'Chills or rigors',
  'Confusion or disorientation',
  'Difficulty swallowing (Dysphagia)',
  'Dizziness or lightheadedness',
  'Fatigue or weakness',
  'Fever',
  'Loss of appetite (Anorexia)',
  'Loss of taste or smell',
  'Muscle weakness',
  'Nausea',
  'Numbness or tingling (Neuropathy)',
  'Pain radiating to arm or jaw',
  'Palpitations or rapid heartbeat',
  'Shortness of breath (Dyspnea)',
  'Sweating (Diaphoresis)',
  'Swelling (Edema)',
  'Visual disturbances',
  'Vomiting',
  'Wheezing'
];

const citations: Citation[] = [
  {
    source: 'JAMA Network',
    title: 'Clinical Decision Support for Acute Symptom Triage in Emergency Medicine',
    url: 'https://jamanetwork.com/',
  },
  {
    source: 'CDC',
    title: 'Guidelines for Triage and Emergency Care Protocols',
    url: 'https://www.cdc.gov/emergency-care/',
  },
  {
    source: 'New England Journal of Medicine',
    title: 'Evaluating Urgency in Outpatient Symptom Presentations',
    url: 'https://www.nejm.org/',
  },
  {
    source: 'Mayo Clinic Proceedings',
    title: 'Evidence-Based Symptom Checker Algorithms and Clinical Accuracy',
    url: 'https://www.mayoclinicproceedings.org/',
  },
  {
    source: 'WHO',
    title: 'International Primary Care Guidelines: A Framework for Triage',
    url: 'https://www.who.int/health-topics/primary-care',
  },
  {
    source: 'Annals of Emergency Medicine',
    title: 'Predictive Modeling for Acute Coronary Syndrome Triage',
    url: 'https://www.annemergmed.com/',
  }
];

const careOptions: CareOption[] = [
  {
    name: 'Metropolitan General Hospital Level I Trauma Center',
    type: 'ER',
    distance: '1.2 miles',
    address: '1000 Medical Center Blvd, Metro District',
    wait_time: 'Immediate for critical',
  },
  {
    name: 'St. Jude Regional Medical Center ER',
    type: 'ER',
    distance: '3.4 miles',
    address: '4550 Mercy Way, North Wing',
    wait_time: '~35 min',
  },
  {
    name: 'Apex Premium Urgent Care',
    type: 'URGENT_CARE',
    distance: '0.8 miles',
    address: '782 Innovation Drive, Suite A',
    wait_time: '~15 min',
  },
  {
    name: 'CityHealth Walk-in Clinic',
    type: 'URGENT_CARE',
    distance: '2.1 miles',
    address: '3304 Broad Street',
    wait_time: '~45 min',
  },
  {
    name: 'Downtown Advanced Family Practice',
    type: 'GP',
    distance: '1.5 miles',
    address: '890 Wellness Avenue, Floor 4',
    wait_time: 'Next day availability',
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
