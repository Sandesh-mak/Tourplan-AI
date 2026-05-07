# Tourplan AI – Pakistan Travel Decision Engine 🇵🇰

Tourplan AI is an AI-powered travel decision engine designed specifically for Pakistan.
Unlike traditional travel planners, it does not just generate itineraries — it evaluates whether a trip is actually practical, efficient, and worth taking based on real-world travel constraints.

---

## 🚀 Features

* Smart destination recommendation
* Trip feasibility analysis
* Budget efficiency scoring
* Travel time vs enjoyment analysis
* Hidden cost estimation
* Weather & road risk warnings
* Overplanning detection
* Realistic day-wise itinerary
* Budget vs comfort plan comparison
* Traveler profile matching
* Final decision with reasoning

---

## 🧠 What Makes It Unique?

Tourplan AI focuses on **Pakistan-specific travel realities**, including:

* Long intercity travel distances
* Mountain road conditions
* Jeep-only access routes
* Transport delays
* Travel fatigue
* Budget limitations

Instead of generating unrealistic “perfect trips,” the system can also determine when a trip is **not recommended**.

---

## 📥 Example Input

```json
{
  "starting_city": "Islamabad",
  "budget": 100000,
  "days": 4,
  "travel_preference": "Adventure"
}
```

---

## 📤 Example Output

```json
{
  "feasibility": "possible",
  "feasibility_score": "8/10",
  "decision": "Recommended",
  "travel_time_analysis": {
    "time_spent_traveling": "35%",
    "time_spent_enjoying": "65%"
  }
}
```

---

## ⚙️ Tech Stack

* JavaScript
* Node.js
* Gemini API
* Google Cloud Run
* Prompt Engineering
* Structured JSON Response System

---

## ☁️ Deployment

The project is deployed using **Google Cloud Run** for scalable cloud-based access.

---

## 🎯 Purpose

The goal of Tourplan AI is to help users make smarter, more realistic, and regret-free travel decisions instead of relying on overly optimistic travel plans.

---

## 🏆 Built For

AI Seekho Challenge – Google Cloud & Generative AI Project

---

## 📌 Core Idea

> “Not every trip that looks good on paper is actually worth taking in real life.”
