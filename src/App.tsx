import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import OnboardingCards from './components/OnboardingCards';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  // For demo purposes: Tutorial always shows on page refresh
  // Check if user has completed onboarding before
  // useEffect(() => {
  //   const hasCompletedOnboarding = localStorage.getItem('onboarding_complete');
  //   if (hasCompletedOnboarding === 'true') {
  //     setShowOnboarding(false);
  //   }
  // }, []);

  const handleCompleteOnboarding = () => {
    localStorage.setItem('onboarding_complete', 'true');
    setShowOnboarding(false);
  };

  const handleShowTutorial = () => {
    setShowOnboarding(true);
  };

  return (
    <>
      <Dashboard onShowTutorial={handleShowTutorial} />
      {showOnboarding && <OnboardingCards onComplete={handleCompleteOnboarding} />}
    </>
  );
}