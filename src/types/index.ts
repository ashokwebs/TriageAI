export type UrgencyVerdict = 'GO_NOW' | 'SEE_THIS_WEEK' | 'MONITOR_HOME';

export type SymptomStatus = 'ACTIVE' | 'RESOLVED' | 'WORSING' | 'STABLE';

export interface SymptomEntry {
  id: string;
  main_symptom: string;
  duration: string;
  severity: number;
  associated_symptoms: string[];
  age_range?: string;
  medical_conditions?: string[];
  urgency_verdict: UrgencyVerdict;
  confidence_percentage: number;
  reasoning: string;
  citations: Citation[];
  care_options: CareOption[];
  status: SymptomStatus;
  created_at: string;
  updated_at: string;
}

export interface Citation {
  source: string;
  title: string;
  url: string;
}

export interface CareOption {
  name: string;
  type: 'ER' | 'URGENT_CARE' | 'GP';
  distance: string;
  address: string;
  wait_time?: string;
}

export interface SymptomFormData {
  mainSymptom: string;
  duration: string;
  severity: number;
  associatedSymptoms: string[];
  ageRange?: string;
  medicalConditions?: string[];
}

export interface TriageResult {
  urgencyVerdict: UrgencyVerdict;
  confidencePercentage: number;
  reasoning: string;
  citations: Citation[];
  careOptions: CareOption[];
}
