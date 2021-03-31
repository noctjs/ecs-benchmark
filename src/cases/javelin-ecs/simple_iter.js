import { createComponentType, createWorld, number, query } from "@javelin/ecs";

const initialize = (c, v) => (c.value = v);

const A = createComponentType({
  type: 0,
  schema: {
    value: number,
  },
  initialize,
});
const B = createComponentType({
  type: 1,
  schema: {
    value: number,
  },
  initialize,
});
const C = createComponentType({
  type: 2,
  schema: {
    value: number,
  },
  initialize,
});
const D = createComponentType({
  type: 3,
  schema: {
    value: number,
  },
  initialize,
});
const E = createComponentType({
  type: 4,
  schema: {
    value: number,
  },
  initialize,
});

export default (count) => {
  const world = createWorld();

  const qab = query(A, B);
  const qcd = query(C, D);
  const qce = query(C, E);

  world.addSystem(() => {
    for (const [entities, [a, b]] of qab) {
      for (let i = 0; i < entities.length; i++) {
        const ea = a[i];
        const eb = b[i];
        const x = ea.value;
        ea.value = eb.value;
        eb.value = x;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [c, d]] of qcd) {
      for (let i = 0; i < entities.length; i++) {
        const ec = c[i];
        const ed = d[i];
        const x = ec.value;
        ec.value = ed.value;
        ed.value = x;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [c, e]] of qce) {
      for (let i = 0; i < entities.length; i++) {
        const ec = c[i];
        const ee = e[i];
        const x = ec.value;
        ec.value = ee.value;
        ee.value = x;
      }
    }
  });

  for (let i = 0; i < count; i++) {
    world.spawn(world.component(A, 0), world.component(B, 1));

    world.spawn(
      world.component(A, 0),
      world.component(B, 1),
      world.component(C, 2)
    );

    world.spawn(
      world.component(A, 0),
      world.component(B, 1),
      world.component(C, 2),
      world.component(D, 3)
    );

    world.spawn(
      world.component(A, 0),
      world.component(B, 1),
      world.component(C, 2),
      world.component(E, 4)
    );
  }

  return world.tick;
};
