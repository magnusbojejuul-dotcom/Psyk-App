import React from 'react';

const Input = ({ label, value, onChange }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-xs font-bold text-slate-600 uppercase ml-1 tracking-wide">{label}</label>}
            <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all shadow-sm placeholder:text-slate-400"
                placeholder={`Indtast ${label?.toLowerCase() || 'værdi'}...`}
            />
        </div>
    );
};

export default Input;
