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

export default (count) => {
  const world = createWorld();

  const A = defineComponent({ value: i32 });
  const B = defineComponent({ value: i32 });
  const C = defineComponent({ value: i32 });
  const D = defineComponent({ value: i32 });
  const E = defineComponent({ value: i32 });

  const query = defineQuery([A]);
  const system = defineSystem((world) => {
    const ents = query(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      A.value[eid] *= 2;
    }
  });

  for (let i = 0; i < count; i++) {
    const eid = addEntity(world);
    addComponent(world, A, eid);
    addComponent(world, B, eid);
    addComponent(world, C, eid);
    addComponent(world, D, eid);
    addComponent(world, E, eid);
  }

  return () => {
    system(world);
  };
};
