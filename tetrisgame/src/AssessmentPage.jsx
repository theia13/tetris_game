import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Heart,
  Users,
  Brain,
  Target,
  MessageCircle,
} from "lucide-react";

const MentalHealthAssessment = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [scale, setScale] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    struggles: [],
    strugglesOther: "",
    duration: "",
    triggers: [],
    triggersOther: "",
    dailyIntensity: 5,
    symptoms: [],
    emotionalSupport: "",
    previousAttempts: "",
    currentMedication: "",
    copingMethods: [],
    copingOther: "",
    recoveryGoals: [],
    selfHarmThoughts: "",
    supportPreference: "",
    trackMood: "",
    motivation: "",
    additionalInfo: "",
  });

  // Same animation as landing page
  useEffect(() => {
    const moveAnimation = () => {
      const time = Date.now() / 8000;
      setPosition({
        x: 50 + Math.sin(time) * 20,
        y: 50 + Math.cos(time) * 20,
      });
      setScale(1 + Math.sin(time / 2) * 0.15);
    };
    const animationFrame = setInterval(moveAnimation, 1000 / 60);
    return () => clearInterval(animationFrame);
  }, []);

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    // Check for crisis situation
    if (formData.selfHarmThoughts === "Yes, often") {
      alert(
        "Thank you for your honesty. Please consider reaching out to a crisis helpline immediately:\n\nNational Suicide Prevention Lifeline: 988\nCrisis Text Line: Text HOME to 741741\n\nYour life matters, and help is available."
      );
    }

    console.log("Assessment Data:", formData);
    setIsSubmitted(true);
  };

  const questions = [
    {
      id: 1,
      title:
        "What kind of addiction or issue are you currently struggling with?",
      type: "multiselect",
      options: [
        "Alcohol",
        "Drugs",
        "Smoking",
        "Pornography",
        "Social Media",
        "Self-harm",
        "Food",
        "Work/Study",
        "Depression / Burnout",
        "Anxiety / Panic",
      ],
      field: "struggles",
      hasOther: true,
      otherField: "strugglesOther",
    },
    {
      id: 2,
      title: "How long have you been struggling with this issue?",
      type: "radio",
      options: [
        "Less than 3 months",
        "3–6 months",
        "6 months to 1 year",
        "Over 1 year",
        "Over 3 years",
      ],
      field: "duration",
    },
    {
      id: 3,
      title: "What triggered or worsened your condition (if you know)?",
      type: "multiselect",
      options: [
        "Trauma",
        "Relationship issues",
        "Academic/Career pressure",
        "Peer influence",
        "Loneliness",
        "Family dynamics",
        "Not sure",
      ],
      field: "triggers",
      hasOther: true,
      otherField: "triggersOther",
    },
    {
      id: 4,
      title:
        "On a scale of 1–10, how often do you think about or engage in this behavior daily?",
      subtitle: "1 = rarely, 10 = constantly",
      type: "slider",
      field: "dailyIntensity",
      min: 1,
      max: 10,
    },
    {
      id: 5,
      title: "Do you experience any of these physical or emotional symptoms?",
      subtitle: "Select all that apply",
      type: "multiselect",
      options: [
        "Sleeplessness or oversleeping",
        "Loss of appetite / overeating",
        "Mood swings or irritability",
        "Fatigue or lack of energy",
        "Panic or anxiety attacks",
        "Feeling hopeless or empty",
        "Cravings or withdrawal",
        "Self-harming thoughts",
        "None of these",
      ],
      field: "symptoms",
    },
    {
      id: 6,
      title: "Do you currently feel emotionally supported in your life?",
      type: "radio",
      options: [
        "Yes, I have strong support",
        "Somewhat supported",
        "Not really",
        "I feel completely alone",
      ],
      field: "emotionalSupport",
    },
    {
      id: 7,
      title:
        "Have you ever tried to recover before (therapy, rehab, support groups, self-help)?",
      type: "radio",
      options: [
        "Yes, and it helped",
        "Yes, but I relapsed",
        "Tried a few things, didn't work",
        "No, this is my first time",
      ],
      field: "previousAttempts",
    },
    {
      id: 8,
      title:
        "Are you currently taking any medication or under professional care?",
      type: "radio",
      options: [
        "Yes (mental health medication)",
        "Yes (physical health only)",
        "No",
        "I'm not sure / I need help with this",
      ],
      field: "currentMedication",
    },
    {
      id: 9,
      title: "How do you usually cope when you feel overwhelmed or triggered?",
      type: "multiselect",
      options: [
        "Avoiding people or responsibilities",
        "Using substances or distractions",
        "Journaling or praying",
        "Talking to someone",
        "Sleeping or binge watching",
      ],
      field: "copingMethods",
      hasOther: true,
      otherField: "copingOther",
    },
    {
      id: 10,
      title: "What do you want most from recovery?",
      type: "multiselect",
      options: [
        "Emotional stability",
        "Better relationships",
        "Self-control & freedom",
        "Physical health",
        "A complete life reset",
        'I just want to feel "normal" again',
      ],
      field: "recoveryGoals",
    },
    {
      id: 11,
      title: "Do you have thoughts of harming yourself or others?",
      type: "radio",
      options: ["Yes, often", "Occasionally", "Rarely", "Never"],
      field: "selfHarmThoughts",
      critical: true,
    },
    {
      id: 12,
      title: "What kind of support do you prefer?",
      type: "radio",
      options: [
        "Anonymous/self-paced help",
        "Personal therapist/coach",
        "Group support / community",
        "Meditation + journaling tools",
        "Not sure yet",
      ],
      field: "supportPreference",
    },
    {
      id: 13,
      title: "Would you like to track your mood/cravings daily?",
      type: "radio",
      options: ["Yes", "No", "Maybe later"],
      field: "trackMood",
    },
    {
      id: 14,
      title: "What motivates you the most to recover?",
      type: "text",
      options: [
        "Family",
        "Career goals",
        "My future self",
        "Spiritual purpose",
        "A promise I made",
        "I want peace",
      ],
      field: "motivation",
    },
    {
      id: 15,
      title: "Is there anything else you'd like to share with us?",
      subtitle: "Optional",
      type: "textarea",
      field: "additionalInfo",
    },
  ];

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (isSubmitted) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-[#f0f0f0]">
        {/* Same animated gradient background */}
        <div
          className="absolute inset-0 rounded-3xl transition-transform duration-1000 ease-in-out"
          style={{
            background: `
              radial-gradient(
                circle at ${position.x}% ${position.y}%,
                rgba(255, 255, 100, 0.95) 0%,
                rgba(100, 180, 255, 0.85) 45%,
                rgba(230, 140, 230, 0.85) 100%
              )
            `,
            filter: "blur(40px)",
            transform: `scale(${scale + 0.2})`,
          }}
        />

        <div
          className="absolute inset-0 rounded-3xl opacity-50"
          style={{
            background: `
              radial-gradient(
                circle at ${100 - position.x}% ${100 - position.y}%,
                rgba(255, 255, 120, 0.7) 0%,
                rgba(130, 170, 255, 0.6) 50%,
                rgba(240, 160, 240, 0.6) 100%
              )
            `,
            filter: "blur(45px)",
            transform: `scale(${scale})`,
          }}
        />

        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            width: "100%",
            height: "100%",
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
          <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20 max-w-2xl">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white/80" />
            </div>
            <h1
              className="text-4xl font-light text-white/90 mb-6"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Thank You for Sharing
            </h1>
            <p
              className="text-white/80 text-xl leading-relaxed mb-8 font-light"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Your healing journey begins now. We'll help you take the next step
              toward recovery and wellness.
            </p>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <p
                className="text-white/70 text-lg font-light"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Your personalized recovery plan is being prepared. You've taken
                the most important step - acknowledging your need for support
                and change.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#f0f0f0]">
      {/* Same animated gradient background */}
      <div
        className="absolute inset-0 rounded-3xl transition-transform duration-1000 ease-in-out"
        style={{
          background: `
            radial-gradient(
              circle at ${position.x}% ${position.y}%,
              rgba(255, 255, 100, 0.95) 0%,
              rgba(100, 180, 255, 0.85) 45%,
              rgba(230, 140, 230, 0.85) 100%
            )
          `,
          filter: "blur(40px)",
          transform: `scale(${scale + 0.2})`,
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl opacity-50"
        style={{
          background: `
            radial-gradient(
              circle at ${100 - position.x}% ${100 - position.y}%,
              rgba(255, 255, 120, 0.7) 0%,
              rgba(130, 170, 255, 0.6) 50%,
              rgba(240, 160, 240, 0.6) 100%
            )
          `,
          filter: "blur(45px)",
          transform: `scale(${scale})`,
        }}
      />

      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          width: "100%",
          height: "100%",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 text-center border border-white/20">
          <h1
            className="text-4xl font-light text-white/90 mb-4"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Let's Understand You Better: Your Recovery Starts Here
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto font-light"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Please answer the following questions honestly. This is a safe
            space. Your responses help us tailor the best recovery plan for you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-white/20">
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-white/80 font-light"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Question {currentStep + 1} of {questions.length}
            </span>
            <span
              className="text-white/80 font-light"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white/60 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            {/* Critical Question Warning */}
            {currentQuestion.critical && (
              <div className="bg-red-500/20 border border-red-300/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-200" />
                <p
                  className="text-red-100 text-sm font-light"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  If you're having thoughts of self-harm, please know that help
                  is available. Crisis support: 988 or text HOME to 741741.
                </p>
              </div>
            )}

            <h2
              className="text-2xl font-light text-white/90 mb-2"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {currentQuestion.title}
            </h2>

            {currentQuestion.subtitle && (
              <p
                className="text-white/70 mb-6 font-light"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {currentQuestion.subtitle}
              </p>
            )}

            {/* Multi-select Questions */}
            {currentQuestion.type === "multiselect" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData[currentQuestion.field].includes(option)}
                      onChange={() =>
                        handleMultiSelect(currentQuestion.field, option)
                      }
                      className="mr-3 w-5 h-5 text-white/80 bg-white/10 border-white/30 rounded focus:ring-white/30"
                    />
                    <span
                      className="text-white/80 font-light"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
                {currentQuestion.hasOther && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Other (please specify)"
                      value={formData[currentQuestion.otherField]}
                      onChange={(e) =>
                        handleInputChange(
                          currentQuestion.otherField,
                          e.target.value
                        )
                      }
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 font-light"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Radio Questions */}
            {currentQuestion.type === "radio" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name={currentQuestion.field}
                      value={option}
                      checked={formData[currentQuestion.field] === option}
                      onChange={(e) =>
                        handleInputChange(currentQuestion.field, e.target.value)
                      }
                      className="mr-3 w-5 h-5 text-white/80 bg-white/10 border-white/30 focus:ring-white/30"
                    />
                    <span
                      className="text-white/80 font-light"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Slider Questions */}
            {currentQuestion.type === "slider" && (
              <div className="py-6">
                <div
                  className="flex justify-between text-white/70 text-sm mb-4 font-light"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  <span>1 - Rarely</span>
                  <span className="text-2xl font-light text-white/90">
                    {formData[currentQuestion.field]}
                  </span>
                  <span>10 - Constantly</span>
                </div>
                <input
                  type="range"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  value={formData[currentQuestion.field]}
                  onChange={(e) =>
                    handleInputChange(
                      currentQuestion.field,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full h-3 bg-white/20 rounded-full appearance-none slider cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${
                      (formData[currentQuestion.field] - 1) * 11.11
                    }%, rgba(255,255,255,0.2) ${
                      (formData[currentQuestion.field] - 1) * 11.11
                    }%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
              </div>
            )}

            {/* Text Questions */}
            {currentQuestion.type === "text" && (
              <div>
                <input
                  type="text"
                  placeholder="Your answer..."
                  value={formData[currentQuestion.field]}
                  onChange={(e) =>
                    handleInputChange(currentQuestion.field, e.target.value)
                  }
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 font-light"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                />
              </div>
            )}

            {/* Textarea Questions */}
            {currentQuestion.type === "textarea" && (
              <div>
                <textarea
                  rows="4"
                  placeholder="Share anything you'd like us to know..."
                  value={formData[currentQuestion.field]}
                  onChange={(e) =>
                    handleInputChange(currentQuestion.field, e.target.value)
                  }
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/40 resize-none font-light"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-6 py-3 bg-white/10 text-white/80 rounded-2xl hover:bg-white/20 transition-all border border-white/20 font-light"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-8 py-3 bg-white/20 text-white font-light rounded-2xl hover:bg-white/30 transition-all border border-white/30"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-white/25 text-white font-light rounded-2xl hover:bg-white/35 transition-all border border-white/30 flex items-center gap-2"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  🌱 Start My Personalized Recovery Plan
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          border: 3px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default MentalHealthAssessment;
