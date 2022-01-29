import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  Types,
} from "bitecs";

const { i32 } = Types;

const COMPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default (count) => {
  const world = createWorld();

  const components = COMPS.map(() => defineComponent({ value: i32 }));

  const Z = components[25];
  const Data = defineComponent({ value: i32 });

  const dataQuery = defineQuery([Data]);
  const dataSystem = (world) => {
    const ents = dataQuery(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      Data.value[eid] *= 2;
    }
    return world;
  };

  const zQuery = defineQuery([Z]);
  const zSystem = (world) => {
    const ents = zQuery(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      Z.value[eid] *= 2;
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
    zSystem(world);
  };
};
