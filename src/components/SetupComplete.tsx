import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Sparkles } from 'lucide-react';

interface SetupCompleteProps {
  onComplete: () => void;
}

export default function SetupComplete({ onComplete }: SetupCompleteProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-500"
          >
            <CheckCircle className="w-12 h-12 text-cyan-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="text-cyan-400">You're All Set!</h1>
            <p className="text-zinc-400 mt-2">
              Welcome to the charging network for and by drivers
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-cyan-400">Thank You!</h3>
                <p className="text-zinc-300 mt-2">
                  Your input helps us understand where EV charging infrastructure is needed most. Together, we're building a network that works for real drivers.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <h3 className="text-cyan-400">What's Next?</h3>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 flex-shrink-0">→</span>
                  <span>Explore demand hotspots on the map</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 flex-shrink-0">→</span>
                  <span>Log charging opportunities as you go</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 flex-shrink-0">→</span>
                  <span>See where others want charging too</span>
                </li>
              </ul>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button
            onClick={onComplete}
            className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
          >
            Explore the Network →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
