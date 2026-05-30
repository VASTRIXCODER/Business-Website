'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, Check, Zap, MapPin, Briefcase, Home } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import {
  usStates, ageRanges, educationStages, employmentStatuses,
  occupationCategories, incomeRanges, filingStatuses,
  housingSituations, debtTypes, topFinancialConcernOptions,
} from '@/mocks/policies';
import AmbientBackground from '@/components/landing/AmbientBackground';

const stages = [
  { id: 'location', label: 'Location', icon: MapPin, description: 'Where you live affects which state policies apply to you' },
  { id: 'finances', label: 'Finances', icon: Briefcase, description: 'Your income and employment drive the biggest impact calculations' },
  { id: 'life', label: 'Life Situation', icon: Home, description: 'Family, housing, and debt shape which policies affect you most' },
];

const TOTAL_STEPS = 11;

function QuestionCard({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-8">{question}</p>
      {children}
    </motion.div>
  );
}

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-2xl border text-sm transition-all ${
        selected
          ? 'bg-primary/15 border-primary/40 text-text-primary'
          : 'glass border-white/8 text-text-muted hover:text-text-primary hover:border-white/16'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        {selected && <Check className="w-4 h-4 text-primary" />}
      </div>
    </button>
  );
}

function MultiOptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
        selected
          ? 'bg-primary/15 border-primary/40 text-text-primary'
          : 'glass border-white/8 text-text-muted hover:text-text-primary hover:border-white/16'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
          selected ? 'bg-primary border-primary' : 'border-white/20'
        }`}>
          {selected && <Check className="w-2.5 h-2.5 text-white" />}
        </div>
        <span>{label}</span>
      </div>
    </button>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    state: '',
    city: '',
    country: 'United States',
    ageRange: '',
    educationStage: '',
    employmentStatus: '',
    occupationCategory: '',
    incomeRange: '',
    filingStatus: '',
    housingSituation: '',
    debtTypes: [] as string[],
    hasDependents: false,
    topFinancialConcerns: [] as string[],
  });

  const currentStage = step < 5 ? 0 : step < 9 ? 1 : 2;
  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const toggleMulti = (key: 'debtTypes' | 'topFinancialConcerns', value: string) => {
    setProfile(prev => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const canAdvance = () => {
    switch (step) {
      case 0: return !!profile.state;
      case 1: return !!profile.city;
      case 2: return !!profile.ageRange;
      case 3: return !!profile.educationStage;
      case 4: return true;
      case 5: return !!profile.employmentStatus;
      case 6: return !!profile.occupationCategory;
      case 7: return !!profile.incomeRange;
      case 8: return !!profile.filingStatus;
      case 9: return !!profile.housingSituation;
      case 10: return profile.topFinancialConcerns.length > 0;
      default: return true;
    }
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('user_profiles').upsert({
          id: user.id,
          ...profile,
          has_completed_onboarding: true,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) { /* fail silently, proceed */ }
    setShowConfetti(true);
    setTimeout(() => router.push('/dashboard'), 2200);
  };

  const questions = [
    // Step 0: State
    <QuestionCard key="state" question="What state do you live in?">
      <select
        value={profile.state}
        onChange={e => setProfile(p => ({ ...p, state: e.target.value }))}
        className="input-glass w-full px-4 py-4 text-sm"
      >
        <option value="">Select your state...</option>
        {usStates.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
    </QuestionCard>,

    // Step 1: City
    <QuestionCard key="city" question="What city or county?">
      <input
        type="text"
        placeholder="e.g. San Francisco, Cook County..."
        value={profile.city}
        onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
        className="input-glass w-full px-4 py-4 text-sm"
        autoFocus
      />
      <p className="text-xs text-text-muted mt-3">Used to find local policies and accurate cost-of-living adjustments.</p>
    </QuestionCard>,

    // Step 2: Age range
    <QuestionCard key="age" question="Which age range are you in?">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ageRanges.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.ageRange === opt.value} onClick={() => setProfile(p => ({ ...p, ageRange: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 3: Education
    <QuestionCard key="education" question="What\'s your current education stage?">
      <div className="space-y-2">
        {educationStages.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.educationStage === opt.value} onClick={() => setProfile(p => ({ ...p, educationStage: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 4: Employment status
    <QuestionCard key="employment" question="What\'s your employment situation?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {employmentStatuses.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.employmentStatus === opt.value} onClick={() => setProfile(p => ({ ...p, employmentStatus: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 5: Occupation
    <QuestionCard key="occupation" question="What field or industry do you work in?">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {occupationCategories.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.occupationCategory === opt.value} onClick={() => setProfile(p => ({ ...p, occupationCategory: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 6: Income
    <QuestionCard key="income" question="What\'s your approximate household income?">
      <div className="space-y-2">
        {incomeRanges.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.incomeRange === opt.value} onClick={() => setProfile(p => ({ ...p, incomeRange: opt.value }))} />
        ))}
      </div>
      <p className="text-xs text-text-muted mt-3">Your exact income stays private. We use ranges for policy calculations.</p>
    </QuestionCard>,

    // Step 7: Filing status
    <QuestionCard key="filing" question="What\'s your tax filing status?">
      <div className="space-y-2">
        {filingStatuses.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.filingStatus === opt.value} onClick={() => setProfile(p => ({ ...p, filingStatus: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 8: Housing
    <QuestionCard key="housing" question="What\'s your current housing situation?">
      <div className="grid grid-cols-2 gap-3">
        {housingSituations.map(opt => (
          <OptionButton key={opt.value} label={opt.label} selected={profile.housingSituation === opt.value} onClick={() => setProfile(p => ({ ...p, housingSituation: opt.value }))} />
        ))}
      </div>
    </QuestionCard>,

    // Step 9: Debts
    <QuestionCard key="debts" question="Which types of debt do you currently have?">
      <div className="grid grid-cols-2 gap-3">
        {debtTypes.map(opt => (
          <MultiOptionButton key={opt.value} label={opt.label} selected={profile.debtTypes.includes(opt.value)} onClick={() => toggleMulti('debtTypes', opt.value)} />
        ))}
      </div>
    </QuestionCard>,

    // Step 10: Concerns
    <QuestionCard key="concerns" question="What are your top financial concerns?">
      <p className="text-xs text-text-muted mb-4">Select up to 3</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topFinancialConcernOptions.map(opt => (
          <MultiOptionButton
            key={opt.value}
            label={opt.label}
            selected={profile.topFinancialConcerns.includes(opt.value)}
            onClick={() => {
              if (!profile.topFinancialConcerns.includes(opt.value) && profile.topFinancialConcerns.length >= 3) return;
              toggleMulti('topFinancialConcerns', opt.value);
            }}
          />
        ))}
      </div>
    </QuestionCard>,
  ];

  return (
    <div className="min-h-screen relative flex flex-col">
      <AmbientBackground />

      <div className="relative z-10 flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-semibold text-lg">Politi<span className="text-primary">con</span></span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-6">
              {stages.map((stage, i) => {
                const Icon = stage.icon;
                const isActive = i === currentStage;
                const isDone = i < currentStage;
                return (
                  <div key={stage.id} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                      isDone ? 'bg-primary border-primary' :
                      isActive ? 'border-primary bg-primary/20' :
                      'border-white/20 bg-white/5'
                    }`}>
                      {isDone
                        ? <Check className="w-3.5 h-3.5 text-white" />
                        : <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-text-muted'}`} />
                      }
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${
                      isActive ? 'text-text-primary' : isDone ? 'text-primary' : 'text-text-muted'
                    }`}>{stage.label}</span>
                  </div>
                );
              })}
            </div>
            <span className="text-xs text-text-muted font-mono-data">{step + 1}/{TOTAL_STEPS}</span>
          </div>
          <div className="h-1.5 bg-white/6 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {questions[step]}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/8">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {step < TOTAL_STEPS - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance()}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!canAdvance() || saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
            >
              {saving ? 'Saving...' : 'See my impact'} <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Confetti celebration */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-base/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-strong rounded-3xl p-12 text-center"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="font-display text-3xl font-bold text-text-primary mb-2">Profile complete!</h2>
              <p className="text-text-muted">Analyzing policies for your situation...</p>
              <div className="mt-6 flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Imports for onboarding data
const { usStates, ageRanges, educationStages, employmentStatuses, occupationCategories, incomeRanges, filingStatuses, housingSituations, debtTypes, topFinancialConcernOptions } = await import('@/mocks/policies');
