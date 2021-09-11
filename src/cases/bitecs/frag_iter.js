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

const COMPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default (count) => {
  const world = createWorld();

  const components = COMPS.map((c) => defineComponent({ value: i32 }));

  const Data = defineComponent({ value: i32 });
  const { value } = Data
  
  const dataQuery = defineQuery([Data]);
  const dataSystem = world => {
    const ents = dataQuery(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      value[eid] *= 2;
    }
    return world;
  };

  for (let i = 0; i < count; i++) {
    for (const component of components) {
      const e = addEntity(world);
      addComponent(world, Data, e);
      addComponent(world, component, e);
    }
  }

  return () => {
    dataSystem(world);
  };
};
