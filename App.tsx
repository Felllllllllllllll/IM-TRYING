import React, { useState, useEffect } from 'react';
import PlatformSelector from './components/PlatformSelector';
import FormatSelector from './components/FormatSelector';
import Preview from './components/Preview';
import ResultCard from './components/ResultCard';
import StructureCard from './components/StructureCard';
import { generateContent } from './services/geminiService';
import { Platform, GeneratedContent, LoadingState } from './types';
import { PLATFORMS } from './constants';

function App() {
  const [platform, setPlatform] = useState<Platform>('google');
  const [format, setFormat] = useState<string>('search');
  const [topic, setTopic] = useState<string>('');
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);

  // Update format when platform changes
  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    const platformConfig = PLATFORMS.find(p => p.id === newPlatform);
    if (platformConfig && platformConfig.formats.length > 0) {
      setFormat(platformConfig.formats[0]);
    }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setLoadingState(LoadingState.LOADING);
    try {
      const data = await generateContent(topic, platform, format);
      setContent(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setLoadingState(LoadingState.ERROR);
      alert('Kunde inte generera innehåll. Kontrollera din API-nyckel eller försök igen senare.');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-[#1c1c1e] selection:bg-purple-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col items-center gap-8">
           {/* Logo / Title Area */}
           <div className="text-center space-y-2 mb-4">
             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
               Resultatmaskinen 2026
             </h1>
             <p className="text-sm font-semibold text-gray-400 uppercase tracking-[0.2em]">AI Powered Social Engine</p>
           </div>

           <PlatformSelector 
             selectedPlatform={platform} 
             onSelect={handlePlatformChange} 
           />
           
           <FormatSelector 
             platform={platform} 
             selectedFormat={format} 
             onSelect={setFormat} 
           />
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Inputs & Structure */}
          <div className="xl:col-span-4 space-y-8">
            <section className="bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-[32px] p-10 transition-transform duration-500 hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-400 font-sans">1</span>
                <h3 className="font-extrabold text-sm uppercase tracking-widest text-gray-500">Ämne</h3>
              </div>
              <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-6 bg-gray-100/30 border border-gray-200/50 rounded-[24px] outline-none text-lg min-h-[160px] focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all resize-none placeholder:text-gray-300 font-medium" 
                placeholder="Vad vill du skapa idag?"
              />
              <button 
                onClick={handleGenerate}
                disabled={loadingState === LoadingState.LOADING || !topic.trim()}
                className="w-full mt-8 bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa] text-white font-bold py-5 text-lg rounded-[20px] shadow-[0_10px_25px_rgba(167,139,250,0.3)] transition-all active:scale-95 hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loadingState === LoadingState.LOADING ? 'Optimerar...' : 'Optimera för 2026'}
              </button>
            </section>

            <StructureCard 
              content={content} 
              loading={loadingState === LoadingState.LOADING} 
            />
          </div>

          {/* MIDDLE COLUMN: Preview */}
          <div className="xl:col-span-4 flex flex-col items-center">
             <div className="sticky top-10 flex flex-col items-center">
               <Preview 
                 content={content} 
                 loading={loadingState === LoadingState.LOADING} 
                 platform={platform} 
               />
             </div>
          </div>

          {/* RIGHT COLUMN: Results & Data */}
          <div className="xl:col-span-4 space-y-8">
             <ResultCard 
               content={content} 
               loading={loadingState === LoadingState.LOADING} 
             />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;