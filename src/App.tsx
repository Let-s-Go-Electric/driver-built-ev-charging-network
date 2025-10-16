import { useState } from 'react';
import Welcome from './components/Welcome';
import LocationsForm from './components/LocationsForm';
import ChargingSpeedForm from './components/ChargingSpeedForm';
import SessionLoggingChoice from './components/SessionLoggingChoice';
import SetupComplete from './components/SetupComplete';
import Dashboard from './components/Dashboard';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);
  const [userLocations, setUserLocations] = useState<string[]>([]);
  const [chargingSpeed, setChargingSpeed] = useState(50);
  const [autoLogging, setAutoLogging] = useState(false);

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleCompleteSetup = () => {
    setSetupComplete(true);
  };

  if (setupComplete) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {currentStep === 0 && <Welcome onNext={handleNextStep} />}
      {currentStep === 1 && (
        <LocationsForm
          locations={userLocations}
          setLocations={setUserLocations}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 2 && (
        <ChargingSpeedForm
          speed={chargingSpeed}
          setSpeed={setChargingSpeed}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 3 && (
        <SessionLoggingChoice
          autoLogging={autoLogging}
          setAutoLogging={setAutoLogging}
          onNext={handleNextStep}
        />
      )}
      {currentStep === 4 && <SetupComplete onComplete={handleCompleteSetup} />}
    </div>
  );
}
