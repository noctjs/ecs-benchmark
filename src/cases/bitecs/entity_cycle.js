import { 
  createWorld,
  defineComponent,
  defineQuery,
  defineSystem,
  addComponent,
  addEntity,
  removeEntity,
  Types,
  pipe
} from "bitecs";

const { i32 } = Types;

export default (count) => {
  const world = createWorld();

  const A = defineComponent({ value: i32 });
  const B = defineComponent({ value: i32 });

  const queryA = defineQuery([A]);
  const spawnB = defineSystem(world => {
    const ents = queryA(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      const eidA = addEntity(world);
      const eidB = addEntity(world);
      addComponent(world, B, eidA);
      addComponent(world, B, eidB);
      B.value[eidA] = A.value[eid];
      B.value[eidB] = A.value[eid];
    }
  });

  const queryB = defineQuery([B]);
  const killB = defineSystem(world => {
    const ents = queryB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      removeEntity(world, eid);
    }
  });

  for (let i = 0; i < count; i++) {
    const eid = addEntity(world);
    addComponent(world, A, eid);
    A.value[eid] = i;
  }

  const pipeline = pipe(
    spawnB,
    killB,
  );

  return () => {
    pipeline(world);
  };
};
