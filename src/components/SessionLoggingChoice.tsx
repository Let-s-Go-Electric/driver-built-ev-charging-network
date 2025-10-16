import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Hand, Smartphone } from 'lucide-react';

interface SessionLoggingChoiceProps {
  autoLogging: boolean;
  setAutoLogging: (auto: boolean) => void;
  onNext: () => void;
}

export default function SessionLoggingChoice({ autoLogging, setAutoLogging, onNext }: SessionLoggingChoiceProps) {
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
          <h1 className="text-cyan-400">Location Access</h1>
          <p className="text-zinc-400">
            How would you like to log charging opportunities?
          </p>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card
              onClick={() => setAutoLogging(true)}
              className={`p-6 cursor-pointer transition-all ${
                autoLogging
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-cyan-400">Automatic Logging</h3>
                  <p className="text-zinc-400 mt-2">
                    Allow location access so we can automatically detect when you're at places where you could be charging.
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800">
                    <p className="text-zinc-300">
                      ✓ Effortless tracking
                    </p>
                    <p className="text-zinc-300">
                      ✓ Better insights
                    </p>
                    <p className="text-zinc-300">
                      ✓ Help build demand maps
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card
              onClick={() => setAutoLogging(false)}
              className={`p-6 cursor-pointer transition-all ${
                !autoLogging
                  ? 'bg-cyan-500/20 border-cyan-500'
                  : 'bg-zinc-900 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Hand className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-cyan-400">Manual Logging</h3>
                  <p className="text-zinc-400 mt-2">
                    Open the app and log a session whenever you think "I could be charging right now."
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800">
                    <p className="text-zinc-300">
                      ✓ Full control
                    </p>
                    <p className="text-zinc-300">
                      ✓ No location sharing
                    </p>
                    <p className="text-zinc-300">
                      ✓ Privacy-focused
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-zinc-400 text-center">
            💡 You can change this anytime in settings
          </p>
        </div>

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
