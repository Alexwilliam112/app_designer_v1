const nodes= [
  {
    id: "entry-1743925217860",
    type: "entryPoint",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      id: "entry-1743925217860",
    },
    measured: {
      width: 80,
      height: 80,
    },
    selected: false,
  },
  {
    id: "component-1743925219363",
    type: "component",
    position: {
      x: 180,
      y: 0,
    },
    data: {
      id: "component-1743925219363",
      featureName: "Administrator",
      featureIcon: {
        type: {},
        key: null,
        props: {
          className: "w-4 h-4",
        },
        _owner: null,
        _store: {},
      },
      module: "APP BUILDER",
      category: "",
      type: "",
      targetPosition: "left",
    },
    measured: {
      width: 288,
      height: 159,
    },
    selected: true,
  },
]

function forceLayout(nodes, newPosition) {
  const gap = 100;
  let A = {
    x: newPosition.x,
    y: newPosition.y,
    width: 288,
    height: 200,
  };

  let hasCollision = true;
  const maxIterations = 100;
  let iterationCount = 0;

  while (hasCollision && iterationCount < maxIterations) {
    hasCollision = false;
    iterationCount++;

    for (const node of nodes) {
      const B = {
        x: node.position.x,
        y: node.position.y,
        width: node.measured.width,
        height: node.measured.height,
      };

      const AcenterX = A.x + A.width / 2;
      const AcenterY = A.y + A.height / 2;
      const BcenterX = B.x + B.width / 2;
      const BcenterY = B.y + B.height / 2;

      const dx = AcenterX - BcenterX;
      const dy = AcenterY - BcenterY;

      // Include the gap in the overlap calculation
      const px = (A.width + B.width + gap) / 2 - Math.abs(dx);
      const py = (A.height + B.height + gap) / 2 - Math.abs(dy);

      if (px > 0 && py > 0) {
        hasCollision = true; // Mark that a collision was detected

        // Adjust position based on overlap direction
        if (px < py) {
          A.x += dx > 0 ? px : -px;
        } else if (py < px) {
          A.y += dy > 0 ? py : -py;
        } else {
          // If px and py are equal, alternate between x and y adjustments
          if (iterationCount % 2 === 0) {
            A.x += dx > 0 ? px : -px;
          } else {
            A.y += dy > 0 ? py : -py;
          }
        }
      }
    }
  }

  if (iterationCount >= maxIterations) {
    console.warn("forceLayout: Maximum iterations reached. Collision resolution may be incomplete.");
  }

  return { x: A.x, y: A.y };
}

