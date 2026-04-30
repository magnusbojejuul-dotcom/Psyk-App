const formatList = (items) => {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    const last = items.pop();
    return items.join(', ') + ' og ' + last;
};
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const categoryOptions = [
    { id: 'c1', smartMerge: { prefix: 'Kernesymptomer: ', item: 'k1' } },
    { id: 'c2', smartMerge: { prefix: 'Kernesymptomer: ', item: 'k2' } },
    { id: 'a1', smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'a1' } },
];

function process(ids, details) {
    const lines = [];
    const prefixUsage = new Set();
    const plainItemsByPrefix = {};
    const detailedOptionsByPrefix = {};
    const orderedPrefixes = [];

    categoryOptions.forEach(opt => {
        if (!ids.has(opt.id)) return;
        const prefix = opt.smartMerge.prefix || '';
        if (!orderedPrefixes.includes(prefix)) orderedPrefixes.push(prefix);
        const detail = details[opt.id];
        if (!detail) {
            if (!plainItemsByPrefix[prefix]) plainItemsByPrefix[prefix] = [];
            plainItemsByPrefix[prefix].push(opt);
        } else {
            if (!detailedOptionsByPrefix[prefix]) detailedOptionsByPrefix[prefix] = [];
            detailedOptionsByPrefix[prefix].push({ opt, detail });
        }
    });

    orderedPrefixes.forEach(prefix => {
        const opts = plainItemsByPrefix[prefix];
        if (opts) {
            lines.push(capitalize(`${prefix}${formatList(opts.map(o => o.smartMerge.item))}.`));
            prefixUsage.add(prefix.trim());
        }
        const detailed = detailedOptionsByPrefix[prefix];
        if (detailed) {
            detailed.forEach(({ opt, detail }) => {
                const cleanPrefix = prefix.trim();
                const drop = cleanPrefix.length > 7 && prefixUsage.has(cleanPrefix);
                const p = drop ? "" : prefix;
                lines.push(capitalize(`${p}${opt.smartMerge.item} (${detail}).`));
                prefixUsage.add(cleanPrefix);
            });
        }
    });
    return lines.join(' ');
}

console.log("Test 1 (Mixed):", process(new Set(['c1', 'a1']), { 'c1': 'note' }));
console.log("Test 2 (All Plain):", process(new Set(['c1', 'a1']), {}));
console.log("Test 3 (All Detailed):", process(new Set(['c1', 'a1']), { 'c1': 'n1', 'a1': 'n2' }));
