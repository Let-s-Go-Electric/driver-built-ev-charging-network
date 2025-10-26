import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { MapPin, Zap, DollarSign, Clock, StopCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ChargingSessionData } from './ChargingSessionForm';

interface ActiveSessionTrackerProps {
  session: ChargingSessionData;
  onEndSession: () => void;
}

export default function ActiveSessionTracker({ session, onEndSession }: ActiveSessionTrackerProps) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [energyAdded, setEnergyAdded] = useState(0);
  const [cost, setCost] = useState(0);
  const [stillCharging, setStillCharging] = useState<boolean | null>(null);
  const [distanceUnit, setDistanceUnit] = useState<'mi' | 'km'>('mi');

  // Load distance unit setting
  useEffect(() => {
    const savedDistanceUnit = localStorage.getItem('setting_distance_unit');
    if (savedDistanceUnit) {
      setDistanceUnit(savedDistanceUnit as 'mi' | 'km');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedMinutes(prev => {
        const newMinutes = prev + 1;
        
        // Calculate energy added (kW * hours)
        const hoursElapsed = newMinutes / 60;
        const newEnergy = session.speed * hoursElapsed;
        setEnergyAdded(newEnergy);

        // Calculate cost based on pricing model
        if (session.pricingModel === 'per-kwh') {
          setCost(newEnergy * session.price);
        } else if (session.pricingModel === 'subscription') {
          // For subscription, show prorated cost
          const daysInMonth = 30;
          const dailyCost = session.price / daysInMonth;
          const hourCost = dailyCost / 24;
          setCost(hourCost * hoursElapsed);
        } else {
          setCost(0);
        }

        return newMinutes;
      });
    }, 1000); // Update every second for demo, change to 60000 for real minutes

    return () => clearInterval(interval);
  }, [session]);

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedMins = elapsedMinutes % 60;
  const totalMinutes = session.duration * 60;
  const progressPercent = Math.min((elapsedMinutes / totalMinutes) * 100, 100);
  
  // Calculate distance based on unit preference
  const distanceAdded = distanceUnit === 'mi' 
    ? Math.round(energyAdded * 3.5) // 3.5 miles per kWh
    : Math.round(energyAdded * 5.6); // 5.6 km per kWh

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-cyan-400">⚡ Active Session</h3>
            <p className="text-zinc-300 mt-1">Tracking your charging opportunity</p>
          </div>
          <Button
            onClick={onEndSession}
            variant="outline"
            size="sm"
            className="bg-zinc-900 border-zinc-700 hover:bg-red-500/20 hover:border-red-500 text-zinc-300 hover:text-red-400"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            End Session
          </Button>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-zinc-300">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span>{session.location}</span>
        </div>

        {/* Time Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Duration</span>
            <span className="text-cyan-400">
              {elapsedHours}h {elapsedMins}m / {session.duration}h
            </span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {/* Energy Added */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-zinc-400">Energy</p>
            </div>
            <p className="text-cyan-400">{energyAdded.toFixed(1)} kWh</p>
            <p className="text-zinc-500">~{distanceAdded} {distanceUnit}</p>
          </Card>

          {/* Cost */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-zinc-400">Cost</p>
            </div>
            <p className="text-cyan-400">
              {session.pricingModel === 'free' ? 'FREE' : `$${cost.toFixed(2)}`}
            </p>
            <p className="text-zinc-500">
              {session.pricingModel === 'per-kwh' && `$${session.price.toFixed(2)}/kWh`}
              {session.pricingModel === 'subscription' && `Subscription`}
              {session.pricingModel === 'free' && `No charge`}
            </p>
          </Card>

          {/* Speed */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-zinc-400">Speed</p>
            </div>
            <p className="text-cyan-400">{session.speed} kW</p>
            <p className="text-zinc-500">
              {session.speed <= 7 && 'Level 1'}
              {session.speed > 7 && session.speed <= 19 && 'Level 2'}
              {session.speed > 19 && session.speed <= 50 && 'Level 2+'}
              {session.speed > 50 && 'DC Fast'}
            </p>
          </Card>

          {/* Potential Savings */}
          <Card className="bg-zinc-900/50 border-zinc-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-zinc-400">Impact</p>
            </div>
            <p className="text-emerald-400">{distanceAdded} {distanceUnit}</p>
            <p className="text-zinc-500">Could've driven</p>
          </Card>
        </div>

        {/* Info Message */}
        {progressPercent >= 100 && stillCharging === null && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg space-y-3"
          >
            <p className="text-cyan-300">
              ⏰ Your expected duration has elapsed. Still at this location?
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setStillCharging(true)}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
              >
                Yes, Still Here
              </Button>
              <Button
                onClick={() => {
                  setStillCharging(false);
                  onEndSession();
                }}
                variant="outline"
                className="flex-1 bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
              >
                No, I Left
              </Button>
            </div>
          </motion.div>
        )}

        {progressPercent >= 100 && stillCharging === true && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-lg"
          >
            <p className="text-emerald-300">
              ✅ Great! We'll continue tracking your charging opportunity.
            </p>
          </motion.div>
        )}

        <p className="text-zinc-500 text-center">
          💡 This session helps identify demand for charging infrastructure
        </p>
      </Card>
    </motion.div>
  );
}