import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Slider } from './ui/slider';
import { Zap, Clock, MapPin } from 'lucide-react';

interface ChargingSpeedFormProps {
  speed: number;
  setSpeed: (speed: number) => void;
  onNext: () => void;
}

export default function ChargingSpeedForm({ speed, setSpeed, onNext }: ChargingSpeedFormProps) {
  const getChargingType = (kw: number) => {
    if (kw <= 22) return 'Level 2';
    if (kw <= 100) return 'DC Fast';
    return 'Ultra Fast';
  };

  const getChargingDescription = (kw: number) => {
    if (kw <= 22) return 'Perfect for overnight or while at work/home. Adds 20-40 miles per hour.';
    if (kw <= 100) return 'Great for quick top-ups. Adds 100-200 miles in 30 minutes.';
    return 'Fastest option available. Adds 200+ miles in 20 minutes.';
  };

  const getEstimatedTime = (kw: number) => {
    if (kw <= 22) return '4-8 hours for full charge';
    if (kw <= 100) return '30-45 minutes for 80%';
    return '15-25 minutes for 80%';
  };

  const getTypicalScenario = (kw: number) => {
    if (kw <= 22) return 'At home overnight, at work during the day, or at apartments/destinations where you park for hours.';
    if (kw <= 100) return 'On road trips or errands — coffee shops, shopping centers, or quick stops during longer drives.';
    return 'Highway rest stops and dedicated charging stations for minimal wait time during long-distance travel.';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Zap className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-cyan-400">Charging Preferences</h1>
          <p className="text-zinc-400">
            Learn about charging speeds and set your preferred default
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Charging Speed</span>
              <div className="text-right">
                <div className="text-cyan-400">{speed} kW</div>
                <div className="text-zinc-500">{getChargingType(speed)}</div>
              </div>
            </div>

            <div className="py-4">
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={7}
                max={350}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-zinc-600">
                <span>7 kW</span>
                <span>350 kW</span>
              </div>
            </div>
          </div>

          <motion.div
            key={getChargingType(speed)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 space-y-3"
          >
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-cyan-400">{getChargingType(speed)} Charging</h3>
                <p className="text-zinc-300 mt-1">
                  {getChargingDescription(speed)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-cyan-400">Estimated Time</h3>
                <p className="text-zinc-300 mt-1">
                  {getEstimatedTime(speed)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-cyan-400">Typical Scenario</h3>
                <p className="text-zinc-300 mt-1">
                  {getTypicalScenario(speed)}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="text-zinc-500 text-center p-4 bg-zinc-950 rounded-lg border border-zinc-800">
            💡 You can always adjust this later for specific locations
          </div>
        </Card>

        <Button
          onClick={onNext}
          className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
        >
          Continue →
        </Button>
      </motion.div>
    </div>
  );
}