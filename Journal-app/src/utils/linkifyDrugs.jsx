import React from 'react';
import { PSYKOFARMAKA_DATA } from '../data/psykofarmaka';

// Build a mapping of possible drug names/aliases to their IDs.
// For instance: "Diazepam (Stesolid)" -> matches "Diazepam" and "Stesolid"
const DRUG_MAP = {};
PSYKOFARMAKA_DATA.forEach(drug => {
    // Extract main name and any potential aliases in parentheses
    const parts = drug.name.split(/[/(/)]/).map(p => p.trim()).filter(Boolean);
    parts.forEach(part => {
        if (part.length > 3) { // Avoid mapping very short words
            DRUG_MAP[part.toLowerCase()] = drug.id;
        }
    });
});

// Create an array of sorted keys by length descending, to match longer names first
const DRUG_NAMES = Object.keys(DRUG_MAP).sort((a, b) => b.length - a.length);

/**
 * Parses a string of text and wraps recognized medication names in a clickable span.
 * 
 * @param {string} text - The input text to parse.
 * @param {function} onNavigate - The navigation function to call when a link is clicked.
 * @returns {React.ReactNode} - The text with medication names wrapped as clickable links.
 */
export function renderWithDrugLinks(text, onNavigate) {
    if (!text || typeof text !== 'string') return text;

    // Use a regex to match any of the known drug names, as whole words.
    // Case-insensitive match.
    // We escape the drug names to be safe in the regex.
    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matchRegex = new RegExp(`\\b(${DRUG_NAMES.map(escapeRegExp).join('|')})\\b`, 'gi');

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = matchRegex.exec(text)) !== null) {
        // Push preceding text
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const matchedWord = match[0];
        const drugId = DRUG_MAP[matchedWord.toLowerCase()];

        // Push the interactive link
        parts.push(
            <span
                key={`${match.index}-${drugId}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('psykofarmaka', drugId);
                }}
                className="font-bold cursor-pointer text-[#839788] hover:text-[#3A4A40] underline decoration-[#839788]/30 decoration-2 underline-offset-2 hover:decoration-[#839788] transition-all duration-200"
                title="Klik for at se præparatopsig i Psykofarmaka-modulet"
            >
                {matchedWord}
            </span>
        );

        lastIndex = matchRegex.lastIndex;
    }

    // Push remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    // If no matches, just return the string
    if (parts.length === 0) return text;

    return <>{parts}</>;
}
