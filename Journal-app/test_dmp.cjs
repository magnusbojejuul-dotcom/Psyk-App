const DiffMatchPatch = require('diff-match-patch');
const dmp = new DiffMatchPatch();

const text1 = "Ad perception:\nIngen.\n";
const text2 = "Ad perception:\nIngen.\nAd sovn:\nSovn normal.\n";

const a = dmp.diff_linesToChars_(text1, text2);
const lineText1 = a.chars1;
const lineText2 = a.chars2;
const lineArray = a.lineArray;

const diffs = dmp.diff_main(lineText1, lineText2, false);
dmp.diff_charsToLines_(diffs, lineArray);

let appendText = '';
diffs.forEach(([op, text]) => {
    console.log(`op: ${op}, text: ${text}`);
    if (op === 1) appendText += text;
});

console.log('Appended:\n' + appendText);
