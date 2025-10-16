import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { X, Plus, MapPin } from 'lucide-react';

interface LocationsFormProps {
  locations: string[];
  setLocations: (locations: string[]) => void;
  onNext: () => void;
}

const suggestedLocations = [
  'My Apartment Complex',
  'My Workplace',
  'Local Park',
  'Grocery Store'
];

export default function LocationsForm({ locations, setLocations, onNext }: LocationsFormProps) {
  const [currentInput, setCurrentInput] = useState('');

  const addLocation = (location: string) => {
    if (location.trim() && !locations.includes(location.trim())) {
      setLocations([...locations, location.trim()]);
      setCurrentInput('');
    }
  };

  const removeLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      addLocation(currentInput);
    }
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
            <MapPin className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-cyan-400">Where Do You Go?</h1>
          <p className="text-zinc-400">
            Add locations where you'd like to see EV charging available
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Enter a location..."
                className="flex-1 h-12 bg-zinc-950 border-zinc-700 focus:border-cyan-500 text-zinc-100"
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-zinc-500">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => addLocation(location)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-cyan-500/50 transition-colors text-zinc-300"
                    disabled={locations.includes(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {locations.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <p className="text-zinc-400">Your locations:</p>
              <div className="space-y-2">
                {locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-950 border border-zinc-800"
                  >
                    <span className="text-zinc-200">{location}</span>
                    <button
                      onClick={() => removeLocation(index)}
                      className="p-1 hover:bg-zinc-800 rounded"
                    >
                      <X className="w-4 h-4 text-zinc-500" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Button
          onClick={onNext}
          disabled={locations.length === 0}
          className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </Button>
      </motion.div>
    </div>
  );
}
