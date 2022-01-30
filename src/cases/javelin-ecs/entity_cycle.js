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

export default (count) => {
  const world = createWorld();

  for (let i = 0; i < count; i++) {
    world.spawn(world.component(A, i));
  }

  const qa = query(A);
  const qb = query(B);

  world.addSystem((world) => {
    for (const [entities, [a]] of qa) {
      for (let i = 0; i < entities.length; i++) {
        world.spawn(world.component(B, a[i].value));
      }
    }
  });

  world.addSystem((world) => {
    for (const [entities] of qb) {
      entities.forEach(world.destroy);
    }
  });

  return world.tick;
};
