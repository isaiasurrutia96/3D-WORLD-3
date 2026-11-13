// One canonical plan for BOTH supplied 1536x1024 views.
// Positions were read from the more overhead image; heights from the angled one.
// The illustrated explorer is intentionally omitted, as requested.
export const REFERENCE={
 width:1536,height:1024,pixelsPerCell:14,origin:[750,550],
 overheadElevation:55,angledCamera:{"targetX": 0.60882, "targetY": -1.36139, "distance": 308.86737, "frameScale": 0.96776},angledElevation:25.0131,
};
export const FOOTPRINT=[
  [
    -20,
    -29
  ],
  [
    -12,
    -33
  ],
  [
    -4,
    -33
  ],
  [
    0,
    -35
  ],
  [
    6,
    -38
  ],
  [
    14,
    -35
  ],
  [
    19,
    -28
  ],
  [
    23,
    -26
  ],
  [
    28,
    -23
  ],
  [
    30,
    -17
  ],
  [
    32,
    -13
  ],
  [
    33,
    -9
  ],
  [
    34,
    -4
  ],
  [
    34,
    2
  ],
  [
    32,
    7
  ],
  [
    29,
    12
  ],
  [
    27,
    17
  ],
  [
    23,
    21
  ],
  [
    18,
    22
  ],
  [
    12,
    26
  ],
  [
    6,
    29
  ],
  [
    0,
    33
  ],
  [
    -4,
    32
  ],
  [
    -9,
    28
  ],
  [
    -14,
    26
  ],
  [
    -20,
    22
  ],
  [
    -24,
    17
  ],
  [
    -28,
    13
  ],
  [
    -31,
    9
  ],
  [
    -33,
    6
  ],
  [
    -35,
    1
  ],
  [
    -35,
    -5
  ],
  [
    -34,
    -9
  ],
  [
    -31,
    -13
  ],
  [
    -28,
    -16
  ],
  [
    -26,
    -20
  ],
  [
    -24,
    -24
  ],
  [
    -23,
    -28
  ]
];
// Raised rear terraces expose deeper soil walls above the main lawn.
export const TERRACES=[
  {
    "id": "left-rear",
    "height": 2,
    "polygon": [
      [
        -23,
        -26
      ],
      [
        -21,
        -30
      ],
      [
        -18,
        -31
      ],
      [
        -14,
        -30
      ],
      [
        -11,
        -28
      ],
      [
        -10,
        -24
      ],
      [
        -12,
        -20
      ],
      [
        -16,
        -19
      ],
      [
        -20,
        -20
      ],
      [
        -22,
        -23
      ]
    ]
  },
  {
    "id": "rear-link",
    "height": 2,
    "polygon": [
      [
        -13,
        -29
      ],
      [
        -8,
        -31
      ],
      [
        -2,
        -32
      ],
      [
        3,
        -35
      ],
      [
        6,
        -32
      ],
      [
        5,
        -28
      ],
      [
        1,
        -27
      ],
      [
        -3,
        -28
      ],
      [
        -8,
        -27
      ],
      [
        -11,
        -26
      ]
    ]
  },
  {
    "id": "right-rear",
    "height": 2,
    "polygon": [
      [
        18,
        -25
      ],
      [
        23,
        -26
      ],
      [
        27,
        -24
      ],
      [
        29,
        -20
      ],
      [
        29,
        -17
      ],
      [
        27,
        -15
      ],
      [
        23,
        -15
      ],
      [
        20,
        -17
      ],
      [
        19,
        -20
      ]
    ]
  },
  {
    "id": "upper-apron",
    "height": 2,
    "polygon": [
      [
        -1,
        -34
      ],
      [
        5,
        -37
      ],
      [
        11,
        -36
      ],
      [
        17,
        -32
      ],
      [
        19,
        -28
      ],
      [
        21,
        -25
      ],
      [
        21,
        -21
      ],
      [
        18,
        -19
      ],
      [
        15,
        -18
      ],
      [
        11,
        -19
      ],
      [
        8,
        -21
      ],
      [
        4,
        -23
      ],
      [
        1,
        -26
      ],
      [
        -1,
        -28
      ]
    ]
  },
  {
    "id": "upper-lawn",
    "height": 6,
    "polygon": [
      [
        0,
        -34
      ],
      [
        3,
        -36
      ],
      [
        8,
        -35
      ],
      [
        13,
        -33
      ],
      [
        16,
        -29
      ],
      [
        16,
        -27
      ],
      [
        13,
        -24
      ],
      [
        9,
        -23
      ],
      [
        5,
        -24
      ],
      [
        2,
        -27
      ]
    ]
  }
];
export const TREE_PLAN=[
  {
    "id": "left-large",
    "x": -30,
    "z": -3,
    "scale": 1.15,
    "trunk": 7,
    "source": [
      350,
      520
    ],
    "crown": "broad",
    "vertical": 0.85,
    "canopyBack": 1.5
  },
  {
    "id": "rear-left",
    "x": -17,
    "z": -26,
    "scale": 0.85,
    "trunk": 4,
    "source": [
      530,
      246
    ],
    "crown": "small",
    "vertical": 0.75,
    "canopyBack": 1.5
  },
  {
    "id": "rear-high",
    "x": 10,
    "z": -28,
    "scale": 1.05,
    "trunk": 6,
    "source": [
      900,
      205
    ],
    "crown": "tall",
    "vertical": 0.8,
    "canopyBack": 2.5
  },
  {
    "id": "rear-right",
    "x": 23,
    "z": -20,
    "scale": 0.85,
    "trunk": 4,
    "source": [
      1090,
      320
    ],
    "crown": "small-right",
    "vertical": 0.75,
    "canopyBack": 1.5
  },
  {
    "id": "right-large",
    "x": 30,
    "z": 1,
    "scale": 1.03,
    "trunk": 6,
    "source": [
      1180,
      565
    ],
    "crown": "round",
    "vertical": 0.75,
    "canopyBack": 1.5
  }
];
export const ROCK_PLAN=[
  {
    "id": "left-foreground",
    "x": -27,
    "z": 6,
    "source": [
      388,
      620
    ],
    "cells": [
      [
        0,
        0,
        0
      ],
      [
        1,
        0,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        1,
        0,
        1
      ],
      [
        0,
        1,
        0
      ],
      [
        1,
        1,
        0
      ],
      [
        2,
        0,
        1
      ]
    ]
  },
  {
    "id": "upper-rear",
    "x": 1,
    "z": -34,
    "source": [
      785,
      145
    ],
    "cells": [
      [
        0,
        0,
        0
      ],
      [
        1,
        0,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        1,
        0,
        1
      ],
      [
        0,
        1,
        0
      ],
      [
        0,
        2,
        0
      ],
      [
        1,
        1,
        0
      ]
    ]
  },
  {
    "id": "terrace-right",
    "x": 14,
    "z": -25,
    "source": [
      963,
      260
    ],
    "cells": [
      [
        0,
        0,
        0
      ],
      [
        1,
        0,
        0
      ],
      [
        1,
        1,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        2,
        0,
        0
      ]
    ]
  },
  {
    "id": "right-shore",
    "x": 25,
    "z": 3,
    "source": [
      1123,
      584
    ],
    "cells": [
      [
        0,
        0,
        0
      ],
      [
        1,
        0,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        1,
        0,
        1
      ],
      [
        1,
        1,
        0
      ],
      [
        2,
        0,
        1
      ]
    ]
  },
  {
    "id": "pond-front",
    "x": 12,
    "z": 18,
    "source": [
      941,
      760
    ],
    "cells": [
      [
        0,
        0,
        0
      ],
      [
        1,
        0,
        0
      ],
      [
        0,
        0,
        1
      ],
      [
        1,
        0,
        1
      ],
      [
        0,
        1,
        0
      ],
      [
        2,
        0,
        1
      ]
    ]
  }
];
export const SHRUB_PLAN=[
  {
    "id": "rear-link",
    "x": -3,
    "z": -30,
    "source": [
      710,
      197
    ]
  },
  {
    "id": "left-shore",
    "x": -30,
    "z": 2,
    "source": [
      341,
      582
    ]
  },
  {
    "id": "right-shore",
    "x": 23,
    "z": 0,
    "source": [
      1074,
      559
    ]
  },
  {
    "id": "pond-front",
    "x": 10,
    "z": 20,
    "source": [
      888,
      785
    ]
  }
];
export const PATH_CELLS=[
  [
    -26,
    -16
  ],
  [
    -26,
    -16
  ],
  [
    -25,
    -16
  ],
  [
    -25,
    -17
  ],
  [
    -25,
    -18
  ],
  [
    -24,
    -17
  ],
  [
    -24,
    -18
  ],
  [
    -24,
    -20
  ],
  [
    -23,
    -18
  ],
  [
    -23,
    -20
  ],
  [
    -23,
    -21
  ],
  [
    -22,
    -20
  ],
  [
    -22,
    -21
  ],
  [
    -22,
    -22
  ],
  [
    -21,
    -21
  ],
  [
    -21,
    -22
  ],
  [
    -21,
    -23
  ]
];
export const POND_POLYGON=[
  [
    15,
    11
  ],
  [
    15,
    15
  ],
  [
    16,
    17
  ],
  [
    18,
    17
  ],
  [
    20,
    17
  ],
  [
    20,
    20
  ],
  [
    21,
    21
  ],
  [
    23,
    20
  ],
  [
    24,
    17
  ],
  [
    25,
    15
  ],
  [
    25,
    11
  ],
  [
    24,
    9
  ],
  [
    22,
    7
  ],
  [
    19,
    7
  ],
  [
    17,
    9
  ]
];
export const FALL={x:21.5,z:19.5,nx:.45,nz:Math.sqrt(1-.45**2),width:2.2,bottom:-24};
export const ROCK_LAYERS=[
  [
    1,
    0
  ],
  [
    1,
    0
  ],
  [
    0.99,
    0
  ],
  [
    0.94,
    1
  ],
  [
    0.92,
    2
  ],
  [
    0.89,
    2
  ],
  [
    0.81,
    5
  ],
  [
    0.77,
    6
  ],
  [
    0.73,
    6
  ],
  [
    0.69,
    6
  ],
  [
    0.64,
    7
  ],
  [
    0.54,
    9
  ],
  [
    0.49,
    10
  ],
  [
    0.44,
    10
  ],
  [
    0.34,
    12
  ],
  [
    0.29,
    12
  ],
  [
    0.25,
    13
  ],
  [
    0.21,
    15
  ],
  [
    0.15,
    15
  ],
  [
    0.06,
    16
  ],
  [
    0.025,
    17
  ]
];
export function inPolygon(x,z,points){
 let inside=false;
 for(let i=0,j=points.length-1;i<points.length;j=i++){
  const [xi,zi]=points[i],[xj,zj]=points[j];
  if((zi>z)!==(zj>z)&&x<(xj-xi)*(z-zi)/(zj-zi)+xi)inside=!inside;
 }
 return inside;
}
