import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  pipe,
  removeEntity,
  Types,
} from "bitecs";

const { i32 } = Types;

export default (count) => {
  const world = createWorld();

  const A = defineComponent({ value: i32 });
  const B = defineComponent({ value: i32 });

  const queryA = defineQuery([A]);
  const spawnB = (world) => {
    const ents = queryA(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = addEntity(world);
      addComponent(world, B, eid);
      B.value[eid] = A.value[ents[i]];
    }
    return world;
  };

  const queryB = defineQuery([B]);
  const killB = (world) => {
    const ents = queryB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      removeEntity(world, eid);
    }
    return world;
  };

  for (let i = 0; i < count; i++) {
    const eid = addEntity(world);
    addComponent(world, A, eid);
    A.value[eid] = i;
  }

  const pipeline = pipe(spawnB, killB);

  return () => {
    pipeline(world);
  };
};
