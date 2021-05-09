import { 
  createWorld,
  defineComponent,
  defineQuery,
  defineSystem,
  addComponent,
  removeComponent,
  addEntity,
  Types,
  pipe,
} from "../../../../bitECS/src/index.js";

const { i32 } = Types;

export default (count) => {
  const world = createWorld();

  const A = defineComponent({ value: i32 });
  const B = defineComponent({ value: i32 });

  const queryA = defineQuery([A]);
  const addB = defineSystem(world => {
    const ents = queryA(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      addComponent(world, B, eid);
    }
  });

  const queryB = defineQuery([B]);
  const removeB = defineSystem(world => {
    const ents = queryB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      removeComponent(world, B, eid);
    }
  })

  for (let i = 0; i < count; i++) {
    let eid = addEntity(world);
    addComponent(world, A, eid);
  }

  const pipeline = pipe(addB, removeB);

  return () => {
    pipeline(world);
  };
};
