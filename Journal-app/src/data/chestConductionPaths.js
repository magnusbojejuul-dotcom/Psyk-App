// Exact anatomical coordinates in the 960x720 transverse chest cross-section space.
export const CHEST_IMG_W = 960;
export const CHEST_IMG_H = 720;
export const CHEST_HEART_CENTER = { x: 494, y: 381 };

// Outer thorax ellipse center and radii in 960x720 coordinates (for torso clip & V1-V6 placement)
export const THORAX_CENTER = { x: 480, y: 385 };
export const THORAX_RX = 412;
export const THORAX_RY = 295;

export const CHEST_CONDUCTION_PATHS = {
    septalWave: 'M 480 390 Q 452 396 426 402',
    septumTract: 'M 476 294 C 460 355 466 435 524 514',
    rvPurkinje: 'M 476 294 C 430 288 370 330 362 396 C 356 452 398 498 474 514 C 502 520 518 518 524 514',
    lvPurkinje: 'M 476 294 C 520 250 605 246 650 296 C 692 344 690 422 646 474 C 606 516 552 522 524 514',
};

export const CHEST_CHAMBER_GLOWS = {
    septum: { cx: 472, cy: 402, rx: 32, ry: 112, rotate: -14 },
    rv: { cx: 404, cy: 398, rx: 86, ry: 128, rotate: 10 },
    lv: { cx: 584, cy: 382, rx: 118, ry: 136, rotate: 0 },
};

export const CHEST_REPOL_WALLS = {
    lv: [
        [[578, 224], [576, 256]],
        [[672, 276], [648, 298]],
        [[718, 378], [685, 380]],
        [[676, 480], [648, 464]],
        [[582, 534], [568, 506]],
    ],
    rv: [
        [[332, 388], [354, 392]],
        [[372, 494], [390, 476]],
        [[462, 536], [464, 514]],
    ],
};

export const CHEST_REPOL_ARROWS = [
    { id: 'lvPost', from: [656, 266], to: [634, 292] },
    { id: 'lvLat', from: [714, 378], to: [680, 380] },
    { id: 'lvAnt', from: [636, 512], to: [614, 486] },
    { id: 'rvAnt', from: [364, 488], to: [384, 468] },
];

export const CHEST_PATHOLOGY_MARKERS = {
    lbbbBlock: { x: 482, y: 314, color: '#8b5cf6' },
    rbbbBlock: { x: 446, y: 334, color: '#0ea5e9' },
    vtFocus: { x: 696, y: 396, color: '#dc2626' },
};

export const CHEST_PATHOLOGY_PATHS = {
    lbbbTransseptal: [
        'M 432 346 Q 488 332 552 316',
        'M 424 402 Q 488 398 564 392',
        'M 442 464 Q 508 466 576 462',
    ],
    rbbbTransseptal: [
        'M 498 334 Q 446 336 392 346',
        'M 494 402 Q 436 404 374 408',
        'M 508 468 Q 454 476 402 478',
    ],
    vtSpread: [
        'M 696 396 Q 642 308 562 260',
        'M 696 396 Q 594 378 466 362',
        'M 696 396 Q 574 426 420 434',
        'M 696 396 Q 638 486 534 510',
    ],
    vfFoci: [
        { id: 'cvf1', x: 372, y: 412, phase: 0.0 },
        { id: 'cvf2', x: 418, y: 488, phase: 0.22 },
        { id: 'cvf3', x: 566, y: 262, phase: 0.44 },
        { id: 'cvf4', x: 676, y: 386, phase: 0.68 },
        { id: 'cvf5', x: 594, y: 496, phase: 0.86 },
    ],
    vfWavelets: [
        { id: 'cvw1', d: 'M 358 360 Q 388 415 362 464', phase: 0.0 },
        { id: 'cvw2', d: 'M 398 492 Q 456 512 504 494', phase: 0.19 },
        { id: 'cvw3', d: 'M 548 258 Q 618 256 664 308', phase: 0.38 },
        { id: 'cvw4', d: 'M 684 342 Q 696 410 656 468', phase: 0.57 },
        { id: 'cvw5', d: 'M 624 494 Q 558 518 524 484', phase: 0.76 },
        { id: 'cvw6', d: 'M 468 352 Q 492 414 468 468', phase: 0.91 },
    ],
};

export const CHEST_LABELS = [
    { id: 'hv', text: 'HV', x: 400, y: 406, kind: 'chamber' },
    { id: 'vv', text: 'VV', x: 586, y: 384, kind: 'chamber' },
    { id: 'spine', text: 'Rygsøjle', x: 480, y: 186, kind: 'anat' },
    { id: 'sternum', text: 'Sternum', x: 480, y: 638, kind: 'anat' },
];
