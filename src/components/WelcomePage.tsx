"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import {
  HomeIcon,
  TruckIcon,
  AcademicCapIcon,
  BanknotesIcon,
  PlusIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const goalOptions = [
  { id: "Home", label: "House Downpayment", icon: HomeIcon, color: "text-blue-400" },
  { id: "Car", label: "Car Downpayment", icon: TruckIcon, color: "text-emerald-400" },
  { id: "Education", label: "Children’s Education", icon: AcademicCapIcon, color: "text-purple-400" },
  { id: "Retirement", label: "Retirement Planning", icon: BanknotesIcon, color: "text-amber-400" },
  { id: "Custom", label: "Custom Goal", icon: PlusIcon, color: "text-gray-400" },
];

export default function WelcomePage({ user }: { user: any }) {
  const [step, setStep] = useState(0); // 0: Intro, 1: Profile, 2: Goal Selection, 3: Goal Details, 4: Finish
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile Data
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    city: "",
    acceptedTerms: false,
  });

  // Goal Data
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [goalDetails, setGoalDetails] = useState({
    amountNeeded: "",
    targetDate: "",
    comments: "",
    customTitle: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  // ---------------------- Save Profile ----------------------
  const handleSaveProfile = async () => {
    if (!profile.age || !profile.gender || !profile.city || !profile.acceptedTerms) {
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          age: Number(profile.age),
          gender: profile.gender,
          city: profile.city,
          acceptedTerms: profile.acceptedTerms,
        }),
      });
      nextStep();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------- Add Goal ----------------------
  const handleAddGoal = async () => {
    if (!goalDetails.amountNeeded || !goalDetails.targetDate || !selectedGoalId) {
      return;
    }

    setIsSubmitting(true);
    try {
      const goalData = {
        email: user.email,
        type: selectedGoalId,
        customTitle: goalDetails.customTitle,
        amountNeeded: Number(goalDetails.amountNeeded),
        targetDate: goalDetails.targetDate,
        city: profile.city,
        comments: goalDetails.comments,
      };

      await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });
      nextStep();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------- Finish Onboarding ----------------------
  const finishOnboarding = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, onboardingComplete: true }),
      });
      location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-4xl mx-auto px-4 py-12">
      {/* Progress Bar */}
      {step > 0 && step < 4 && (
        <div className="w-full max-w-md mb-12 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" : "bg-neutral-800"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 0: Intro */}
        {step === 0 && (
          <motion.div
            key="step0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center space-y-6"
          >
            <div className="inline-flex p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <BanknotesIcon className="w-12 h-12 text-cyan-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 tracking-tight">
              Welcome to <span className="text-cyan-400">BoringFin</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
              Managing finances shouldn't be exciting. Let's get you set up with a personalized plan in just a few steps.
            </p>
            <div className="pt-4">
              <Button
                onClick={nextStep}
                className="bg-cyan-600 hover:bg-cyan-500 px-8 py-6 text-lg rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20"
              >
                Start My Journey <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md space-y-8 bg-neutral-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-100">Personal Details</h2>
              <p className="text-gray-400 text-sm">Help us customize your experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">How old are you?</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    placeholder="Enter age"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">Gender</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setProfile({ ...profile, gender: g.toLowerCase() })}
                      className={`py-3 rounded-2xl border transition-all text-sm font-medium ${
                        profile.gender === g.toLowerCase()
                          ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                          : "bg-neutral-800/50 border-neutral-700/50 text-gray-400 hover:border-neutral-600"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">Current City</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    placeholder="e.g. San Francisco"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <div className="pt-1">
                  <Checkbox
                    checked={profile.acceptedTerms}
                    onCheckedChange={(val) => setProfile({ ...profile, acceptedTerms: !!val })}
                    className="border-neutral-700 data-[state=checked]:bg-cyan-500"
                  />
                </div>
                <Label className="text-gray-400 text-xs leading-relaxed">
                  I understand that BoringFin provides informational content and I agree to the{" "}
                  <a href="#" className="text-cyan-400 hover:underline">Terms of Service</a>.
                </Label>
              </div>

              <Button
                className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/20"
                onClick={handleSaveProfile}
                disabled={isSubmitting || !profile.age || !profile.gender || !profile.city || !profile.acceptedTerms}
              >
                {isSubmitting ? "Saving..." : "Continue"} <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Goal Selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-3xl space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-100">What's your primary goal?</h2>
              <p className="text-gray-400">Choose one to start planning today</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {goalOptions.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoalId === goal.id;
                return (
                  <motion.button
                    key={goal.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGoalId(goal.id)}
                    className={`flex flex-col items-center justify-center p-6 rounded-3xl border transition-all space-y-3 ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                        : "bg-neutral-900/40 border-white/5 hover:border-neutral-700"
                    }`}
                  >
                    <div className={`p-3 rounded-2xl ${isSelected ? "bg-cyan-500/20" : "bg-neutral-800"}`}>
                      <Icon className={`w-8 h-8 ${isSelected ? "text-cyan-400" : "text-gray-400"}`} />
                    </div>
                    <span className={`text-sm font-medium ${isSelected ? "text-gray-100" : "text-gray-400"}`}>
                      {goal.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-8">
              <button onClick={prevStep} className="text-gray-400 hover:text-gray-200 flex items-center gap-2">
                <ArrowLeftIcon className="w-4 h-4" /> Back
              </button>
              <Button
                onClick={nextStep}
                disabled={!selectedGoalId}
                className="bg-cyan-600 hover:bg-cyan-500 px-8 py-6 rounded-2xl"
              >
                Next Step <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Goal Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md space-y-8 bg-neutral-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-gray-100">Goal Specifics</h2>
              <p className="text-gray-400 text-sm">Let's put some numbers on it</p>
            </div>

            <div className="space-y-6">
              {selectedGoalId === "Custom" && (
                <div className="space-y-2">
                  <Label className="text-gray-300 ml-1">Goal Title</Label>
                  <input
                    type="text"
                    value={goalDetails.customTitle}
                    onChange={(e) => setGoalDetails({ ...goalDetails, customTitle: e.target.value })}
                    placeholder="What are you saving for?"
                    className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">Target Amount</Label>
                <div className="relative">
                  <CurrencyDollarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="number"
                    value={goalDetails.amountNeeded}
                    onChange={(e) => setGoalDetails({ ...goalDetails, amountNeeded: e.target.value })}
                    placeholder="Enter amount"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">When do you need it?</Label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="date"
                    value={goalDetails.targetDate}
                    onChange={(e) => setGoalDetails({ ...goalDetails, targetDate: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300 ml-1">Notes (Optional)</Label>
                <textarea
                  value={goalDetails.comments}
                  onChange={(e) => setGoalDetails({ ...goalDetails, comments: e.target.value })}
                  placeholder="Any extra details..."
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all min-h-[100px]"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 py-6 rounded-2xl text-gray-400 hover:text-gray-200 bg-transparent border-none shadow-none"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button
                  className="flex-[2] py-6 bg-cyan-600 hover:bg-cyan-500 rounded-2xl shadow-lg hover:shadow-cyan-500/20"
                  onClick={handleAddGoal}
                  disabled={isSubmitting || !goalDetails.amountNeeded || !goalDetails.targetDate}
                >
                  {isSubmitting ? "Adding..." : "Review Goal"} <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Finish */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center space-y-8 bg-neutral-900/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5 shadow-2xl max-w-lg w-full"
          >
            <div className="relative mx-auto w-24 h-24">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="absolute inset-0 bg-emerald-500/20 rounded-full flex items-center justify-center"
              >
                <CheckCircleIcon className="w-16 h-16 text-emerald-500" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -inset-4 bg-emerald-500/10 rounded-full -z-10"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-gray-100">You're all set!</h2>
              <p className="text-gray-400 leading-relaxed">
                We've built your financial foundation. You can now access all modules and start your journey.
              </p>
            </div>

            <Button
              className="w-full py-7 bg-emerald-600 hover:bg-emerald-500 rounded-2xl text-lg font-semibold transition-all shadow-lg hover:shadow-emerald-500/20"
              onClick={finishOnboarding}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Launching..." : "Enter Dashboard"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
