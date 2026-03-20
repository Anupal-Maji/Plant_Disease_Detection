
import React, { useState, useRef, useEffect } from 'react';
import { classifyCropImage } from '../services/geminiService';
import { DetectionResult } from '../types';

interface ImageScannerProps {
  onScanComplete: (result: DetectionResult, imageUrl: string) => void;
}

const ImageScanner: React.FC<ImageScannerProps> = ({ onScanComplete }) => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Camera handling
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (mode === 'camera' && !selectedImage) {
      navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false 
      }).then(s => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      }).catch(err => {
        console.error(err);
        setError("Camera access denied. Please use Upload mode.");
        setMode('upload');
      });
    }
    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, [mode, selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setSelectedImage(dataUrl);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;
    setIsScanning(true);
    setError(null);
    try {
      const base64Data = selectedImage.split(',')[1];
      const result = await classifyCropImage(base64Data);
      onScanComplete(result, selectedImage);
    } catch (err) {
      console.error(err);
      setError("AI analysis failed. Please ensure the leaf is clearly visible.");
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-5 md:p-10 transition-all">
      {/* Mode Switcher */}
      {!selectedImage && (
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 max-w-xs mx-auto">
          <button 
            onClick={() => setMode('upload')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'upload' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Upload
          </button>
          <button 
            onClick={() => setMode('camera')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'camera' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Live Camera
          </button>
        </div>
      )}

      {!selectedImage ? (
        <div className="relative">
          {mode === 'upload' ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative border-2 border-dashed border-slate-200 rounded-[20px] md:rounded-[24px] p-10 md:p-16 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all animate-pulse-border"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-100/50 rounded-full flex items-center justify-center text-emerald-600 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 md:mb-2 text-center">Upload leaf photo</h3>
              <p className="text-slate-400 text-xs font-medium text-center">Capture clear top-down view</p>
              <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="relative rounded-[20px] md:rounded-[24px] overflow-hidden bg-black aspect-square md:aspect-video group">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Viewfinder Overlay */}
              <div className="absolute inset-0 border-[24px] border-black/10 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl opacity-60"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl opacity-60"></div>
                {/* Scanning line animation */}
                <div className="absolute left-0 right-0 h-0.5 bg-emerald-400/50 blur-sm animate-[scan_3s_infinite] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              </div>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button 
                  onClick={captureSnapshot}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center group active:scale-90 transition-all shadow-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-white group-hover:scale-95 transition-transform"></div>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-[22px] md:rounded-[26px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative overflow-hidden rounded-[20px] md:rounded-[24px] shadow-xl bg-slate-100 aspect-square md:aspect-video flex items-center justify-center">
              <img src={selectedImage} alt="Leaf scan" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4">
                  <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="font-bold text-base md:text-lg tracking-tight">AI Analysis...</p>
                </div>
              )}
            </div>
            
            {!isScanning && (
              <button 
                onClick={resetScanner}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-full shadow-xl transition-all active:scale-90"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={handleScan}
              disabled={isScanning}
              className={`
                group w-full md:w-auto px-10 py-4 md:py-5 rounded-xl md:rounded-[20px] font-extrabold text-white text-sm md:text-base shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95
                ${isScanning ? 'bg-slate-300 shadow-none' : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:shadow-emerald-200'}
              `}
            >
              {isScanning ? 'Analyzing Plant Tissue...' : 'Initiate AI Diagnosis'}
              {!isScanning && <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
            </button>
            {error && <p className="text-red-500 text-xs font-bold animate-bounce text-center">{error}</p>}
          </div>
        </div>
      )}
      
      <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: "Deep AI", desc: "Gemini Vision 2.0", icon: "🧠" },
          { title: "Field Ready", desc: "Live Diagnostics", icon: "🚜" },
          { title: "Actions", desc: "Organic Solutions", icon: "🩹" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white transition-all">
            <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <div>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{item.title}</p>
              <p className="text-[11px] font-bold text-slate-800">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
};

export default ImageScanner;
