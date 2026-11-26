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
    bachmannMain: 'M 198 292 C 280 278 400 235 480 202 C 530 182 566 178 594 205',
    bachmannBranchA: 'M 588 198 C 598 228 595 258 585 288',
    bachmannBranchB: 'M 594 205 C 632 225 660 245 680 274',

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
