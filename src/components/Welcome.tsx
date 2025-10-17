import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Zap, MapPin, Users } from 'lucide-react';

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20"
          >
            <Zap className="w-10 h-10 text-cyan-400" />
          </motion.div>
          
          <h1 className="text-cyan-400">Let's Go Electric!</h1>
          <p className="text-zinc-400">
            The EV Charging Network Built for and by Drivers
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-6">
            <div>
              <h2 className="text-white">Why EV Charging Matters</h2>
              <p className="text-zinc-400 mt-2">
                Electric vehicles are the future, but charging infrastructure needs to be where <em>you</em> need it most.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-cyan-400">Voice Your Needs</h3>
                  <p className="text-zinc-400">
                    Tell us where you spend time and where charging would make your life easier.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-cyan-400">Community Driven</h3>
                  <p className="text-zinc-400">
                    Join thousands of drivers helping build a charging network that works for everyone.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button
            onClick={onNext}
            className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
          >
            Let's Go Electric →
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}