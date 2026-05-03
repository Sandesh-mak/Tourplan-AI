import { TravelPlanResponse, UserInputs } from "../types";

/**
 * Deterministic travel plan generator for Pakistan.
 * This replaced the previous AI-driven implementation to remove external dependencies.
 */
export async function generateTravelPlan(inputs: UserInputs): Promise<TravelPlanResponse> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  const days = parseInt(inputs.days) || 5;
  const budget = parseInt(inputs.budget) || 50000;
  const city = inputs.city.toLowerCase();

  // Logic to determine a "Recommended" vs "Not Recommended" trip based on basic Pakistani logistics
  const isKHItoNorth = city.includes('karachi') || city.includes('hyderabad');
  const isShortTrip = days < 5;
  const isBudgetTooLow = budget < (days * 5000); // Rough estimate: 5k/day minimum

  let recommended_destination = "Islamabad & Murree";
  let feasibility: "possible" | "difficult" | "not recommended" = "possible";
  let feasibility_score = "8/10";
  let decision: "Recommended" | "Not Recommended" = "Recommended";
  let decision_reason = "This plan is balanced and keeps travel times manageable within the given budget.";

  if (isKHItoNorth && isShortTrip) {
    recommended_destination = "Lower Sindh (Thatta & Keenjhar)";
    feasibility = "difficult";
    feasibility_score = "4/10";
    decision = "Not Recommended";
    decision_reason = "Traveling from Karachi to Northern Pakistan in less than 5 days is physically exhausting and results in 80% travel time vs 20% sightseeing.";
  } else if (isBudgetTooLow) {
    feasibility = "not recommended";
    feasibility_score = "3/10";
    decision = "Not Recommended";
    decision_reason = "Your budget is too low for the duration and travel preferences. Seasonal hikes in fuel and accommodation prices in Pakistan will lead to severe compromises on safety and comfort.";
  }

  return {
    summary: `A ${inputs.preference}-focused trip starting from ${inputs.city} for ${days} days.`,
    recommended_destination,
    feasibility,
    feasibility_score,
    decision,
    decision_reason,
    reality_score: {
      overall: isBudgetTooLow ? "3/10" : "8/10",
      budget_fit: isBudgetTooLow ? "2/10" : "9/10",
      time_efficiency: isShortTrip ? "4/10" : "8/10",
      comfort: inputs.preference === 'comfort' && !isBudgetTooLow ? "9/10" : "6/10"
    },
    regret_risk: {
      level: isShortTrip ? "High" : "Low",
      reason: isShortTrip ? "You will spend most of your time in buses/planes rather than enjoying the destination." : "A well-paced itinerary with time to breathe."
    },
    travel_time_analysis: {
      time_spent_traveling: isKHItoNorth ? "45%" : "25%",
      time_spent_enjoying: isKHItoNorth ? "55%" : "75%",
      insight: isKHItoNorth ? "Long distance travel is the main cost here." : "Excellent ratio of sightseeing to transit."
    },
    overplanning_check: {
      status: isShortTrip ? "Yes" : "No",
      details: isShortTrip ? "Trying to cover too many points in a short window." : "Schedule allows for local exploration and rest."
    },
    hidden_costs: [
      "Local jeep hire (approx 5-8k PKR)",
      "National Park entry fees",
      "Driver tip & meals",
      "Unexpected road block snacks"
    ],
    smart_warnings: [
      "Check NHA updates for road closures regularly.",
      "Carry physical cash (ATMs are unreliable in remote areas).",
      "Network coverage is spotty in the valleys (SCOM is better)."
    ],
    local_insights: [
      "Pakistani hospitality often means slower service but genuine warmth.",
      "Peak season (June-August) carries a 2x price premium.",
      "Local 'Dhabas' are often better and cheaper than hotel food."
    ],
    itinerary: Array.from({ length: days }).map((_, i) => ({
      day: i + 1,
      plan: i === 0 ? "Arrival and check-in" : i === days - 1 ? "Souvenir shopping and departure" : `Local sightseeing in ${recommended_destination}`,
      locations: [recommended_destination, "Local Bazaar"]
    })),
    plan_comparison: {
      budget_plan: {
        cost: `${budget} PKR`,
        tradeoff: "Using public transport and shared rooms."
      },
      comfort_plan: {
        cost: `${budget * 1.5} PKR`,
        benefit: "Private car hire and 3-star hotel stays."
      },
      recommendation: "The Budget tier is doable but requires early morning starts for public buses."
    },
    traveler_profile: {
      type: inputs.preference.charAt(0).toUpperCase() + inputs.preference.slice(1),
      match_score: "85%",
      insight: `Your preference for ${inputs.preference} aligns well with this route.`
    },
    what_you_lose: [
      "Premium comfort",
      "Ability to pivot to remote valleys",
      "Flexibility in departure times"
    ],
    improvements: [
      "Book transport 2 weeks in advance",
      "Increase budget by 10k for emergencies",
      "Travel during mid-week to avoid crowds"
    ],
    final_verdict: decision === 'Recommended' ? "A solid, realistic plan. Go for it!" : "Re-evaluate your timing or destination to avoid a burnout trip."
  };
}
