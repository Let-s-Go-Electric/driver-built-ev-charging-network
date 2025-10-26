import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { MapPin, Zap, DollarSign, Clock, Battery, Calendar, Smile } from 'lucide-react';

interface ChargingSessionFormProps {
  onSubmit: (session: ChargingSessionData) => void;
}

export interface ChargingSessionData {
  location: string;
  speed: number;
  pricingModel: 'per-kwh' | 'subscription' | 'free';
  price: number;
  duration: number;
}

export default function ChargingSessionForm({ onSubmit }: ChargingSessionFormProps) {
  const [location, setLocation] = useState('Current Location (Auto-detected)');
  const [speed, setSpeed] = useState(11);
  const [pricingModel, setPricingModel] = useState<'per-kwh' | 'subscription' | 'free'>('per-kwh');
  const [price, setPrice] = useState(0.30);
  const [duration, setDuration] = useState(2);

  const getSpeedDescription = (kw: number) => {
    if (kw <= 7) {
      return {
        title: 'Level 1 (1.4 - 7 kW)',
        description: 'Perfect for overnight charging at home. Adds 3-5 miles per hour. Most affordable option for daily charging needs.',
        icon: '🏠'
      };
    } else if (kw <= 19) {
      return {
        title: 'Level 2 (7 - 19 kW)',
        description: 'Ideal for workplace and public charging. Adds 15-25 miles per hour. Best balance of cost and convenience.',
        icon: '⚡'
      };
    } else if (kw <= 50) {
      return {
        title: 'Level 2+ (19 - 50 kW)',
        description: 'Faster public charging for quick top-ups. Adds 25-50 miles per hour. Good for shopping trips and errands.',
        icon: '🔌'
      };
    } else {
      return {
        title: 'DC Fast Charging (50+ kW)',
        description: 'Rapid charging for road trips. Adds 100+ miles per hour. Premium pricing for maximum speed.',
        icon: '⚡️'
      };
    }
  };

  const speedInfo = getSpeedDescription(speed);

  const handleSubmit = () => {
    onSubmit({
      location,
      speed,
      pricingModel,
      price: pricingModel === 'free' ? 0 : price,
      duration
    });
  };

  return (
    <div className="space-y-6">
      {/* Location */}
      <div className="space-y-3">
        <Label className="text-zinc-200 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Location
        </Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location or use current"
          className="bg-zinc-900 border-zinc-800 text-zinc-100"
        />
        <p className="text-zinc-500">
          📍 Using your current location. Edit if needed.
        </p>
      </div>

      {/* Charging Speed */}
      <div className="space-y-3">
        <Label className="text-zinc-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          Charging Speed
        </Label>
        <div className="px-2 py-6">
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={1}
            max={150}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-zinc-400">1 kW</span>
            <span className="text-cyan-400">{speed} kW</span>
            <span className="text-zinc-400">150 kW</span>
          </div>
        </div>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">{speedInfo.icon}</span>
            </div>
            <div>
              <p className="text-cyan-400">{speedInfo.title}</p>
              <p className="text-zinc-400 mt-1">{speedInfo.description}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pricing Model */}
      <div className="space-y-3">
        <Label className="text-zinc-200 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-cyan-400" />
          Pricing Preference
        </Label>
        <RadioGroup value={pricingModel} onValueChange={(value: any) => {
          setPricingModel(value);
          if (value === 'per-kwh') {
            setPrice(0.30);
          } else if (value === 'subscription') {
            setPrice(25);
          } else if (value === 'free') {
            setPrice(0);
          }
        }}>
          <div className="space-y-3">
            <label
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                pricingModel === 'per-kwh'
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                pricingModel === 'per-kwh'
                  ? 'bg-cyan-500/20 border border-cyan-500'
                  : 'bg-zinc-800 border border-zinc-700'
              }`}>
                <Zap className={`w-5 h-5 ${
                  pricingModel === 'per-kwh' ? 'text-cyan-400' : 'text-zinc-500'
                }`} />
              </div>
              <RadioGroupItem value="per-kwh" id="per-kwh" className="sr-only" />
              <div className="flex-1">
                <p className="text-zinc-200">Pay Per kWh</p>
                <p className="text-zinc-500">Pay only for the energy you use</p>
              </div>
            </label>

            <label
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                pricingModel === 'subscription'
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                pricingModel === 'subscription'
                  ? 'bg-cyan-500/20 border border-cyan-500'
                  : 'bg-zinc-800 border border-zinc-700'
              }`}>
                <Calendar className={`w-5 h-5 ${
                  pricingModel === 'subscription' ? 'text-cyan-400' : 'text-zinc-500'
                }`} />
              </div>
              <RadioGroupItem value="subscription" id="subscription" className="sr-only" />
              <div className="flex-1">
                <p className="text-zinc-200">Subscription Access</p>
                <p className="text-zinc-500">Monthly fee for unlimited charging</p>
              </div>
            </label>

            <label
              className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                pricingModel === 'free'
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                pricingModel === 'free'
                  ? 'bg-cyan-500/20 border border-cyan-500'
                  : 'bg-zinc-800 border border-zinc-700'
              }`}>
                <Smile className={`w-5 h-5 ${
                  pricingModel === 'free' ? 'text-cyan-400' : 'text-zinc-500'
                }`} />
              </div>
              <RadioGroupItem value="free" id="free" className="sr-only" />
              <div className="flex-1">
                <p className="text-zinc-200">Free Charging</p>
                <p className="text-zinc-500">Employer or building provided</p>
              </div>
            </label>
          </div>
        </RadioGroup>

        {/* Price Input based on model */}
        {pricingModel === 'per-kwh' && (
          <div className="space-y-2">
            <Label className="text-zinc-400">Price per kWh</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <Input
                type="number"
                step="0.01"
                value={price.toFixed(2)}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100 pl-8"
              />
            </div>
            <p className="text-zinc-500">
              💡 Average: $0.20 - $0.40 per kWh
            </p>
          </div>
        )}

        {pricingModel === 'subscription' && (
          <div className="space-y-2">
            <Label className="text-zinc-400">Monthly Subscription</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <Input
                type="number"
                step="1"
                value={price.toFixed(2)}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100 pl-8"
              />
            </div>
            <p className="text-zinc-500">
              💡 Typical: $30 - $100 per month
            </p>
          </div>
        )}

        {pricingModel === 'free' && (
          <Card className="bg-zinc-900 border-zinc-800 p-4">
            <p className="text-zinc-300">
              🎉 Free charging helps drive EV adoption and shows strong employer/property commitment to sustainability!
            </p>
          </Card>
        )}
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <Label className="text-zinc-200 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Expected Duration
        </Label>
        <div className="px-2 py-6">
          <Slider
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
            min={0.5}
            max={8}
            step={0.5}
            className="w-full"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-zinc-400">30 min</span>
            <span className="text-cyan-400">{duration} hours</span>
            <span className="text-zinc-400">8 hours</span>
          </div>
        </div>
        <p className="text-zinc-500">
          ⏱ We'll check in when your expected time is up
        </p>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
      >
        Start Session
      </Button>
    </div>
  );
}