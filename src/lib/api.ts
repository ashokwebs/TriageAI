import { supabase } from './supabase';
import type { SymptomEntry, SymptomFormData, TriageResult } from '../types';
import { generateTriageResult } from './triage';

export async function saveSymptomEntry(
  formData: SymptomFormData,
  result: TriageResult
): Promise<SymptomEntry> {
  const entry = {
    main_symptom: formData.mainSymptom,
    duration: formData.duration,
    severity: formData.severity,
    associated_symptoms: formData.associatedSymptoms,
    age_range: formData.ageRange || null,
    medical_conditions: formData.medicalConditions || [],
    urgency_verdict: result.urgencyVerdict,
    confidence_percentage: result.confidencePercentage,
    reasoning: result.reasoning,
    citations: result.citations,
    care_options: result.careOptions,
    status: 'ACTIVE' as const,
  };

  const { data, error } = await supabase
    .from('symptom_entries')
    .insert(entry)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save symptom entry: ${error.message}`);
  }

  return data as SymptomEntry;
}

export async function getSymptomEntries(): Promise<SymptomEntry[]> {
  const { data, error } = await supabase
    .from('symptom_entries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch symptom entries: ${error.message}`);
  }

  return data as SymptomEntry[];
}

export async function getSymptomEntry(id: string): Promise<SymptomEntry | null> {
  const { data, error } = await supabase
    .from('symptom_entries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Failed to fetch symptom entry: ${error.message}`);
  }

  return data as SymptomEntry;
}

export async function updateSymptomEntryStatus(
  id: string,
  status: SymptomEntry['status']
): Promise<SymptomEntry> {
  const { data, error } = await supabase
    .from('symptom_entries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update symptom entry: ${error.message}`);
  }

  return data as SymptomEntry;
}

export async function deleteSymptomEntry(id: string): Promise<void> {
  const { error } = await supabase.from('symptom_entries').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete symptom entry: ${error.message}`);
  }
}

export { generateTriageResult };
