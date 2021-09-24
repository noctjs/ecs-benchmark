import { createComponentType, createWorld, number, query } from "@javelin/ecs";

const COMPS = 26;
const componentTypes = [];
const initialize = (c, v) => (c.value = v);

for (let i = 0; i < COMPS; i++) {
  componentTypes.push(
    createComponentType({
      type: i,
      schema: { value: number },
      initialize,
    })
  );
}

const Data = createComponentType({
  type: 26,
  schema: {
    value: number,
  },
});

export default (count) => {
  const world = createWorld();
  const qd = query(Data);
  const qz = query(componentTypes[25]);

  world.addSystem(() => {
    for (const [entities, [d]] of qd) {
      for (let i = 0; i < entities.length; i++) {
        d[i].value *= 2;
      }
    }
  });

  world.addSystem(() => {
    for (const [entities, [z]] of qz) {
      for (let i = 0; i < entities.length; i++) {
        z[i].value *= 2;
      }
    }
  });

  for (let i = 0; i < count; i++) {
    for (let i = 0; i < COMPS; i++) {
      world.spawn(
        world.component(componentTypes[i], 0),
        world.component(Data, 0)
      );
    }
  }

  return world.tick;
};
