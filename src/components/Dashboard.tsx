import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Zap, TrendingUp, Plus, Search, Menu, Clock, DollarSign, Building2, ChevronRight, Flame, Settings as SettingsIcon, GraduationCap, Battery } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ChargingSessionForm, { ChargingSessionData } from './ChargingSessionForm';
import ActiveSessionTracker from './ActiveSessionTracker';
import Settings from './Settings';

interface DashboardProps {
  onShowTutorial?: () => void;
}

export default function Dashboard({ onShowTutorial }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'sessions'>('map');
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [locationsView, setLocationsView] = useState<'my-locations' | 'hot-spots'>('my-locations');
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [activeSession, setActiveSession] = useState<ChargingSessionData | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [distanceUnit, setDistanceUnit] = useState<'mi' | 'km'>('mi');

  // Load distance unit setting
  useEffect(() => {
    const savedDistanceUnit = localStorage.getItem('setting_distance_unit');
    if (savedDistanceUnit) {
      setDistanceUnit(savedDistanceUnit as 'mi' | 'km');
    }
  }, [showSettings]); // Reload when settings close

  // Function to calculate distance from energy
  const calculateDistance = (energyKwh: number) => {
    if (distanceUnit === 'mi') {
      return Math.round(energyKwh * 3.5); // 3.5 miles per kWh
    } else {
      return Math.round(energyKwh * 5.6); // 5.6 km per kWh (3.5 miles * 1.6)
    }
  };

  // Mock data for past charging sessions
  const pastSessions = [
    {
      id: 1,
      location: 'Oakwood Apartments',
      address: '1234 Main St',
      date: 'Oct 25, 2025',
      time: '7:30 PM',
      duration: 3.5,
      speed: 11,
      energyGained: 38.5,
      cost: 11.55,
      pricingModel: 'per-kwh' as const
    },
    {
      id: 2,
      location: 'Valley View Office Park',
      address: '5678 Business Blvd',
      date: 'Oct 24, 2025',
      time: '9:00 AM',
      duration: 6.0,
      speed: 7,
      energyGained: 42.0,
      cost: 0,
      pricingModel: 'free' as const
    },
    {
      id: 3,
      location: 'Downtown Supercharger',
      address: '789 Market St',
      date: 'Oct 22, 2025',
      time: '2:15 PM',
      duration: 0.5,
      speed: 150,
      energyGained: 75.0,
      cost: 30.00,
      pricingModel: 'subscription' as const
    },
    {
      id: 4,
      location: 'Riverside Coffee',
      address: '910 River Rd',
      date: 'Oct 20, 2025',
      time: '11:00 AM',
      duration: 2.0,
      speed: 11,
      energyGained: 22.0,
      cost: 6.60,
      pricingModel: 'per-kwh' as const
    }
  ];

  // Mock data for hot locations
  const hotLocations = [
    { name: 'Downtown Shopping District', demand: 156, trend: '+12%' },
    { name: 'City Park', demand: 89, trend: '+8%' },
    { name: 'Tech Campus', demand: 134, trend: '+15%' }
  ];

  // Mock data for user's tracked locations
  const myLocations = [
    {
      id: 1,
      name: 'Oakwood Apartments',
      address: '1234 Main St',
      requests: 47,
      status: 'Planning',
      chargerTypes: ['Level 2 (7kW)', 'DC Fast (50kW)'],
      pricing: 'Pay-per-use ($0.35/kWh)',
      timeline: {
        current: 'Planning',
        steps: ['Considering', 'Planning', 'Installing', 'Live'],
        progress: 50,
        estimatedCompletion: 'Q2 2026'
      }
    },
    {
      id: 2,
      name: 'Valley View Office Park',
      address: '5678 Business Blvd',
      requests: 89,
      status: 'Installing',
      chargerTypes: ['Level 2 (11kW)'],
      pricing: 'Free for employees',
      timeline: {
        current: 'Installing',
        steps: ['Considering', 'Planning', 'Installing', 'Live'],
        progress: 75,
        estimatedCompletion: 'Q1 2026'
      }
    },
    {
      id: 3,
      name: 'Riverside Coffee',
      address: '910 River Rd',
      requests: 23,
      status: 'Not Yet Considering',
      chargerTypes: [],
      pricing: 'TBD',
      timeline: {
        current: 'Not Yet Considering',
        steps: ['Considering', 'Planning', 'Installing', 'Live'],
        progress: 0,
        estimatedCompletion: 'TBD'
      }
    }
  ];

  // Map markers with location data
  const mapMarkers = [
    {
      id: 1,
      name: 'Oakwood Apartments',
      x: '33%',
      y: '25%',
      size: 'lg',
      ...myLocations[0]
    },
    {
      id: 2,
      name: 'Valley View Office Park',
      x: '75%',
      y: '50%',
      size: 'md',
      ...myLocations[1]
    },
    {
      id: 3,
      name: 'Riverside Coffee',
      x: '50%',
      y: '75%',
      size: 'xl',
      ...myLocations[2]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Installing':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Planning':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Considering':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  const getProgressForStatus = (status: string) => {
    const statusMap: Record<string, number> = {
      'Not Yet Considering': 0,
      'Considering': 25,
      'Planning': 50,
      'Installing': 75,
      'Live': 100
    };
    return statusMap[status] || 0;
  };

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
          <Button 
            size="icon" 
            variant="ghost" 
            className="text-zinc-400 hover:text-cyan-400 transition-colors w-12 h-12"
            onClick={() => setShowMenu(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6 pb-32 lg:pb-32">
        {activeTab === 'map' && (
          <>
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
            
            {/* Clickable Demand markers */}
            {mapMarkers.map((marker, index) => {
              const sizeClasses = {
                sm: 'w-10 h-10',
                md: 'w-12 h-12',
                lg: 'w-16 h-16',
                xl: 'w-20 h-20'
              };
              const iconSizes = {
                sm: 'w-5 h-5',
                md: 'w-6 h-6',
                lg: 'w-8 h-8',
                xl: 'w-10 h-10'
              };
              
              return (
                <motion.button
                  key={marker.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedLocation(marker)}
                  className={`absolute ${sizeClasses[marker.size as keyof typeof sizeClasses]} rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-500/50 cursor-pointer transition-all hover:scale-110`}
                  style={{ left: marker.x, top: marker.y }}
                >
                  <MapPin className={`${iconSizes[marker.size as keyof typeof iconSizes]} text-cyan-400`} />
                </motion.button>
              );
            })}

            <div className="relative z-0 text-center space-y-2 pointer-events-none">
              <MapPin className="w-12 h-12 text-cyan-400 mx-auto" />
              <p className="text-zinc-400">Interactive Demand Map</p>
              <p className="text-zinc-600">Click markers for details</p>
            </div>
          </div>
        </Card>

        {/* Locations Tabs Section */}
        <Tabs defaultValue="my-locations" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border border-zinc-800">
            <TabsTrigger 
              value="my-locations" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=inactive]:text-zinc-300"
            >
              📍 My Locations
            </TabsTrigger>
            <TabsTrigger 
              value="hot-spots" 
              className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400 data-[state=inactive]:text-zinc-300"
            >
              🔥 Hot Spots
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-locations" className="mt-4">
            <div className="grid gap-3">
              {myLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-zinc-900 border-zinc-800 p-4 cursor-pointer hover:border-cyan-500/50 transition-colors"
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-zinc-200">{location.name}</p>
                            <p className="text-zinc-500">{location.address}</p>
                            <p className="text-zinc-600 mt-1">{location.requests} requests</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-500 flex-shrink-0" />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(location.status)} border`}>
                          {location.status}
                        </Badge>
                        {location.timeline.estimatedCompletion !== 'TBD' && (
                          <span className="text-zinc-500">ETA: {location.timeline.estimatedCompletion}</span>
                        )}
                      </div>
                      
                      <Progress value={location.timeline.progress} className="h-2" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hot-spots" className="mt-4">
            <div className="grid gap-3">
              {hotLocations.map((location, index) => (
                <motion.div
                  key={location.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                          <Flame className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                          <p className="text-zinc-200">{location.name}</p>
                          <p className="text-zinc-500">{location.demand} requests</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">{location.trend}</span>
                        </div>
                        <p className="text-zinc-600">This week</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Log Session Card */}
        {!activeSession ? (
          <Card className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-cyan-400">I Could Be Charging</h3>
                <p className="text-zinc-300 mt-2">
                  At a location where charging would be helpful? Log a session to help build demand data.
                </p>
              </div>
              <Button 
                className="h-12 w-12 rounded-full bg-cyan-500 hover:bg-cyan-600 text-zinc-950 flex-shrink-0" 
                onClick={() => setShowSessionForm(true)}
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          </Card>
        ) : (
          <ActiveSessionTracker 
            session={activeSession} 
            onEndSession={() => setActiveSession(null)} 
          />
        )}
        </>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            <h2 className="text-cyan-400">Past Charging Sessions</h2>
            <div className="grid gap-4">
              {pastSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900 border-zinc-800 p-4">
                    <div className="space-y-3">
                      {/* Location and Date */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div>
                            <p className="text-zinc-200">{session.location}</p>
                            <p className="text-zinc-500">{session.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-zinc-400">{session.date}</p>
                          <p className="text-zinc-500">{session.time}</p>
                        </div>
                      </div>

                      {/* Session Details Grid */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <p className="text-zinc-500">Duration</p>
                          </div>
                          <p className="text-zinc-200">{session.duration} hours</p>
                        </div>

                        <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <p className="text-zinc-500">Speed</p>
                          </div>
                          <p className="text-zinc-200">{session.speed} kW</p>
                        </div>

                        <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Battery className="w-4 h-4 text-cyan-400" />
                            <p className="text-zinc-500">Energy</p>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <p className="text-zinc-200">{session.energyGained} kWh</p>
                            <p className="text-zinc-600">≈ +{calculateDistance(session.energyGained)} {distanceUnit}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="w-4 h-4 text-cyan-400" />
                            <p className="text-zinc-500">Cost</p>
                          </div>
                          <p className="text-zinc-200">
                            {session.pricingModel === 'free' ? 'Free' : `$${session.cost.toFixed(2)}`}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Model Badge */}
                      <div className="flex items-center gap-2 pt-1">
                        <Badge className="bg-zinc-800 text-zinc-400 border-zinc-700">
                          {session.pricingModel === 'per-kwh' && 'Pay Per kWh'}
                          {session.pricingModel === 'subscription' && 'Subscription'}
                          {session.pricingModel === 'free' && 'Free Charging'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-around max-w-4xl mx-auto">
          <button 
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'map' ? 'text-cyan-400' : 'text-zinc-500'
            }`}
          >
            <MapPin className="w-6 h-6" />
            <span>Map</span>
          </button>
          <button 
            onClick={() => setActiveTab('sessions')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'sessions' ? 'text-cyan-400' : 'text-zinc-500'
            }`}
          >
            <Zap className="w-6 h-6" />
            <span>Sessions</span>
          </button>
        </div>
      </div>

      {/* Location Details Dialog */}
      <Dialog open={!!selectedLocation} onOpenChange={(open) => !open && setSelectedLocation(null)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md" aria-describedby={undefined}>
          {selectedLocation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-cyan-400 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {selectedLocation.name}
                </DialogTitle>
                <p className="text-zinc-500 mt-1">{selectedLocation.address}</p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Status */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-zinc-400">Current Status</span>
                    <Badge className={`${getStatusColor(selectedLocation.status)} border`}>
                      {selectedLocation.status}
                    </Badge>
                  </div>
                  <Progress value={selectedLocation.timeline.progress} className="h-2" />
                  <div className="flex justify-between mt-2 text-zinc-600">
                    {selectedLocation.timeline.steps.map((step: string, idx: number) => (
                      <span 
                        key={step} 
                        className={`text-xs ${
                          idx <= selectedLocation.timeline.steps.indexOf(selectedLocation.timeline.current)
                            ? 'text-cyan-400'
                            : 'text-zinc-600'
                        }`}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Demand Info */}
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400">Community Demand</span>
                  </div>
                  <p className="text-zinc-300">
                    <span className="text-white">{selectedLocation.requests}</span> drivers have requested charging at this location
                  </p>
                </div>

                {/* Charger Types */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-cyan-400">Charger Types</h4>
                  </div>
                  {selectedLocation.chargerTypes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedLocation.chargerTypes.map((type: string) => (
                        <div key={type} className="flex items-center gap-2 p-2 bg-zinc-950 rounded border border-zinc-800">
                          <div className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span className="text-zinc-300">{type}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 italic">No chargers planned yet</p>
                  )}
                </div>

                {/* Pricing */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-cyan-400">Pricing Model</h4>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                    <p className="text-zinc-300">{selectedLocation.pricing}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-cyan-400">Expected Timeline</h4>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded border border-zinc-800">
                    <p className="text-zinc-300">
                      {selectedLocation.timeline.estimatedCompletion !== 'TBD' ? (
                        <>
                          Estimated completion: <span className="text-white">{selectedLocation.timeline.estimatedCompletion}</span>
                        </>
                      ) : (
                        <span className="text-zinc-500 italic">Timeline to be determined</span>
                      )}
                    </p>
                  </div>
                </div>

                {selectedLocation.status === 'Not Yet Considering' && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400">
                      💡 This location needs more community support to Go Electric! Keep logging demand to help make it happen.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Charging Session Form */}
      <Dialog open={showSessionForm} onOpenChange={setShowSessionForm}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Log Charging Session</DialogTitle>
          </DialogHeader>
          <ChargingSessionForm onSubmit={(sessionData) => {
            setActiveSession(sessionData);
            setShowSessionForm(false);
          }} />
        </DialogContent>
      </Dialog>

      {/* Menu Dialog */}
      <Dialog open={showMenu} onOpenChange={setShowMenu}>
        <DialogContent 
          className="bg-zinc-900 border-zinc-800 text-zinc-100 w-64 top-4 right-16 left-auto translate-x-0 translate-y-0" 
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Menu</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => {
                setShowMenu(false);
                onShowTutorial?.();
              }}
              className="w-full h-14 bg-zinc-800 hover:bg-cyan-500/10 border border-zinc-700 hover:border-cyan-500/50 text-zinc-100 hover:text-cyan-400 flex items-center gap-3 justify-start px-5 transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Tutorial</span>
            </Button>
            <Button
              onClick={() => {
                setShowMenu(false);
                setShowSettings(true);
              }}
              className="w-full h-14 bg-zinc-800 hover:bg-cyan-500/10 border border-zinc-700 hover:border-cyan-500/50 text-zinc-100 hover:text-cyan-400 flex items-center gap-3 justify-start px-5 transition-all"
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 max-w-md max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-cyan-400">Settings</DialogTitle>
          </DialogHeader>
          <Settings onClose={() => setShowSettings(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}