import React, { useState } from 'react';
import { MapPin, Wallet, Calendar, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { UserInputs, TravelPreference } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface PlannerFormProps {
  onPlan: (inputs: UserInputs) => void;
  isLoading: boolean;
}

export default function PlannerForm({ onPlan, isLoading }: PlannerFormProps) {
  const [inputs, setInputs] = useState<UserInputs>({
    city: '',
    budget: '',
    days: '',
    preference: 'adventure',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.city || !inputs.budget || !inputs.days) return;
    onPlan(inputs);
  };

  const preferences: { value: TravelPreference; label: string; icon: string }[] = [
    { value: 'adventure', label: 'Adventure', icon: '🏔️' },
    { value: 'comfort', label: 'Comfort', icon: '🏨' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { value: 'budget', label: 'Budget', icon: '📉' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-indigo-600" />
            Starting City
          </span>
          <input
            type="text"
            placeholder="e.g. Karachi, Lahore, Islamabad"
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            value={inputs.city}
            onChange={(e) => setInputs({ ...inputs, city: e.target.value })}
            required
            id="starting-city"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <Wallet size={16} className="text-indigo-600" />
              Budget (PKR)
            </span>
            <input
              type="number"
              placeholder="Total for trip"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={inputs.budget}
              onChange={(e) => setInputs({ ...inputs, budget: e.target.value })}
              required
              id="trip-budget"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-indigo-600" />
              Days
            </span>
            <input
              type="number"
              placeholder="How long?"
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={inputs.days}
              onChange={(e) => setInputs({ ...inputs, days: e.target.value })}
              required
              id="trip-days"
            />
          </label>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-slate-700 block mb-2">Travel Preference</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {preferences.map((pref) => (
              <button
                key={pref.value}
                type="button"
                onClick={() => setInputs({ ...inputs, preference: pref.value })}
                className={cn(
                  "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-1",
                  inputs.preference === pref.value
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm"
                    : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                )}
                id={`pref-${pref.value}`}
              >
                <span className="text-xl">{pref.icon}</span>
                <span className="text-xs font-medium">{pref.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-200/50",
          isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
        )}
        id="submit-plan"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Evaluating Logistics...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate My Reality Check
            <ChevronRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
