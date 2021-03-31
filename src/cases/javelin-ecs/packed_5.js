import { createComponentType, createWorld, number, query } from "@javelin/ecs";

const A = createComponentType({
  type: 0,
  schema: {
    value: number,
  },
});
const B = createComponentType({
  type: 1,
  schema: {
    value: number,
  },
});
const C = createComponentType({
  type: 2,
  schema: {
    value: number,
  },
});
const D = createComponentType({
  type: 3,
  schema: {
    value: number,
  },
});
const E = createComponentType({
  type: 4,
  schema: {
    value: number,
  },
});

export default (count) => {
  const world = createWorld();

  const qa = query(A);
  const qb = query(B);
  const qc = query(C);
  const qd = query(D);
  const qe = query(E);

  world.addSystem(() => {
    for (const [entities, [a]] of qa) {
      for (let i = 0; i < entities.length; i++) {
        a[i].value *= 2;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [b]] of qb) {
      for (let i = 0; i < entities.length; i++) {
        b[i].value *= 2;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [c]] of qc) {
      for (let i = 0; i < entities.length; i++) {
        c[i].value *= 2;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [d]] of qd) {
      for (let i = 0; i < entities.length; i++) {
        d[i].value *= 2;
      }
    }
  });
  world.addSystem(() => {
    for (const [entities, [e]] of qe) {
      for (let i = 0; i < entities.length; i++) {
        e[i].value *= 2;
      }
    }
  });

  for (let i = 0; i < count; i++) {
    world.spawn(
      world.component(A),
      world.component(B),
      world.component(C),
      world.component(D),
      world.component(E)
    );
  }

  return world.tick;
};
