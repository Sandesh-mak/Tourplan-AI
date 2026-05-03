export interface ItineraryDay {
  day: number;
  plan: string;
  locations: string[];
}

export interface RealityScore {
  overall: string;
  budget_fit: string;
  time_efficiency: string;
  comfort: string;
}

export interface RegretRisk {
  level: "Low" | "Medium" | "High";
  reason: string;
}

export interface TravelTimeAnalysis {
  time_spent_traveling: string;
  time_spent_enjoying: string;
  insight: string;
}

export interface PlanComparison {
  budget_plan: {
    cost: string;
    tradeoff: string;
  };
  comfort_plan: {
    cost: string;
    benefit: string;
  };
  recommendation: string;
}

export interface TravelerProfile {
  type: string;
  match_score: string;
  insight: string;
}

export interface TravelPlanResponse {
  summary: string;
  recommended_destination: string;
  feasibility: "possible" | "difficult" | "not recommended";
  feasibility_score: string;
  decision: "Recommended" | "Not Recommended";
  decision_reason: string;
  reality_score: RealityScore;
  regret_risk: RegretRisk;
  travel_time_analysis: TravelTimeAnalysis;
  overplanning_check: {
    status: "Yes" | "No";
    details: string;
  };
  hidden_costs: string[];
  smart_warnings: string[];
  local_insights: string[];
  itinerary: ItineraryDay[];
  plan_comparison: PlanComparison;
  traveler_profile: TravelerProfile;
  what_you_lose: string[];
  improvements: string[];
  final_verdict: string;
}

export type TravelPreference = "adventure" | "comfort" | "family" | "budget";

export interface UserInputs {
  city: string;
  budget: string;
  days: string;
  preference: TravelPreference;
}
