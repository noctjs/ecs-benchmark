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

  world.addSystem(() => {
    for (const [entities, [a]] of qa) {
      for (let i = 0; i < entities.length; i++) {
        a[i].value *= 2;
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
