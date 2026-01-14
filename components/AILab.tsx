
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from '@google/genai';
import { Play, Mic, MicOff, Video, Volume2, Loader2, Upload, AlertCircle, ExternalLink } from 'lucide-react';
import { decode, decodeAudioData, createBlob } from '../lib/audio';

const AILab: React.FC = () => {
  // Veo State
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [videoStatus, setVideoStatus] = useState<'idle' | 'loading' | 'polling' | 'done'>('idle');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  
  // Live API State
  const [isLiveActive, setIsLiveActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const liveSessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);

  // TTS State
  const [ttsText, setTtsText] = useState('');
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  // --- VEO FUNCTIONS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setVideoFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateVeoVideo = async () => {
    try {
      setVideoError(null);
      if (!(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
        return;
      }

      setVideoStatus('loading');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const payload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt || 'A cinematic motion of this image',
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '9:16' }
      };
      if (videoFile) {
        payload.image = {
          imageBytes: videoFile.split(',')[1],
          mimeType: videoFile.split(';')[0].split(':')[1]
        };
      }
      let operation = await ai.models.generateVideos(payload);
      setVideoStatus('polling');
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      setGeneratedVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
      setVideoStatus('done');
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setVideoError("API Key session expired. Please select key again.");
        (window as any).aistudio.openSelectKey();
      } else {
        setVideoError("Generation failed. Please ensure you have a billing-enabled project selected.");
      }
      setVideoStatus('idle');
    }
  };

  const startLiveSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);
      let nextStartTime = 0;
      const sources = new Set<AudioBufferSourceNode>();
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
            setIsLiveActive(true);
          },
          onmessage: async (message) => {
            if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64 = message.serverContent.modelTurn.parts[0].inlineData.data;
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
              sources.add(source);
              source.onended = () => sources.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sources.forEach(s => s.stop());
              sources.clear();
              nextStartTime = 0;
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev.slice(-4), `Gemini: ${message.serverContent?.outputTranscription?.text}`]);
            }
          },
          onclose: () => setIsLiveActive(false),
          onerror: (e) => { console.error(e); setIsLiveActive(false); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the Aurore Media AI Content Strategist. Help the user brainstorm viral content ideas and production workflows.'
        }
      });
      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      alert("Microphone access is required for voice chat.");
    }
  };

  const stopLiveSession = () => {
    if (liveSessionRef.current) liveSessionRef.current.close();
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
    }
    setIsLiveActive(false);
  };

  const generateTTS = async () => {
    if (!ttsText) return;
    setIsTtsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this content professionally: ${ttsText}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });
      const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const buffer = await decodeAudioData(decode(base64), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTtsLoading(false);
    }
  };

  return (
    <section id="lab" className="py-32 dark:bg-black bg-white px-6 md:px-12 border-t dark:border-white/5 border-black/5">
      <div className="container mx-auto">
        <div className="mb-24 text-center">
          <span className="text-[#E9A661] font-sans font-black text-[14px] tracking-[0.4em] uppercase mb-6 block">09. PRODUCTION LAB</span>
          <h2 className="font-sans font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none mb-6">NEXT GEN <br/>TOOLS<span className="text-[#E9A661]">.</span></h2>
          <p className="text-neutral-500 max-w-2xl mx-auto font-medium text-lg">Experimental production tools for creators who want to stay ahead of the curve.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-100 dark:bg-white/10 border dark:border-white/10 border-black/10">
          <div className="bg-white dark:bg-black p-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#E9A661]">Static to Motion</span>
              <Video size={20} className="opacity-30" />
            </div>
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">AI Video Gen</h3>
            <p className="text-sm md:text-base opacity-50 mb-8 flex-grow">Transform your product photos into high-engagement cinematic videos using Veo 3.1.</p>
            <div className="space-y-4">
              <div className="relative aspect-[9/16] bg-neutral-50 dark:bg-neutral-900 border border-dashed dark:border-white/10 border-black/10 flex flex-col items-center justify-center overflow-hidden">
                {generatedVideoUrl ? (
                  <video src={generatedVideoUrl} controls className="w-full h-full object-cover" />
                ) : videoFile ? (
                  <img src={videoFile} className="w-full h-full object-cover opacity-50" alt="Preview" />
                ) : (
                  <div className="text-center p-6">
                    <Upload size={24} className="mx-auto mb-2 opacity-20" />
                    <p className="text-[12px] font-black uppercase opacity-30">Upload Base Image</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <input type="text" value={videoPrompt} onChange={(e) => setVideoPrompt(e.target.value)} placeholder="Motion description..." className="w-full bg-transparent border-b dark:border-white/10 border-black/10 py-3 text-sm focus:outline-none focus:border-[#E9A661]" />
              {videoError && ( <div className="flex items-center gap-2 text-red-500 text-[12px] uppercase font-black"> <AlertCircle size={12} /> {videoError} </div> )}
              <button onClick={generateVeoVideo} disabled={videoStatus === 'loading' || videoStatus === 'polling'} className="w-full h-14 bg-black dark:bg-white dark:text-black text-white label-mini flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]" >
                {videoStatus === 'loading' || videoStatus === 'polling' ? ( <><Loader2 size={16} className="animate-spin" /> {videoStatus === 'polling' ? 'Processing Video...' : 'Initializing...'}</> ) : 'Generate Motion'}
              </button>
              <div className="flex justify-center"> <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] font-black uppercase tracking-widest opacity-30 flex items-center gap-1 hover:opacity-100 transition-opacity"> <ExternalLink size={8} /> Billing Requirements </a> </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black p-10 flex flex-col h-full border-l dark:border-white/10 border-black/10">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#E9A661]">Real-time Voice</span>
              <Mic size={20} className="opacity-30" />
            </div>
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Talk to Strategy</h3>
            <p className="text-sm md:text-base opacity-50 mb-8 flex-grow">Voice-chat with our Gemini 2.5 strategist to brainstorm content pillars and viral hooks.</p>
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-6 mb-6 flex-grow min-h-[200px] flex flex-col justify-end">
              <div className="space-y-3">
                {transcription.length === 0 && ( <p className="text-[12px] uppercase font-bold text-center opacity-20">No conversation active</p> )}
                {transcription.map((line, i) => ( <p key={i} className="text-[13px] font-medium leading-relaxed border-l border-[#E9A661] pl-3"> {line} </p> ))}
              </div>
            </div>
            <button onClick={isLiveActive ? stopLiveSession : startLiveSession} className={`w-full h-14 label-mini flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${ isLiveActive ? 'bg-red-500 text-white' : 'bg-[#E9A661] text-black hover:bg-black hover:text-white' }`} >
              {isLiveActive ? ( <><MicOff size={16} /> Stop Session</> ) : ( <><Mic size={16} /> Start Strategist Chat</> )}
            </button>
          </div>
          <div className="bg-white dark:bg-black p-10 flex flex-col h-full border-l dark:border-white/10 border-black/10">
            <div className="flex justify-between items-start mb-10">
              <span className="text-[12px] font-black uppercase tracking-widest text-[#E9A661]">Speech Synthesis</span>
              <Volume2 size={20} className="opacity-30" />
            </div>
            <h3 className="font-sans font-black text-2xl uppercase tracking-tighter mb-6">Dynamic VO</h3>
            <p className="text-sm md:text-base opacity-50 mb-8 flex-grow">Generate professional voiceovers for your scripts using low-latency TTS models.</p>
            <div className="space-y-6">
              <textarea value={ttsText} onChange={(e) => setTtsText(e.target.value)} placeholder="Paste your script here..." className="w-full h-40 bg-neutral-50 dark:bg-neutral-900 border dark:border-white/10 border-black/10 p-4 text-sm focus:outline-none focus:border-[#E9A661] resize-none" />
              <button onClick={generateTTS} disabled={isTtsLoading || !ttsText} className="w-full h-14 border dark:border-white/10 border-black/10 label-mini flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] hover:bg-[#E9A661] hover:text-black hover:border-[#E9A661] disabled:opacity-20" >
                {isTtsLoading ? <Loader2 size={16} className="animate-spin" /> : <><Play size={16} fill="currentColor" /> Generate & Play VO</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILab;
