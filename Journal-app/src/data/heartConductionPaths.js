// Exact conduction pathway coordinates in the 960x949 anatomical heart coordinate space.
export const HEART_IMG_W = 960;
export const HEART_IMG_H = 949;
export const HEART_CENTER = { x: 470, y: 515 };

export const PHASE_COLORS = {
    p: '#2f66d0',
    pr: '#c9942a',
    qrs: '#dd6b20',
    st: '#c87c65',
    t: '#248f77',
    rest: '#6c8577'
};

export const CONDUCTION_PATHS = {
    saNode: {
        cx: 157,
        cy: 314,
        outline: 'M 108 328 C 106 300 132 280 170 280 C 198 280 218 294 218 310 C 218 328 190 342 152 348 C 124 352 108 344 108 328 Z'
    },
    saBridge: 'M 196 292 C 218 298 228 308 214 316',
    bachmannMain: 'M 198 292 C 280 278 400 235 480 202 C 530 182 566 178 594 205',
    bachmannBranchA: 'M 588 198 C 598 228 595 258 585 288',
    bachmannBranchB: 'M 594 205 C 632 225 660 245 680 274',
    bachmannBranchC: 'M 594 205 C 618 220 645 236 664 256',

    internodalAnt: 'M 202 315 C 282 312 342 325 358 378 C 365 415 362 455 358 488',
    internodalMid: 'M 118 340 C 106 392 128 424 181 460 C 228 492 264 514 282 544',
    internodalPost: 'M 110 344 C 98 442 104 532 152 566 C 194 592 252 586 286 560',

    avNode: {
        cx: 318,
        cy: 532,
        outline: 'M 278 560 C 276 544 294 522 322 504 C 344 490 364 490 366 502 C 368 514 344 538 318 556 C 298 570 280 568 278 560 Z'
    },

    hisBundle: 'M 352 500 C 392 484 446 483 496 504',
    rbbSeptal: 'M 496 504 C 522 544 568 595 628 650 C 682 700 732 748 756 798 C 768 828 756 854 724 857',
    rvPurkinje: 'M 724 857 C 642 856 545 840 442 814 C 352 790 276 756 216 716',

    lbbSeptal: 'M 496 504 C 538 522 578 558 615 598 C 660 644 715 696 772 742 C 824 784 868 812 882 878',
    lbbSeptalFascicleA: 'M 642 620 C 672 602 705 578 742 544',
    lbbSeptalFascicleB: 'M 686 592 C 708 594 728 596 746 598',
    lvPurkinje: 'M 881 880 C 902 830 912 762 908 690 C 903 616 882 544 848 486 C 818 436 786 398 769 356'
};

export const CHAMBER_GLOWS = {
    ra: { cx: 222, cy: 432, rx: 145, ry: 155 },
    la: { cx: 560, cy: 230, rx: 165, ry: 120 },
    septum: { cx: 615, cy: 645, rx: 85, ry: 115, rotate: -40 },
    rv: { cx: 430, cy: 730, rx: 235, ry: 125, rotate: 14 },
    lv: { cx: 815, cy: 625, rx: 125, ry: 215, rotate: -14 }
};

export const HEART_LABELS = [
    { id: 'SA', text: 'SA', x: 148, y: 256, kind: 'node' },
    { id: 'AV', text: 'AV', x: 312, y: 472, kind: 'node' },
    { id: 'HA', text: 'HA', x: 228, y: 410, kind: 'chamber' },
    { id: 'VA', text: 'VA', x: 545, y: 310, kind: 'chamber' },
    { id: 'HV', text: 'HV', x: 432, y: 696, kind: 'chamber' },
    { id: 'VV', text: 'VV', x: 800, y: 585, kind: 'chamber' }
];

// Epicardial -> endocardial ventricular wall pairs for T-wave repolarization sweep.
export const REPOLARIZATION_WALLS = {
    lv: [
        [[838, 365], [768, 385]],
        [[896, 455], [824, 478]],
        [[938, 565], [872, 586]],
        [[955, 690], [892, 702]],
        [[946, 825], [880, 825]],
        [[862, 926], [818, 868]]
    ],
    rv: [
        [[762, 940], [728, 862]],
        [[630, 938], [608, 848]],
        [[490, 926], [472, 825]],
        [[350, 892], [342, 782]],
        [[228, 824], [228, 725]]
    ]
};

export const REPOLARIZATION_ARROWS = [
    { id: 'lv1', from: [932, 558], to: [866, 584] },
    { id: 'lv2', from: [950, 728], to: [882, 740] },
    { id: 'apex', from: [882, 920], to: [824, 858] },
    { id: 'rv1', from: [540, 930], to: [552, 854] }
];

export const PATHOLOGY_MARKERS = {
    avDelay: { x: 318, y: 532, label: 'Langsom AV', color: '#d48817' },
    avTotalBlock: { x: 345, y: 510, label: 'Totalblok', color: '#c43b47' },
    avEscapeFocus: { x: 524, y: 554, label: 'Erstatning', color: '#c43b47' },
    lbbbBlock: { x: 554, y: 540, label: 'Venstre gren blokeret', color: '#8b5cf6' },
    rbbbBlock: { x: 548, y: 584, label: 'Højre gren blokeret', color: '#0ea5e9' },
    vtFocus: { x: 868, y: 725, label: 'Ektopisk fokus', color: '#dc2626' },
};

export const PATHOLOGY_PATHS = {
    flutterLoop: 'M 184 316 C 272 314 328 378 318 460 C 306 540 234 574 162 544 C 102 518 92 428 118 360 C 132 326 156 317 184 316 Z',
    flutterAvTap: 'M 294 510 Q 308 524 322 532',
    afibFoci: [
        { id: 'la1', x: 486, y: 214, phase: 0.0 },
        { id: 'la2', x: 562, y: 196, phase: 0.24 },
        { id: 'la3', x: 632, y: 242, phase: 0.51 },
        { id: 'la4', x: 518, y: 286, phase: 0.74 },
        { id: 'ra1', x: 248, y: 376, phase: 0.37 },
        { id: 'ra2', x: 186, y: 458, phase: 0.86 },
    ],
    afibWavelets: [
        { id: 'w1', d: 'M 470 226 Q 515 178 566 196', phase: 0.0 },
        { id: 'w2', d: 'M 556 192 Q 618 198 648 250', phase: 0.18 },
        { id: 'w3', d: 'M 638 258 Q 584 294 522 276', phase: 0.36 },
        { id: 'w4', d: 'M 510 278 Q 458 264 474 218', phase: 0.55 },
        { id: 'w5', d: 'M 252 368 Q 282 424 252 478', phase: 0.28 },
        { id: 'w6', d: 'M 178 456 Q 152 382 214 344', phase: 0.67 },
        { id: 'w7', d: 'M 232 496 Q 286 508 310 526', phase: 0.82 },
    ],
    lbbbTransseptal: [
        'M 562 608 Q 642 590 735 572',
        'M 608 668 Q 692 648 792 634',
        'M 664 732 Q 752 718 852 708',
        'M 726 798 Q 802 794 878 784',
    ],
    rbbbTransseptal: [
        'M 642 612 Q 580 648 518 682',
        'M 692 674 Q 618 716 540 752',
        'M 744 738 Q 660 782 566 814',
        'M 776 802 Q 684 832 586 848',
    ],
    vtSpread: [
        'M 868 725 Q 842 610 792 475',
        'M 868 725 Q 786 648 675 585',
        'M 868 725 Q 755 710 612 696',
        'M 868 725 Q 748 792 602 824',
        'M 868 725 Q 828 842 758 886',
    ],
    vfFoci: [
        { id: 'vf1', x: 430, y: 710, phase: 0.0 },
        { id: 'vf2', x: 540, y: 790, phase: 0.17 },
        { id: 'vf3', x: 650, y: 695, phase: 0.34 },
        { id: 'vf4', x: 755, y: 760, phase: 0.51 },
        { id: 'vf5', x: 840, y: 650, phase: 0.68 },
        { id: 'vf6', x: 860, y: 790, phase: 0.84 },
        { id: 'vf7', x: 775, y: 540, phase: 0.42 },
    ],
    vfWavelets: [
        { id: 'vw1', d: 'M 380 735 Q 445 670 505 740', phase: 0.0 },
        { id: 'vw2', d: 'M 480 805 Q 560 765 620 825', phase: 0.14 },
        { id: 'vw3', d: 'M 615 710 Q 675 645 730 715', phase: 0.28 },
        { id: 'vw4', d: 'M 710 775 Q 785 725 835 795', phase: 0.42 },
        { id: 'vw5', d: 'M 810 670 Q 875 605 885 710', phase: 0.56 },
        { id: 'vw6', d: 'M 860 795 Q 820 870 740 850', phase: 0.70 },
        { id: 'vw7', d: 'M 760 520 Q 820 570 790 645', phase: 0.84 },
        { id: 'vw8', d: 'M 550 645 Q 605 695 570 755', phase: 0.92 },
    ],
};

export const PATHOLOGY_CALLOUTS = {
    afib: [
        { id: 'afib', sx: 126, sy: 68, tx: 548, ty: 196, title: 'Kaotiske foci (350–600/min)', sub: 'Flere udgangspunkter i atrierne', ecg: 'EKG: Ingen P-tak · urolige f-takker', color: '#7c5cbf' },
    ],
    aflutter: [
        { id: 'aflutter', sx: 122, sy: 68, tx: 215, ty: 318, title: 'Reentry-cirkel (~300/min)', sub: 'Stabil karrusel i højre atrium', ecg: 'EKG: Savtak-bølger i II/III/aVF', color: '#2b78b8' },
    ],
    av_block_1: [
        { id: 'av1', sx: 122, sy: 372, tx: 318, ty: 540, title: 'AV-forsinkelse (PR > 200 ms)', sub: 'Impulsen bremses i AV-knuden', ecg: 'EKG: Forlænget PR · smalt QRS', color: '#d48817' },
    ],
    av_block_3: [
        { id: 'av3-blk', sx: 118, sy: 368, tx: 345, ty: 515, title: 'Total AV-blokade', sub: 'Atrie-impuls stoppes helt', ecg: 'EKG: P & QRS er helt uafhængige', color: '#c43b47' },
        { id: 'av3-esc', sx: 556, sy: 372, tx: 524, ty: 572, title: 'Erstatningsfokus', sub: 'Driver ventrikler i eget tempo', ecg: 'EKG: Langsom, uafhængig rytme', color: '#d9534f' },
    ],
    lbbb: [
        { id: 'lbbb', sx: 556, sy: 370, tx: 562, ty: 534, title: 'Venstre gren blokeret', sub: 'Langsom muskelomvej HV → VV', ecg: 'EKG: Bredt QRS · QS i V1, M-R i V6', color: '#8b5cf6' },
    ],
    rbbb: [
        { id: 'rbbb', sx: 122, sy: 372, tx: 548, ty: 598, title: 'Højre gren blokeret', sub: 'Langsom omvej fra venstre side', ecg: 'EKG: Bredt QRS · rsR′ i V1, S i V6', color: '#0ea5e9' },
    ],
    vt: [
        { id: 'vt', sx: 556, sy: 374, tx: 862, ty: 748, title: 'Ektopisk VT-fokus', sub: 'Hurtig celle-til-celle spredning', ecg: 'EKG: 150/min brede QRS · + i aVR/V1', color: '#dc2626' },
    ],
    vf: [
        { id: 'vf', sx: 556, sy: 374, tx: 740, ty: 730, title: 'Ventrikelflimren (Hjertestop)', sub: 'Kaotiske mikro-bølger overalt', ecg: 'EKG: Kaos uden QRS · kræver DC-stød', color: '#b91c1c' },
    ],
};
