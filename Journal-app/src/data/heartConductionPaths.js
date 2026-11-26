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
    flutterLoop: 'M 178 320 C 266 320 318 378 308 456 C 296 534 232 562 164 536 C 106 512 96 426 122 362 C 136 330 156 320 178 320 Z',
    afibFoci: [
        { id: 'la1', x: 486, y: 214, phase: 0.0 },
        { id: 'la2', x: 562, y: 196, phase: 0.24 },
        { id: 'la3', x: 632, y: 242, phase: 0.51 },
        { id: 'la4', x: 518, y: 286, phase: 0.74 },
        { id: 'ra1', x: 248, y: 376, phase: 0.37 },
        { id: 'ra2', x: 186, y: 458, phase: 0.86 },
    ],
    lbbbTransseptal: [
        'M 575 638 Q 642 622 710 606',
        'M 628 696 Q 698 682 772 670',
        'M 702 764 Q 778 756 854 748',
    ],
    rbbbTransseptal: [
        'M 648 632 Q 596 664 548 692',
        'M 704 696 Q 642 732 572 766',
        'M 754 756 Q 684 794 606 822',
    ],
    vtSpread: [
        'M 868 725 Q 798 668 712 612',
        'M 868 725 Q 774 720 656 716',
        'M 868 725 Q 842 630 806 520',
    ],
};
