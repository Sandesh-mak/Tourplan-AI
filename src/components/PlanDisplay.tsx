import React from 'react';
import { 
  CheckCircle2, AlertTriangle, XCircle, Gauge, Clock, 
  MapPin, AlertCircle, Info, Landmark, Compass, 
  RefreshCw, TrendingDown, TrendingUp, User
} from 'lucide-react';
import { TravelPlanResponse } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface PlanDisplayProps {
  plan: TravelPlanResponse;
}

export default function PlanDisplay({ plan }: PlanDisplayProps) {
  const getFeasibilityIcon = (val: string) => {
    switch (val) {
      case 'possible': return <CheckCircle2 className="text-emerald-500" />;
      case 'difficult': return <AlertTriangle className="text-amber-500" />;
      case 'not recommended': return <XCircle className="text-red-500" />;
      default: return null;
    }
  };

  const getScoreColor = (score: string) => {
    const num = parseInt(score.split('/')[0]);
    if (num >= 8) return 'text-emerald-600 bg-emerald-50';
    if (num >= 5) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Summary */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span className={cn(
              "px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
              plan.decision === 'Recommended' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            )}>
              Verdict: {plan.decision}
            </span>
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
              {getFeasibilityIcon(plan.feasibility)}
              {plan.feasibility.toUpperCase()}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
            {plan.recommended_destination}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed italic">
            "{plan.summary}"
          </p>
        </div>
        <div className="w-full md:w-auto bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-slate-800">{plan.feasibility_score}</div>
            <div className="text-xs font-bold text-slate-500 uppercase mt-1">Feasibility Score</div>
          </div>
        </div>
      </section>

      {/* Decision Reason */}
      <section className="bg-indigo-900 text-indigo-50 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Landmark size={20} className="text-indigo-300" />
            The Architectural Decision
          </h2>
          <p className="text-indigo-100 leading-relaxed text-lg">
            {plan.decision_reason}
          </p>
        </div>
        <Landmark size={200} className="absolute -right-10 -bottom-10 text-indigo-800 opacity-20" />
      </section>

      {/* Grid of Scores and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reality Scores */}
        <section className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
            <Gauge size={20} className="text-indigo-600" />
            Reality Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(plan.reality_score).map(([key, value]) => (
              <div key={key} className={cn("p-4 rounded-2xl border border-transparent text-center", getScoreColor(value))}>
                <div className="text-2xl font-bold uppercase">{value}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-70 mt-1">
                  {key.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-100 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Clock size={16} className="text-indigo-600" />
                Travel Analysis
              </h4>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-amber-400 h-full" style={{ width: plan.travel_time_analysis.time_spent_traveling }} />
                  <div className="bg-indigo-500 h-full" style={{ width: plan.travel_time_analysis.time_spent_enjoying }} />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-4">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400" /> Traveling ({plan.travel_time_analysis.time_spent_traveling})</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500" /> Sightseeing ({plan.travel_time_analysis.time_spent_enjoying})</span>
              </div>
              <p className="text-sm text-slate-600">{plan.travel_time_analysis.insight}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <AlertCircle size={16} className="text-indigo-600" />
                Overplanning Check
              </h4>
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2",
                plan.overplanning_check.status === 'Yes' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              )}>
                {plan.overplanning_check.status === 'Yes' ? 'Unrealistic Load' : 'Balanced Load'}
              </div>
              <p className="text-sm text-slate-600">{plan.overplanning_check.details}</p>
            </div>
          </div>
        </section>

        {/* Regret Risk */}
        <section className={cn(
          "rounded-3xl p-8 shadow-sm border",
          plan.regret_risk.level === 'High' ? 'bg-red-50 border-red-100' : 
          plan.regret_risk.level === 'Medium' ? 'bg-amber-50 border-amber-100' : 
          'bg-emerald-50 border-emerald-100'
        )}>
          <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Info size={20} className={cn(
              plan.regret_risk.level === 'High' ? 'text-red-600' : 
              plan.regret_risk.level === 'Medium' ? 'text-amber-600' : 
              'text-emerald-600'
            )} />
            Regret Risk
          </h3>
          <div className="mb-4">
            <span className={cn(
              "px-4 py-1 rounded-full text-sm font-bold",
              plan.regret_risk.level === 'High' ? 'bg-red-200 text-red-800' : 
              plan.regret_risk.level === 'Medium' ? 'bg-amber-200 text-amber-800' : 
              'bg-emerald-200 text-emerald-800'
            )}>
              {plan.regret_risk.level} Risk
            </span>
          </div>
          <p className="text-slate-700 leading-relaxed italic">
            "{plan.regret_risk.reason}"
          </p>
        </section>
      </div>

      {/* Itinerary */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
          <Compass size={24} className="text-indigo-600" />
          The Optimized Route
        </h3>
        <div className="space-y-4">
          {plan.itinerary.map((day, idx) => (
            <motion.div 
              key={day.day}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-6 group"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">
                  {day.day}
                </div>
                {idx !== plan.itinerary.length - 1 && (
                  <div className="w-0.5 grow bg-slate-100 my-2" />
                )}
              </div>
              <div className="pb-8 flex-1">
                <div className="bg-slate-50 rounded-2xl p-5 group-hover:bg-indigo-50/50 transition-colors border border-slate-100 group-hover:border-indigo-100">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {day.locations.map(loc => (
                      <span key={loc} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-tight shadow-sm">
                        <MapPin size={10} className="text-indigo-600" />
                        {loc}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {day.plan}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Insights & Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
          <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
            <AlertCircle size={16} /> Smart Warnings
          </h4>
          <ul className="space-y-3">
            {plan.smart_warnings.map((w, i) => (
              <li key={i} className="flex gap-3 text-sm text-amber-800">
                <span className="text-amber-400 mt-1">•</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 shadow-sm">
          <h4 className="font-bold text-indigo-900 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Info size={16} /> Local Insights
          </h4>
          <ul className="space-y-3">
            {plan.local_insights.map((ins, i) => (
              <li key={i} className="flex gap-3 text-sm text-indigo-800">
                <span className="text-indigo-400 mt-1">•</span>
                {ins}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-sm text-white">
          <h4 className="font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
            <Landmark size={16} /> Hidden Costs
          </h4>
          <div className="flex flex-wrap gap-2">
            {plan.hidden_costs.map((cost, idx) => (
              <span key={idx} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-700">
                {cost}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Traveler Profile & Comparison */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
            <User size={20} className="text-indigo-600" />
            Traveler Profile Match
          </h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              {plan.traveler_profile.match_score}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</div>
              <div className="text-xl font-display font-bold text-slate-800">{plan.traveler_profile.type}</div>
            </div>
          </div>
          <p className="text-slate-600 mb-8">{plan.traveler_profile.insight}</p>
          
          <h4 className="font-bold text-red-600 mb-4 flex items-center gap-2 uppercase tracking-wider text-xs">
            <RefreshCw size={16} /> What You Lose
          </h4>
          <ul className="space-y-2">
            {plan.what_you_lose.map((l, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-red-400 mt-1">•</span>
                {l}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
            <RefreshCw size={20} className="text-indigo-600" />
            Plan Comparison
          </h3>
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  <TrendingDown size={16} className="text-amber-500" />
                  Budget Tier
                </span>
                <span className="text-sm font-bold text-indigo-600">{plan.plan_comparison.budget_plan.cost}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700">Tradeoff:</span> {plan.plan_comparison.budget_plan.tradeoff}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  <TrendingUp size={16} className="text-emerald-500" />
                  Comfort Tier
                </span>
                <span className="text-sm font-bold text-indigo-600">{plan.plan_comparison.comfort_plan.cost}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700">Benefit:</span> {plan.plan_comparison.comfort_plan.benefit}
              </p>
            </div>
            <div className="p-4 bg-indigo-600 rounded-xl text-white">
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Our Recommendation</div>
              <p className="text-sm font-medium leading-relaxed">{plan.plan_comparison.recommendation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Improvements & Verdict */}
      <section className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-display font-bold mb-6">Strategic Improvements</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {plan.improvements.map((imp, idx) => (
                <div key={idx} className="flex gap-3 text-slate-300">
                  <CheckCircle2 size={18} className="text-indigo-400 mt-1 shrink-0" />
                  <span className="text-sm">{imp}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Final Verdict</h4>
              <p className="font-display text-lg font-bold italic leading-relaxed">
                "{plan.final_verdict}"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
