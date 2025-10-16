import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Zap, TrendingUp, Plus, Search, Menu } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'map' | 'sessions'>('map');

  // Mock data for hot locations
  const hotLocations = [
    { name: 'Downtown Shopping District', demand: 156, trend: '+12%' },
    { name: 'City Park', demand: 89, trend: '+8%' },
    { name: 'Tech Campus', demand: 134, trend: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-cyan-400">Let's Go Electric!</h2>
              <p className="text-zinc-500">Network Dashboard</p>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-zinc-400">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search locations..."
            className="w-full h-12 pl-12 pr-4 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-cyan-500 text-zinc-100 placeholder:text-zinc-500"
          />
        </div>

        {/* Map Placeholder */}
        <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
          <div className="relative h-96 bg-zinc-950 flex items-center justify-center">
            {/* Map placeholder with styled grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-cyan-500/20" />
                ))}
              </div>
            </div>
            
            {/* Demand markers */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center"
            >
              <MapPin className="w-8 h-8 text-cyan-400" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center"
            >
              <MapPin className="w-6 h-6 text-cyan-400" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-1/4 left-1/2 w-20 h-20 rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center"
            >
              <MapPin className="w-10 h-10 text-cyan-400" />
            </motion.div>

            <div className="relative z-10 text-center space-y-2">
              <MapPin className="w-12 h-12 text-cyan-400 mx-auto" />
              <p className="text-zinc-400">Interactive Demand Map</p>
              <p className="text-zinc-600">Showing charging demand hotspots</p>
            </div>
          </div>
        </Card>

        {/* Hot Locations Dashboard */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-cyan-400">🔥 Hot Locations</h3>
            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
              See more
            </Button>
          </div>
          
          <div className="grid gap-3">
            {hotLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900 border-zinc-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-zinc-200">{location.name}</p>
                        <p className="text-zinc-500">{location.demand} requests</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">{location.trend}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Log Session Card */}
        <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-cyan-400">I Could Be Charging</h3>
              <p className="text-zinc-300 mt-2">
                At a location where charging would be helpful? Log a session to help build demand data.
              </p>
            </div>
            <Button className="h-12 w-12 rounded-full bg-cyan-500 hover:bg-cyan-600 text-zinc-950 flex-shrink-0">
              <Plus className="w-6 h-6" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation (if needed for mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-6 py-4 md:hidden">
        <div className="flex items-center justify-around max-w-4xl mx-auto">
          <button className="flex flex-col items-center gap-1 text-cyan-400">
            <MapPin className="w-6 h-6" />
            <span>Map</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-zinc-500">
            <Zap className="w-6 h-6" />
            <span>Sessions</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-zinc-500">
            <TrendingUp className="w-6 h-6" />
            <span>Stats</span>
          </button>
        </div>
      </div>
    </div>
  );
}
