import React, { useState } from 'react';
import { ChevronLeft, FileText, ChevronRight, CheckCircle, Info, ExternalLink } from '../components/Icons';
import { targetGroupsData } from '../data/targetGroupsData';

function TargetGroupsApp({ onNavigate }) {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
        setSelectedOption(null);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        if (selectedGroup) {
            setSelectedGroup(null);
            setSelectedOption(null);
        } else {
            onNavigate('home');
        }
    };

    const renderGroupSelection = () => (
        <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 pt-6 sm:pt-10">
            <button
                onClick={handleBack}
                className="group flex items-center gap-2 text-[#839788] font-semibold text-sm hover:text-[#3A4A40] transition-colors mb-6"
            >
                <div className="bg-white p-1.5 rounded-lg shadow-sm border border-[#E2E8DF] group-hover:bg-[#F2F6F3] transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </div>
                Tilbage til forsiden
            </button>

            <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8DF] overflow-hidden mb-8">
                <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-[#F9F8F6]">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#839788] flex items-center justify-center shadow-sm">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#3A4A40]">Målgruppebeskrivelser og Visitation</h1>
                            <p className="text-[#839788] mt-1">Vælg en diagnose for at se den fulde oversigts-tabel for visiteringsvejledning.</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {targetGroupsData.map(group => (
                            <button
                                key={group.id}
                                onClick={() => handleSelectGroup(group)}
                                className="group relative flex flex-col items-start p-5 rounded-2xl bg-[#F9F8F6] border border-[#E2E8DF] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-[#839788] transition-all duration-300 ease-out cursor-pointer text-left"
                            >
                                <h2 className="text-lg font-bold text-[#3A4A40] mb-2 leading-tight group-hover:text-[#2C3F34] transition-colors pr-6">
                                    {group.name}
                                </h2>
                                
                                <div className="mt-auto pt-4 w-full flex items-center justify-between text-[#839788] text-xs font-bold uppercase tracking-wide group-hover:text-[#3A4A40] transition-colors">
                                    Åbn oversigt <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGroupDetail = () => {
        if (!selectedGroup) return null;

        return (
            <div className="w-full max-w-[1200px] mx-auto p-4 sm:p-6 md:p-8 pt-6 sm:pt-10">
                <button
                    onClick={handleBack}
                    className="group flex items-center gap-2 text-[#839788] font-semibold text-sm hover:text-[#3A4A40] transition-colors mb-6"
                >
                    <div className="bg-white p-1.5 rounded-lg shadow-sm border border-[#E2E8DF] group-hover:bg-[#F2F6F3] transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    Tilbage til oversigten
                </button>

                <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8DF] overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-[#F9F8F6] flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-3">{selectedGroup.name}</h1>
                            <p className="text-[#506658] text-sm leading-relaxed whitespace-pre-wrap max-w-3xl">
                                {selectedGroup.intro}
                            </p>
                        </div>
                        <div className="shrink-0">
                            <a 
                                href={`/målgruppebeskrivelser/${selectedGroup.originalFile}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8DF] text-[#3A4A40] text-sm font-bold rounded-xl hover:bg-[#F2F6F3] hover:border-[#839788] transition-all shadow-sm"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Læs det originale PDF-dokument
                            </a>
                        </div>
                    </div>

                    {/* Content Table */}
                    <div className="p-0 sm:p-6 md:p-8">
                        {selectedGroup.options && selectedGroup.options.length > 0 ? (
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr>
                                            <th className="p-4 border-b-2 border-[#E2E8DF] bg-white text-[#839788] font-bold text-xs uppercase tracking-wider w-16 text-center">Vælg</th>
                                            <th className="p-4 border-b-2 border-[#E2E8DF] bg-white text-[#839788] font-bold text-xs uppercase tracking-wider w-24">CGI</th>
                                            <th className="p-4 border-b-2 border-[#E2E8DF] bg-white text-[#839788] font-bold text-xs uppercase tracking-wider w-[45%]">Symptombillede / Beskrivelse</th>
                                            <th className="p-4 border-b-2 border-[#E2E8DF] bg-white text-[#839788] font-bold text-xs uppercase tracking-wider">Anbefalet handling</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedGroup.options.map((option, idx) => {
                                            const isSelected = selectedOption === option;
                                            return (
                                                <tr 
                                                    key={idx} 
                                                    onClick={() => setSelectedOption(option)}
                                                    className={`cursor-pointer transition-colors border-b border-[#E2E8DF]/60 last:border-0 group ${isSelected ? 'bg-emerald-50/70' : 'hover:bg-[#F9F8F6]'}`}
                                                >
                                                    <td className="p-4 align-top text-center">
                                                        <div className={`w-6 h-6 mx-auto rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-600 border-emerald-600' : 'bg-white border-[#C2CEC6] group-hover:border-[#839788]'}`}>
                                                            {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <span className={`inline-flex px-2 py-1 rounded-md text-sm font-bold ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-[#F2F6F3] text-[#506658]'}`}>
                                                            {option.label}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <ul className="space-y-2">
                                                            {option.symptoms.map((symptom, i) => (
                                                                <li key={i} className="flex gap-2 text-sm text-[#3A4A40] leading-relaxed">
                                                                    <span className="text-[#839788] mt-1 shrink-0">•</span>
                                                                    <span>{symptom}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <div className={`p-4 rounded-xl border text-sm font-medium leading-relaxed ${isSelected ? 'bg-white border-emerald-200 text-emerald-900 shadow-sm' : 'bg-transparent border-transparent text-[#506658]'}`}>
                                                            {option.action}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 m-6">
                                <h3 className="text-amber-800 font-bold mb-2">Ingen specifikke CGI-niveauer fundet</h3>
                                <p className="text-amber-700 text-sm">
                                    Dette dokument er ikke struktureret med de typiske sværhedsgrader (CGI). Vi anbefaler, at du åbner den originale fil via knappen øverst for at læse den fulde beskrivelse og visiteringsvejledning.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#3A4A40] font-sans selection:bg-[#E2E8DF] selection:text-slate-900">
            {selectedGroup ? renderGroupDetail() : renderGroupSelection()}
        </div>
    );
}

export default TargetGroupsApp;
