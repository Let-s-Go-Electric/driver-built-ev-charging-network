import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Zap, DollarSign, MapPin, Smartphone, Hand } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [autoLogging, setAutoLogging] = useState(true);
  const [defaultSpeed, setDefaultSpeed] = useState(11);
  const [defaultPricingModel, setDefaultPricingModel] = useState<'per-kwh' | 'subscription' | 'free'>('per-kwh');
  const [defaultPrice, setDefaultPrice] = useState(0.30);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedAutoLogging = localStorage.getItem('setting_auto_logging');
    const savedSpeed = localStorage.getItem('setting_default_speed');
    const savedPricingModel = localStorage.getItem('setting_pricing_model');
    const savedPrice = localStorage.getItem('setting_default_price');

    if (savedAutoLogging !== null) setAutoLogging(savedAutoLogging === 'true');
    if (savedSpeed !== null) setDefaultSpeed(parseFloat(savedSpeed));
    if (savedPricingModel !== null) setDefaultPricingModel(savedPricingModel as any);
    if (savedPrice !== null) setDefaultPrice(parseFloat(savedPrice));
  }, []);

  const handleSave = () => {
    localStorage.setItem('setting_auto_logging', autoLogging.toString());
    localStorage.setItem('setting_default_speed', defaultSpeed.toString());
    localStorage.setItem('setting_pricing_model', defaultPricingModel);
    localStorage.setItem('setting_default_price', defaultPrice.toString());
    onClose();
  };

  const getSpeedLabel = (kw: number) => {
    if (kw <= 7) return 'Level 1 (Home)';
    if (kw <= 19) return 'Level 2 (Public)';
    if (kw <= 50) return 'Level 2+ (Fast)';
    return 'DC Fast';
  };

  return (
    <div className="space-y-6">
      {/* Session Tracking */}
      <div className="space-y-4">
        <div>
          <h3 className="text-cyan-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Session Tracking
          </h3>
          <p className="text-zinc-500 mt-1">How sessions are logged</p>
        </div>
        
        <RadioGroup value={autoLogging ? 'auto' : 'manual'} onValueChange={(value) => setAutoLogging(value === 'auto')}>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              autoLogging ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <RadioGroupItem value="auto" id="auto" />
              <Smartphone className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <p className="text-zinc-200">Automatic</p>
                <p className="text-zinc-500">Auto-detect locations</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              !autoLogging ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <RadioGroupItem value="manual" id="manual" />
              <Hand className="w-5 h-5 text-cyan-400" />
              <div className="flex-1">
                <p className="text-zinc-200">Manual</p>
                <p className="text-zinc-500">Log sessions yourself</p>
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Default Charging Speed */}
      <div className="space-y-4">
        <div>
          <h3 className="text-cyan-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Default Charging Speed
          </h3>
          <p className="text-zinc-500 mt-1">Pre-fills new sessions</p>
        </div>

        <div className="space-y-3">
          <div className="px-2 py-4">
            <Slider
              value={[defaultSpeed]}
              onValueChange={(value) => setDefaultSpeed(value[0])}
              min={1}
              max={150}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-zinc-500">1 kW</span>
              <span className="text-cyan-400">{defaultSpeed} kW</span>
              <span className="text-zinc-500">150 kW</span>
            </div>
          </div>
          <p className="text-zinc-400">{getSpeedLabel(defaultSpeed)}</p>
        </div>
      </div>

      <Separator className="bg-zinc-800" />

      {/* Default Pricing */}
      <div className="space-y-4">
        <div>
          <h3 className="text-cyan-400 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Default Pricing Model
          </h3>
          <p className="text-zinc-500 mt-1">Pre-fills new sessions</p>
        </div>

        <RadioGroup value={defaultPricingModel} onValueChange={(value: any) => {
          setDefaultPricingModel(value);
          if (value === 'per-kwh') {
            setDefaultPrice(0.30);
          } else if (value === 'subscription') {
            setDefaultPrice(25);
          } else if (value === 'free') {
            setDefaultPrice(0);
          }
        }}>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              defaultPricingModel === 'per-kwh' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <RadioGroupItem value="per-kwh" id="pricing-per-kwh" />
              <div className="flex-1">
                <p className="text-zinc-200">Pay Per kWh</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              defaultPricingModel === 'subscription' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <RadioGroupItem value="subscription" id="pricing-subscription" />
              <div className="flex-1">
                <p className="text-zinc-200">Subscription</p>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              defaultPricingModel === 'free' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-zinc-900 border-zinc-800'
            }`}>
              <RadioGroupItem value="free" id="pricing-free" />
              <div className="flex-1">
                <p className="text-zinc-200">Free</p>
              </div>
            </label>
          </div>
        </RadioGroup>

        {defaultPricingModel === 'per-kwh' && (
          <div className="space-y-2">
            <Label className="text-zinc-400">Default Price per kWh</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <Input
                type="number"
                step="0.01"
                value={defaultPrice.toFixed(2)}
                onChange={(e) => setDefaultPrice(parseFloat(e.target.value) || 0)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100 pl-8"
              />
            </div>
          </div>
        )}

        {defaultPricingModel === 'subscription' && (
          <div className="space-y-2">
            <Label className="text-zinc-400">Default Monthly Fee</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
              <Input
                type="number"
                step="1"
                value={defaultPrice.toFixed(2)}
                onChange={(e) => setDefaultPrice(parseFloat(e.target.value) || 0)}
                className="bg-zinc-900 border-zinc-800 text-zinc-100 pl-8"
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
