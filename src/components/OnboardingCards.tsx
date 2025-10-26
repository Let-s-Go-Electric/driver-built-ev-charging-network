import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Button } from './ui/button';
import { Zap, MapPin, TrendingUp, Check, ChevronRight, X, Smartphone, Hand, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface OnboardingCardsProps {
  onComplete: () => void;
}

export default function OnboardingCards({ onComplete }: OnboardingCardsProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [firstLocation, setFirstLocation] = useState('');
  const [addedLocations, setAddedLocations] = useState<string[]>([]);
  const [autoLogging, setAutoLogging] = useState(true);

  const handleAddLocation = () => {
    if (firstLocation.trim()) {
      setAddedLocations(prev => [...prev, firstLocation.trim()]);
      setFirstLocation('');
    }
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    setAddedLocations(prev => prev.filter(loc => loc !== locationToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLocation();
    }
  };

  const cards = [
    {
      id: 0,
      title: "Welcome to Let's Go Electric!",
      icon: Zap,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
      description: "Help bring EV charging to your community. Request chargers where you need them, track installation progress, and build demand together.",
      action: null
    },
    {
      id: 1,
      title: "Request Charging Locations",
      icon: MapPin,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
      description: "Where do you spend time that needs charging? Add your first location to help build the network.",
      action: (
        <div className="space-y-3">
          <div className="relative">
            <Input
              placeholder="e.g., My Apartment, Work, Gym..."
              value={firstLocation}
              onChange={(e) => setFirstLocation(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 h-12 pr-12"
            />
            <button
              onClick={handleAddLocation}
              disabled={!firstLocation.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5 text-zinc-950" />
            </button>
          </div>
          {addedLocations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {addedLocations.map((location, index) => (
                <motion.div
                  key={`${location}-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-cyan-400 flex items-center gap-2 group"
                >
                  <span>{location}</span>
                  <button
                    onClick={() => handleRemoveLocation(location)}
                    className="w-4 h-4 rounded-full hover:bg-cyan-500/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )
    },
    {
      id: 2,
      title: "Track Installation Progress",
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
      description: "Watch your requested locations move through stages: Considering → Planning → Installing → Live. Real-time updates keep you in the loop.",
      action: null
    },
    {
      id: 3,
      title: "Choose Your Tracking Style",
      icon: MapPin,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
      description: "How would you like to log charging opportunities?",
      action: (
        <div className="space-y-3">
          <Card
            onClick={() => setAutoLogging(true)}
            className={`p-4 cursor-pointer transition-all ${
              autoLogging
                ? 'bg-cyan-500/20 border-cyan-500'
                : 'bg-zinc-950 border-zinc-700 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-cyan-400">Automatic Logging</p>
                <p className="text-zinc-400 mt-1">
                  Auto-detect when you're at places you could be charging
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => setAutoLogging(false)}
            className={`p-4 cursor-pointer transition-all ${
              !autoLogging
                ? 'bg-cyan-500/20 border-cyan-500'
                : 'bg-zinc-950 border-zinc-700 hover:border-cyan-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Hand className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-cyan-400">Manual Logging</p>
                <p className="text-zinc-400 mt-1">
                  Log sessions yourself - no location sharing needed
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 4,
      title: "You're All Set!",
      icon: Check,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/20',
      description: "Explore the map, add more locations, and log charging sessions to build demand data. Together, we're building the EV future!",
      action: null
    }
  ];

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentCard < cards.length - 1) {
      setCurrentCard(prev => prev + 1);
    } else if (info.offset.x > threshold && currentCard > 0) {
      setCurrentCard(prev => prev - 1);
    }
  };

  const card = cards[currentCard];
  const Icon = card.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Card Container */}
      <div className="relative w-full max-w-md">
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute -top-12 right-0 text-zinc-400 hover:text-zinc-300 transition-colors flex items-center gap-2"
        >
          Skip <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 space-y-6">
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${card.iconBg} border border-${card.iconColor.replace('text-', '')}/20 flex items-center justify-center mx-auto`}>
                <Icon className={`w-8 h-8 ${card.iconColor}`} />
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h2 className="text-cyan-400">{card.title}</h2>
                <p className="text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Action Area */}
              {card.action && (
                <div className="pt-2">
                  {card.action}
                </div>
              )}

              {/* Navigation */}
              <div className="pt-4 space-y-4">
                <Button
                  onClick={handleNext}
                  className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-zinc-950"
                >
                  {currentCard === cards.length - 1 ? "Let's Go!" : 'Continue'}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCard(index)}
                      className={`p-2 group`}
                    >
                      <div className={`h-2 rounded-full transition-all ${
                        index === currentCard
                          ? 'w-8 bg-cyan-400'
                          : 'w-2 bg-zinc-700 group-hover:bg-zinc-600'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Hint */}
        {currentCard === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center text-zinc-500 mt-4"
          >
            Swipe or tap to continue
          </motion.p>
        )}
      </div>
    </div>
  );
}
