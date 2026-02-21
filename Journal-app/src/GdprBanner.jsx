import React, { useState } from 'react';

const GdprBanner = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative ml-6 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge i headeren */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full cursor-help transition-colors hover:bg-amber-100">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">⚠️ GDPR Advarsel</span>
      </div>

      {/* Popup boks */}
      {isHovered && (
        <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 text-left animate-in fade-in zoom-in-95 duration-200">
          <h4 className="text-sm font-bold text-slate-800 mb-2">Dataanonymisering</h4>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Dette er en udviklingsversion. Indtast <strong>aldrig</strong> rigtige personfølsomme data.
          </p>
          
          <div className="space-y-2">
            <div className="p-2 bg-red-50 rounded border border-red-100">
              <p className="text-[10px] font-bold text-red-800 uppercase mb-0.5">Direkte henførbar data</p>
              <p className="text-xs text-red-900">CPR-nr, Navn, Adresse, Telefon, Email.</p>
            </div>
            
            <div className="p-2 bg-amber-50 rounded border border-amber-100">
              <p className="text-[10px] font-bold text-amber-800 uppercase mb-0.5">Indirekte henførbar data</p>
              <p className="text-xs text-amber-900">
                Data der kombineret kan identificere en person. <br/>
                <em>F.eks: "Sjælden diagnose + lille by", "Specifik stilling + arbejdsplads" eller "Præcise datoer for hændelser".</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GdprBanner;