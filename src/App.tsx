import React, { useState } from 'react';
import { Plane, Compass, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import PlannerForm from './components/PlannerForm';
import PlanDisplay from './components/PlanDisplay';
import { generateTravelPlan } from './services/travelService';
import { TravelPlanResponse, UserInputs } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [plan, setPlan] = useState<TravelPlanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async (inputs: UserInputs) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateTravelPlan(inputs);
      setPlan(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan. Please check your connectivity and Gemini API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={handleReset}
              id="brand-logo"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Compass size={24} />
              </div>
              <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900">
                Tourplan AI
              </span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
              Pakistan Travel Decision Engine
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!plan && !isLoading && !error && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-4xl mx-auto space-y-12 py-12"
            >
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 leading-tight">
                  Stop planning <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">impossible</span> trips.
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  The first AI travel engine that critically evaluates the practicality of your Pakistan itinerary. We factor in terrain, fatigue, and real costs.
                </p>
              </div>

              <PlannerForm onPlan={handleGeneratePlan} isLoading={isLoading} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                {[
                  { icon: <MapPin className="text-indigo-500" />, title: "Logistics First", desc: "We calculate road conditions and travel fatigue specific to Pakistan." },
                  { icon: <Sparkles className="text-indigo-500" />, title: "Budget Accuracy", desc: "No fake prices. We use realistic PKR estimates for food and stays." },
                  { icon: <Plane className="text-indigo-500" />, title: "Reality Check", desc: "High 'regret-risk' warnings for overpacked northern treks." },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-left space-y-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40 space-y-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass size={32} className="text-indigo-600 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-display font-bold text-slate-900">Validating Logistics</h3>
                <p className="text-slate-500">Checking road closures, travel times, and budget feasibility...</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto py-20 text-center space-y-6"
            >
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto">
                <AlertCircle size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-slate-900">Something went wrong</h3>
                <p className="text-slate-500">{error}</p>
              </div>
              <button 
                onClick={handleReset}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                id="reset-form"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {plan && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-slate-900">Your Reality Check</h2>
                  <p className="text-slate-500">Engineered for accuracy, efficiency, and comfort.</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"
                  id="new-plan"
                >
                  Start New Plan
                </button>
              </div>
              <PlanDisplay plan={plan} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 grayscale brightness-125 opacity-50">
            <Compass size={20} />
            <span className="text-sm font-display font-bold tracking-widest uppercase">Tourplan AI</span>
          </div>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Design and engineering inspired by the rugged beauty and logistical reality of travel in Pakistan. Built for explorers who value truth over hype.
          </p>
        </div>
      </footer>
    </div>
  );
}
