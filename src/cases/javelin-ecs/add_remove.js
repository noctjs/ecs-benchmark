import { createComponentType, createWorld, number, query } from "@javelin/ecs";

const A = createComponentType({
  type: 0,
  schema: {},
});

const B = createComponentType({
  type: 1,
  schema: {},
});

export default (count) => {
  const world = createWorld();

  const qa = query(A).not(B);
  const qb = query(B);

  world.addSystem((world) => {
    for (const [entities] of qa) {
      for (let i = 0; i < entities.length; i++) {
        world.attach(entities[i], world.component(B));
      }
    }
  });

  world.addSystem((world) => {
    for (const [entities, [b]] of qb) {
      for (let i = 0; i < entities.length; i++) {
        world.detach(entities[i], b[i]);
      }
    }
  });

  for (let i = 0; i < count; i++) {
    world.spawn(world.component(A));
  }

  return world.tick;
};
