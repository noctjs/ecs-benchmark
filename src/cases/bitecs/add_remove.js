import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  pipe,
  removeComponent,
} from "bitecs";

export default (count) => {
  const world = createWorld();

  const A = defineComponent();
  const B = defineComponent();

  const queryA = defineQuery([A]);
  const addB = (world) => {
    const ents = queryA(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      addComponent(world, B, eid);
    }
    return world;
  };

  const queryB = defineQuery([B]);
  const removeB = (world) => {
    const ents = queryB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      removeComponent(world, B, eid);
    }
    return world;
  };

  for (let i = 0; i < count; i++) {
    let eid = addEntity(world);
    addComponent(world, A, eid);
  }

  const pipeline = pipe(addB, removeB);

  return () => {
    pipeline(world);
  };
};
