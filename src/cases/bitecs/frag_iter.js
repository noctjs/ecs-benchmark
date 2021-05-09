import { 
  createWorld,
  defineComponent,
  defineQuery,
  defineSystem,
  addComponent,
  addEntity,
  Types,
} from "bitecs";

const { i32 } = Types;

const COMPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export default (count) => {
  const world = createWorld();

  const components = COMPS.map(c => defineComponent({ value: i32 }));

  const Data = defineComponent({ value: i32 });
  const dataQuery = defineQuery([Data]);
  const dataSystem = defineSystem(world => {
    const ents = dataQuery(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      Data.value[eid] *= 2;
    }
  });

  for (let i = 0; i < count; i++) {
    const e = addEntity(world);
    addComponent(world, Data, e);
    for (const component of components) {
      addComponent(world, component, e);
    }
  }

  return () => {
    dataSystem(world);
  };
};
