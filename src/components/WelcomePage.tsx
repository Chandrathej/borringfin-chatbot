"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { DayPicker } from "react-day-picker";
import { format, addMonths } from "date-fns";
import "react-day-picker/dist/style.css";
import {
  FaHome,
  FaCar,
  FaGraduationCap,
  FaPiggyBank,
  FaPlus,
} from "react-icons/fa";

const goalOptions = [
  { value: "Home", label: "House Downpayment", icon: <FaHome /> },
  { value: "Car", label: "Car Downpayment", icon: <FaCar /> },
  { value: "Education", label: "Children’s Education", icon: <FaGraduationCap /> },
  { value: "Retirement", label: "Retirement Planning", icon: <FaPiggyBank /> },
  { value: "Custom", label: "Custom Goal", icon: <FaPlus /> },
];

export default function WelcomePage({ user }: { user: any }) {
  const [step, setStep] = useState(1);

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [goalType, setGoalType] = useState("Home");
  const [customTitle, setCustomTitle] = useState("");
  const [amountNeeded, setAmountNeeded] = useState("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [city, setCity] = useState("");
  const [comments, setComments] = useState("");
  const [currentMonth, setCurrentMonth] = useState<Date>(
    targetDate ? new Date(targetDate) : new Date()
  );

  const [goals, setGoals] = useState<any[]>([]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const resetForm = () => {
    setGoalType("Home");
    setCustomTitle("");
    setAmountNeeded("");
    setTargetDate("");
    setCity("");
    setComments("");
  };

  // ---------------------- Save Profile ----------------------
  const saveProfile = async () => {
    if (!age || !gender) {
      alert("Please fill all details before continuing.");
      return;
    }

    await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        age: Number(age),
        gender,
        acceptedTerms,
      }),
    });
    nextStep();
  };

  // ---------------------- Add Goal ----------------------
  const addGoal = async () => {
    if (!amountNeeded || !targetDate) {
      alert("Please fill goal details properly.");
      return;
    }

    const goalData = {
      email: user.email,
      type: goalType,
      customTitle,
      amountNeeded: Number(amountNeeded),
      targetDate,
      city,
      comments,
    };

    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalData),
    });

    setGoals([...goals, goalData]);
    resetForm();
    alert("Goal added successfully!");
  };

  // ---------------------- Finish Onboarding ----------------------
  const finishOnboarding = async () => {
    await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, onboardingComplete: true }),
    });
    alert("Welcome aboard! Redirecting...");
    location.reload(); // triggers new session UI (modules page)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center min-h-[80vh] space-y-8 p-6"
    >
      {/* Step 1: Profile */}
      {step === 1 && (
        <motion.div
          className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-700 w-full max-w-md space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl text-gray-100 font-semibold">
            Welcome, {user?.name?.split(" ")[0] || "User"} 👋
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Let’s start by knowing a little about you.
          </p>

          <div>
            <Label>Age</Label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full mt-1 px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              value={gender}
              onValueChange={setGender}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              placeholder="Select gender"
              className="w-full mt-1"
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Checkbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />
            <Label className="text-gray-400 text-sm">
              I accept the{" "}
              <a href="/terms" className="text-cyan-400 hover:underline">
                Terms & Conditions
              </a>
            </Label>
          </div>

          <Button
            className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500"
            onClick={saveProfile}
          >
            Continue →
          </Button>
        </motion.div>
      )}

      {/* Step 2: Goals */}
      {step === 2 && (
        <motion.div
          className="bg-neutral-900/60 p-6 rounded-2xl border border-neutral-700 w-full max-w-lg space-y-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl text-gray-100 font-semibold mb-2">
            Add your financial goals
          </h2>

          <Select
            value={goalType}
            onValueChange={setGoalType}
            options={goalOptions.map((g) => ({
              value: g.value,
              label: (
                <span className="flex items-center gap-2">
                  {g.icon} {g.label}
                </span>
              ),
            }))}
            className="w-full"
          />

          {goalType === "Custom" && (
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter custom goal title"
              className="w-full px-3 py-2 mt-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200"
            />
          )}

          <input
            type="number"
            value={amountNeeded}
            onChange={(e) => setAmountNeeded(e.target.value)}
            placeholder="Amount Needed"
            className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200"
          />

          {/* ✅ Improved Target Date navigation */}
          <div>
            <Label>Target Date</Label>
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-3 mt-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth((m) => addMonths(m, -120))}
                    className="px-2 py-1 rounded-md border border-neutral-700 text-sm text-gray-300 hover:bg-neutral-800"
                  >
                    −10y
                  </button>
                  <button
                    onClick={() => setCurrentMonth((m) => addMonths(m, -12))}
                    className="px-2 py-1 rounded-md border border-neutral-700 text-sm text-gray-300 hover:bg-neutral-800"
                  >
                    −1y
                  </button>
                  <button
                    onClick={() => setCurrentMonth((m) => addMonths(m, 12))}
                    className="px-2 py-1 rounded-md border border-neutral-700 text-sm text-gray-300 hover:bg-neutral-800"
                  >
                    +1y
                  </button>
                  <button
                    onClick={() => setCurrentMonth((m) => addMonths(m, 120))}
                    className="px-2 py-1 rounded-md border border-neutral-700 text-sm text-gray-300 hover:bg-neutral-800"
                  >
                    +10y
                  </button>
                </div>
                <div
                  className="text-sm text-gray-400 cursor-pointer select-none"
                  onClick={() =>
                    setCurrentMonth((m) => addMonths(m, 12 * 10))
                  }
                >
                  {currentMonth.toLocaleString(undefined, {
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <DayPicker
                mode="single"
                month={currentMonth}
                selected={targetDate ? new Date(targetDate) : undefined}
                onSelect={(date) => {
                  if (date) {
                    setTargetDate(format(date, "yyyy-MM-dd"));
                    setCurrentMonth(date);
                  }
                }}
                onMonthChange={setCurrentMonth}
                fromYear={2024}
                toYear={2045}
              />
              <div className="text-xs text-gray-400 mt-2">
                Selected: {targetDate || "none"}
              </div>
            </div>
          </div>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200"
          />

          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Comments or notes"
            className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-gray-200"
          />

          {/* ✅ Back + Goal + Finish buttons */}
          <div className="flex justify-between gap-3 mt-4">
            <Button
              onClick={prevStep}
              className="flex-1 bg-neutral-700 hover:bg-neutral-600"
            >
              ← Back
            </Button>
            <Button
              onClick={addGoal}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500"
            >
              Add Another Goal
            </Button>
            <Button
              onClick={finishOnboarding}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500"
            >
              Finish →
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
