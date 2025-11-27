import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Play, Square, Printer, Gift, TreePine, Cookie, Calendar } from 'lucide-react';
import { PricingCard, PricingBundle } from './components/Pricing';

// Types for form handling
interface StoryFormData {
  childName: string;
  age: string;
  tone: string;
  length: string;
  setting: string;
  focus: string;
  customFocus: string;
  supporting: string;
  isHolidayStory: boolean;
}

const App: React.FC = () => {
  // State
  const [formData, setFormData] = useState<StoryFormData>({
    childName: '',
    age: '',
    tone: 'silly and giggly',
    length: 'medium',
    setting: '',
    focus: '',
    customFocus: '',
    supporting: '',
    isHolidayStory: false,
  });

  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHolidayDecor, setShowHolidayDecor] = useState(false);

  // Holiday Expiration Logic
  useEffect(() => {
    const checkHoliday = () => {
      // Alaska Time is UTC-9 (Standard). 
      // Target: Dec 29, 2025 at 4pm Alaska Time.
      // 16:00 AKST = 01:00 UTC next day (Dec 30).
      // ISO string for Dec 30, 2025 at 01:00:00 UTC (which is Dec 29 16:00 AKST)
      const expirationDate = new Date('2025-12-30T01:00:00Z');
      const now = new Date();
      setShowHolidayDecor(now < expirationDate);
    };

    checkHoliday();
    // Re-check every minute just in case the user leaves the page open
    const interval = setInterval(checkHoliday, 60000); 
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHolidayToggle = () => {
    setFormData(prev => ({ ...prev, isHolidayStory: !prev.isHolidayStory }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulation of generation
    setTimeout(() => {
      let storyStart = `Once upon a time, in a world full of starlight, there was a child named ${formData.childName || 'Hero'}. `;
      
      if (formData.isHolidayStory) {
        storyStart += `It was a magical holiday season, and the air smelled like pine needles and warm cocoa. `;
      }
      
      if (formData.setting) {
        storyStart += `The adventure began in ${formData.setting}. `;
      } else {
        storyStart += `The adventure began in a place far beyond the stars. `;
      }

      setGeneratedStory(storyStart + "\n\n(This is a preview of the generated story based on your inputs. In a full implementation, this would connect to the AI model.)");
      setIsGenerating(false);
    }, 1500);
  };

  const handleQuickStory = () => {
    setFormData(prev => ({
      ...prev,
      childName: '',
      setting: '',
      focus: '',
      isHolidayStory: showHolidayDecor // Default to holiday if season is active, purely for UX
    }));
    handleGenerate();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen pb-16 text-[#f9fbff] font-sans selection:bg-[#ffd140] selection:text-black">
      
      {/* Holiday Decoration Layer - Expiring Dec 29 2025 */}
      {showHolidayDecor && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
          {/* Cluster of Trees Top Left */}
          <div className="absolute top-0 left-0 p-4 opacity-80 transform -translate-x-4 -translate-y-4">
            <div className="relative">
              <TreePine className="text-green-400 w-16 h-16 absolute top-0 left-2 filter drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
              <TreePine className="text-emerald-600 w-12 h-12 absolute top-8 left-10 filter drop-shadow-[0_0_10px_rgba(5,150,105,0.5)]" />
              <div className="absolute top-4 left-6 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
              <div className="absolute top-10 left-12 w-1 h-1 bg-red-400 rounded-full animate-pulse delay-75" />
            </div>
          </div>

          {/* Wreath Top Right */}
          <div className="absolute top-8 right-8 opacity-90 hidden md:block">
             <div className="relative w-20 h-20 border-4 border-green-700 rounded-full border-dashed flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(20,83,45,0.8)]">
                <div className="absolute -top-3 text-red-500 text-3xl">🎀</div>
                <div className="w-full h-full rounded-full border-4 border-green-500 opacity-50 absolute animate-pulse"></div>
             </div>
          </div>

          {/* Cookies and Milk - Near Pricing Section (Bottom Rightish) */}
          <div className="absolute bottom-40 right-4 md:right-20 opacity-90 transform rotate-12">
            <div className="flex items-end gap-2">
               <Cookie className="text-amber-600 w-10 h-10 filter drop-shadow-lg" />
               <div className="relative">
                 <div className="w-8 h-12 bg-white/20 border border-white/40 rounded-b-md backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute bottom-0 w-full h-2/3 bg-white"></div>
                 </div>
               </div>
               <Cookie className="text-amber-700 w-8 h-8 -ml-4 mb-2 filter drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        
        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-[#ffd140]/35 rounded-full px-3 py-1 mb-4 text-xs text-[#ffeb8a]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
            One free bedtime story per kid, per day – right from your browser.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1.3fr] gap-6 items-center">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                <span className="text-[#ffd140]">StoryTime</span> — Instant AI Bedtime Stories
              </h1>
              <p className="text-[#a5b4cf] text-sm md:text-base max-w-xl leading-relaxed">
                Fill in a few details about your kiddo and their world, or tap “Quick Story” when you’re exhausted. 
                You’ll get a cozy, custom bedtime story on demand – and parents who want more can unlock instant bundles or unlimited access below.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-56 h-48 filter drop-shadow-[0_18px_35px_rgba(0,0,0,0.75)]">
                 {/* Realistic 3D Book SVG */}
                 <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform hover:scale-105 transition-transform duration-500">
                    <defs>
                      <linearGradient id="coverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#78350f" />
                      </linearGradient>
                      <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                         <stop offset="0%" stopColor="#fef3c7" />
                         <stop offset="20%" stopColor="#fffbeb" />
                         <stop offset="50%" stopColor="#fef3c7" />
                         <stop offset="80%" stopColor="#fffbeb" />
                         <stop offset="100%" stopColor="#fde68a" />
                      </linearGradient>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.5"/>
                      </filter>
                    </defs>

                    {/* Back Cover (Bottom) */}
                    <path d="M20 140 C 20 140, 80 155, 120 155 C 160 155, 220 140, 220 140 L 220 150 C 220 150, 160 165, 120 165 C 80 165, 20 150, 20 150 Z" fill="#522500" />

                    {/* Left Pages */}
                    <path d="M25 135 C 25 135, 80 148, 120 148 L 120 40 C 80 40, 25 55, 25 55 Z" fill="url(#pageGradient)" stroke="#d4d4d8" strokeWidth="0.5" />
                    <path d="M28 132 C 28 132, 80 145, 120 145 L 120 43 C 80 43, 28 58, 28 58 Z" fill="url(#pageGradient)" opacity="0.9" />
                    
                    {/* Right Pages */}
                    <path d="M215 135 C 215 135, 160 148, 120 148 L 120 40 C 160 40, 215 55, 215 55 Z" fill="url(#pageGradient)" stroke="#d4d4d8" strokeWidth="0.5" />
                    <path d="M212 132 C 212 132, 160 145, 120 145 L 120 43 C 160 43, 212 58, 212 58 Z" fill="url(#pageGradient)" opacity="0.9" />

                    {/* Spine / Center Shadow */}
                    <path d="M115 40 L 125 40 L 125 150 L 115 150 Z" fill="rgba(0,0,0,0.1)" />

                    {/* Cover Edges */}
                    <path d="M20 140 L 25 135 L 25 55 L 20 60 Z" fill="#92400e" />
                    <path d="M220 140 L 215 135 L 215 55 L 220 60 Z" fill="#92400e" />

                    {/* Bookmark */}
                    <path d="M140 40 L 140 100 L 150 90 L 160 100 L 160 45" fill="#ef4444" filter="url(#shadow)" />

                    {/* Text/Content Lines */}
                    <g opacity="0.4" stroke="#71717a" strokeWidth="1">
                       <line x1="40" y1="70" x2="100" y2="70" />
                       <line x1="40" y1="80" x2="100" y2="80" />
                       <line x1="40" y1="90" x2="90" y2="90" />
                       <line x1="140" y1="70" x2="200" y2="70" />
                       <line x1="140" y1="80" x2="200" y2="80" />
                       <line x1="140" y1="90" x2="190" y2="90" />
                    </g>

                    {/* Magic Sparkles around book */}
                    <circle cx="20" cy="40" r="2" fill="#ffd140" className="animate-pulse" />
                    <circle cx="220" cy="30" r="3" fill="#ffd140" className="animate-pulse delay-75" />
                    <circle cx="120" cy="20" r="2" fill="#fff" className="animate-pulse delay-150" />
                 </svg>
              </div>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-6">
          
          {/* Builder Section */}
          <section className="bg-[rgba(10,18,40,0.96)] border border-white/5 rounded-[20px] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-xl font-bold mb-2">Customize Tonight’s Story</h2>
                  <p className="text-[#a5b4cf] text-sm">
                    These details help shape the story. You get <strong>one free generated story per day</strong>.
                  </p>
               </div>
               {showHolidayDecor && (
                 <div className="bg-red-900/30 border border-red-500/30 rounded-full px-3 py-1 flex items-center gap-2">
                    <Gift size={14} className="text-red-400" />
                    <span className="text-xs text-red-200 uppercase tracking-widest font-bold">Holiday Spirit</span>
                 </div>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Child's Name</label>
                <input 
                  type="text" 
                  name="childName"
                  value={formData.childName}
                  onChange={handleInputChange}
                  placeholder="Felicitee, Jay, Mateo..." 
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all placeholder-white/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Age (Optional)</label>
                <input 
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange} 
                  placeholder="7" 
                  min={1} 
                  max={14}
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all placeholder-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Tone</label>
                <select 
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all text-[#f9fbff]"
                >
                  <option value="silly and giggly">Silly / giggly</option>
                  <option value="soft and sleepy">Soft & sleepy</option>
                  <option value="brave and adventurous">Brave / adventurous</option>
                  <option value="gentle and encouraging">Gentle & encouraging</option>
                  <option value="magical and dreamy">Magical / dreamy</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Story Length</label>
                <select 
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all text-[#f9fbff]"
                >
                  <option value="short">Short (3–5 minutes)</option>
                  <option value="medium">Medium (7–10 minutes)</option>
                  <option value="long">Long (10–15 minutes)</option>
                </select>
              </div>

              {/* Holiday Toggle - Only visible during holiday season */}
              {showHolidayDecor && (
                <div className="md:col-span-2 bg-gradient-to-r from-red-900/20 to-green-900/20 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2 rounded-full">
                         <TreePine className="text-green-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[#ffeb8a]">Holiday Story Mode</h3>
                        <p className="text-xs text-[#a5b4cf]">Add festive magic, decorations, and holiday themes.</p>
                      </div>
                   </div>
                   <button 
                     onClick={handleHolidayToggle}
                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd140] focus:ring-offset-2 focus:ring-offset-[#050816] ${formData.isHolidayStory ? 'bg-green-600' : 'bg-gray-700'}`}
                   >
                      <span className={`${formData.isHolidayStory ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                   </button>
                </div>
              )}

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Custom Setting</label>
                <select 
                  name="setting"
                  value={formData.setting}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all text-[#f9fbff]"
                >
                  <option value="">Surprise me</option>
                  <option value="a cozy cabin in the snowy Alaska woods">Cozy cabin in snowy Alaska</option>
                  <option value="a pirate ship sailing through the northern lights">Pirate ship under the northern lights</option>
                  <option value="a floating sky island full of friendly dragons">Floating dragon island</option>
                  <option value="a secret magic garden behind your house">Magic garden</option>
                  <option value="a crystal city under the ocean">Crystal city under the ocean</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Tonight's Focus</label>
                <select 
                  name="focus"
                  value={formData.focus}
                  onChange={handleInputChange}
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all text-[#f9fbff]"
                >
                   <option value="">Just for fun</option>
                   <option value="feeling safe at night">Feeling safe at night</option>
                   <option value="being brave at school tomorrow">Brave for school tomorrow</option>
                   <option value="trying new foods">Trying new foods</option>
                   <option value="being kind to siblings and friends">Being kind to siblings</option>
                   <option value="having big feelings but calming down gently">Calming big feelings</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Supporting Character</label>
                <input 
                  type="text"
                  name="supporting"
                  value={formData.supporting}
                  onChange={handleInputChange}
                  placeholder="Little sister, pet dog..." 
                  className="w-full rounded-full border border-white/5 px-4 py-2.5 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 focus:ring-1 focus:ring-[#ffd140]/40 outline-none transition-all placeholder-white/20"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6 items-center">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-gradient-to-br from-[#ffd140] to-[#ffb400] text-[#1b1300] font-bold rounded-full px-6 py-2.5 shadow-[0_12px_25px_rgba(0,0,0,0.6)] hover:-translate-y-px hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] active:translate-y-0 active:shadow-none transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Sparkles size={18} />
                {isGenerating ? 'Dreaming...' : 'Generate Story'}
              </button>
              
              <button 
                onClick={handleQuickStory}
                className="bg-white/5 text-[#ffeb8a] border border-white/10 font-semibold rounded-full px-5 py-2.5 hover:bg-white/10 hover:-translate-y-px transition-all"
              >
                Quick Story (No Setup)
              </button>
            </div>
          </section>

          {/* Output Section */}
          <section className="bg-[rgba(10,18,40,0.96)] border border-white/5 rounded-[20px] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
             <h2 className="text-xl font-bold mb-2">Tonight’s Story</h2>
             <p className="text-[#a5b4cf] text-sm mb-4">
                Your story appears below. You can listen with Read Aloud, read along, or print/save it.
             </p>

             <div className="min-h-[200px] bg-[radial-gradient(circle_at_0_0,rgba(255,209,64,0.12),rgba(8,12,32,0.96))] border border-white/5 rounded-[18px] p-6 text-[0.96rem] leading-relaxed whitespace-pre-wrap text-[#f9fbff]">
                {generatedStory ? (
                  generatedStory
                ) : (
                  <span className="text-[#a5b4cf]">
                    Your bedtime story will appear here. Start by filling in a few details above, or tap <strong>Quick Story</strong> for an instant tale.
                  </span>
                )}
             </div>

             <div className="flex flex-wrap justify-between items-center gap-2 mt-4 text-xs text-[#a5b4cf]">
               <div className="flex gap-2">
                 <span className="bg-[#060a1a]/90 border border-white/15 px-3 py-1 rounded-full">Length: {formData.length}</span>
                 <span className="bg-[#060a1a]/90 border border-white/15 px-3 py-1 rounded-full">Tone: {formData.tone}</span>
                 {formData.isHolidayStory && (
                   <span className="bg-red-900/40 border border-red-500/30 px-3 py-1 rounded-full text-red-200">Holiday</span>
                 )}
               </div>
               <div>Free stories left: <strong className="text-[#ffd140]">1</strong></div>
             </div>

             <div className="mt-4 max-w-xs space-y-1">
                <label className="text-xs uppercase tracking-widest text-[#a5b4cf] ml-1">Narrator Voice</label>
                <select className="w-full rounded-full border border-white/5 px-4 py-2 bg-[#090d1c]/90 text-sm focus:border-[#ffd140]/60 outline-none transition-all text-[#f9fbff]">
                   <option value="">System Default</option>
                </select>
             </div>

             <div className="flex flex-wrap gap-2 mt-6">
               <button className="border border-white/15 text-[#f9fbff] px-4 py-2 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 text-sm">
                 <Play size={14} /> Read Aloud
               </button>
               <button className="border border-white/15 text-[#f9fbff] px-4 py-2 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 text-sm">
                 <Square size={14} /> Stop
               </button>
               <button 
                onClick={handlePrint}
                className="border border-white/15 text-[#f9fbff] px-4 py-2 rounded-full hover:bg-white/5 transition-all flex items-center gap-2 text-sm"
              >
                 <Printer size={14} /> Print / Save PDF
               </button>
             </div>
          </section>

          {/* Library Section */}
          <section className="bg-[rgba(10,18,40,0.96)] border border-white/5 rounded-[20px] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
             <h2 className="text-xl font-bold mb-2">Free Story Library</h2>
             <p className="text-[#a5b4cf] text-sm mb-4">
               Ran out of free AI stories for today? Tap one of these pre-written favorites.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div 
                onClick={() => setGeneratedStory("Once upon a time, The Starry Bear woke up from his long nap...")}
                className="border border-white/5 bg-[#090d1e]/96 p-3 rounded-xl cursor-pointer hover:border-[#ffd140]/50 hover:bg-[#0f1630]/98 hover:-translate-y-px transition-all"
               >
                 <div className="text-[#ffeb8a] font-semibold text-sm mb-1">The Bear Who Ate The Moon</div>
                 <div className="text-xs text-[#a5b4cf]">Gentle • 5 mins</div>
               </div>
               <div 
                onClick={() => setGeneratedStory("Far away, in the Cloud Kingdom, a little dragon named Spark could not breathe fire...")}
                className="border border-white/5 bg-[#090d1e]/96 p-3 rounded-xl cursor-pointer hover:border-[#ffd140]/50 hover:bg-[#0f1630]/98 hover:-translate-y-px transition-all"
               >
                 <div className="text-[#ffeb8a] font-semibold text-sm mb-1">Spark the Cloud Dragon</div>
                 <div className="text-xs text-[#a5b4cf]">Brave • 8 mins</div>
               </div>
             </div>
          </section>

          {/* Pricing Section - Preserving Original PayPal Structure logic via Components */}
          <section className="bg-[rgba(10,18,40,0.96)] border border-white/5 rounded-[20px] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.6)] backdrop-blur-xl">
             <h2 className="text-xl font-bold mb-2">Support StoryTime & Unlock More Magic</h2>
             <p className="text-[#a5b4cf] text-sm mb-6">
                Keep using one free story per day forever. When you’re ready for more, grab a single story, a bundle pack, or go unlimited. All payments processed securely by PayPal.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PricingCard 
                  title="Short Story — $0.99" 
                  desc="Perfect for quick tuck-ins and nap times." 
                  paypalId="2AMCMQHMGC2Z8" 
                />
                <PricingCard 
                  title="Medium Story — $1.49" 
                  desc="Average bedtime, full adventure." 
                  paypalId="W56CVDP29HNPY" 
                />
                <PricingCard 
                  title="Long Story — $1.99" 
                  desc="Extra-long nights, road trips, or 'one more story, please.'" 
                  paypalId="Z3KH75KY7EGSC" 
                />
                <PricingCard 
                  title="Bundle of 5 — $3.99" 
                  desc="Great for busy weeks and sleepovers." 
                  paypalId="8RDSNCE864ZA6" 
                />
                <PricingCard 
                  title="Bundle of 10 — $7.99" 
                  desc="Stock up for road trips and long winters." 
                  paypalId="RJBRQZ5VDFNGA" 
                />
                {/* Subscription buttons behave slightly differently in PayPal (often hosted buttons) but we can wrap them similarly or use specific IDs if provided. The prompt had specific divs for these. */}
                <PricingBundle
                   title="Unlimited StoryTime — $19.99/mo"
                   desc="Unlimited stories for one household."
                   containerId="paypal-button-container-P-7AG37489BB000994CNERGJGQ"
                />
                <PricingBundle
                   title="Unlimited Family — $29.99/mo"
                   desc="For big families, co-parents, or shared households."
                   containerId="paypal-button-container-P-5WR418139G939580ENERGPZY"
                />
             </div>
             
             <p className="text-xs text-[#a5b4cf] mt-4 opacity-70">
                Note: StoryTime is currently in early-access preview. All stories are generated on-device using templates and your inputs.
             </p>
          </section>

        </main>

        <footer className="mt-8 text-center text-xs text-[#a5b4cf] py-4">
           &copy; 2025 Cyphernex Systems. All rights reserved. For personal use only.
        </footer>

      </div>
    </div>
  );
};

export default App;