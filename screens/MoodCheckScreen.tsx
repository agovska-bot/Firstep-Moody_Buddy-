
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { MOOD_OPTIONS, MOOD_EMOJIS, MOOD_COLORS } from '../constants';
import { Mood, Screen } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import BuddyIcon from '../components/BuddyIcon';
import TTSButton from '../components/TTSButton';

declare const __API_KEY__: string;

const MoodCheckScreen: React.FC = () => {
  const { addMood, setCurrentScreen, age, language } = useAppContext();
  const { t } = useTranslation();
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [note, setNote] = useState('');
  const [buddyResponse, setBuddyResponse] = useState<string | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [streamedText, setStreamedText] = useState('');

  // GEMINI ИНТЕГРАЦИЈА: Ова е срцето на вештачката интелигенција
  const generateBuddySupport = async (moods: Mood[], userNote: string) => {
    const apiKey = typeof __API_KEY__ !== 'undefined' ? __API_KEY__ : "";
    setIsGeneratingResponse(true);
    setStreamedText('');
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // PROMPT ENGINEERING: Му кажуваме на АИ како да се однесува.
      const prompt = `You are Buddy, a supportive friend for a ${age}-year-old. 
                      User feels: ${moods.join(", ")}. Note: "${userNote}". 
                      Respond in ${language === 'mk' ? 'Macedonian' : 'English'}. Max 2 sentences.`;
      
      // STREAMING: Го влечеме одговорот дел по дел за подобар UX.
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      let fullText = "";
      for await (const chunk of responseStream) {
          const text = (chunk as GenerateContentResponse).text;
          if (text) {
              fullText += text;
              setStreamedText(fullText); // Веднаш го ажурираме екранот
          }
      }
      setBuddyResponse(fullText);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedMoods.length > 0) {
      addMood({ moods: selectedMoods, note: note, date: new Date().toISOString() });
      await generateBuddySupport(selectedMoods, note);
    }
  };

  return (
    <ScreenWrapper title={t('mood_check_screen.buddy_is_here', 'Buddy is here')} showBackButton={true}>
      <div className="flex flex-col flex-grow w-full">
        {buddyResponse ? (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn py-4 w-full">
            <div className="w-32 h-32 mb-4 drop-shadow-xl">
               <BuddyIcon />
            </div>
            <div className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-8 bg-white border border-teal-50 rounded-3xl shadow-sm text-lg text-teal-900 leading-relaxed italic text-center">
                    {streamedText}
                </div>
            </div>
            
            <div className="flex flex-col w-full gap-4 pt-4">
                <TTSButton textToSpeak={streamedText} />
                <button 
                    onClick={() => setCurrentScreen(Screen.Home)} 
                    className="w-full bg-teal-600 text-white font-black text-xl py-5 rounded-3xl shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all active:scale-95"
                >
                    {language === 'mk' ? 'Затвори' : 'Done'}
                </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-grow w-full">
            {/* Subtitle Section */}
            <div className="text-center mb-10">
                <h2 className="text-[28px] font-black text-[#004D40] mb-3 leading-tight">
                    {t('mood_check_screen.how_feeling', 'How are you feeling?')}
                </h2>
                <p className="text-[#7B8FA1] font-semibold text-lg">
                    {t('mood_check_screen.pick_more', '(You can pick more than one)')}
                </p>
            </div>

            {/* Grid of Moods */}
            <div className="grid grid-cols-2 gap-5 mb-10">
                {MOOD_OPTIONS.map(m => {
                    const isSelected = selectedMoods.includes(m);
                    return (
                        <button
                            key={m}
                            onClick={() => {
                                if (isSelected) {
                                    setSelectedMoods(prev => prev.filter(item => item !== m));
                                } else {
                                    setSelectedMoods(prev => [...prev, m]);
                                }
                            }}
                            className={`flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-4 transition-all duration-500 transform ${
                                isSelected 
                                ? `${MOOD_COLORS[m]} border-white/30 shadow-2xl -translate-y-2 scale-[1.05]` 
                                : 'bg-white border-[#F8FAFC] shadow-sm hover:border-teal-50'
                            }`}
                        >
                            <span className="text-6xl mb-4 drop-shadow-md">{MOOD_EMOJIS[m]}</span>
                            <span className={`text-[15px] font-black tracking-[0.15em] uppercase transition-colors ${
                                isSelected ? 'text-white' : 'text-[#7B8FA1]'
                            }`}>
                                {t(`moods.${m}`, m)}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Note Section */}
            <div className="mt-auto w-full">
                <label className="block text-[11px] font-black tracking-widest text-[#004D40] uppercase mb-5 text-left ml-2">
                    {t('mood_check_screen.what_made_you', 'WHAT MADE YOU FEEL THIS WAY?')}
                </label>
                <textarea
                    className="w-full p-8 bg-white border-[#F8FAFC] border-2 rounded-[2.5rem] text-teal-900 placeholder:opacity-30 focus:outline-none focus:border-teal-100 min-h-[160px] shadow-inner text-lg transition-all"
                    placeholder="..."
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
                
                <button 
                    onClick={handleSubmit} 
                    disabled={isGeneratingResponse || selectedMoods.length === 0} 
                    className="w-full bg-teal-600 text-white font-black text-xl py-6 rounded-[2rem] shadow-xl shadow-teal-900/10 hover:bg-teal-700 transition-all active:scale-95 disabled:opacity-50 mt-8 mb-4 border-b-4 border-teal-800"
                >
                    {isGeneratingResponse ? (language === 'mk' ? 'Бади размислува...' : 'Buddy is thinking...') : (t('mood_check_screen.save_button', 'Save Mood'))}
                </button>
            </div>
          </div>
        )}
      </div>
    </ScreenWrapper>
  );
};

export default MoodCheckScreen;
