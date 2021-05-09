import { 
  createWorld,
  defineComponent,
  defineQuery,
  defineSystem,
  addComponent,
  addEntity,
  pipe,
  Types,
} from "../../../../bitECS/src/index.js";

const { i32 } = Types;

export default (count) => {
  const world = createWorld();

  const A = defineComponent({ value: i32 });
  const B = defineComponent({ value: i32 });
  const C = defineComponent({ value: i32 });
  const D = defineComponent({ value: i32 });
  const E = defineComponent({ value: i32 });

  const queryA = defineQuery([A]);
  const PACKED_A = defineSystem(world => {
    const ents = queryA(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      A.value[eid] *= 2;
    }
  });
  const queryB = defineQuery([B]);
  const PACKED_B = defineSystem(world => {
    const ents = queryB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      B.value[eid] *= 2;
    }
  });
  const queryC = defineQuery([C]);
  const PACKED_C = defineSystem(world => {
    const ents = queryC(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      C.value[eid] *= 2;
    }
  });
  const queryD = defineQuery([D]);
  const PACKED_D = defineSystem(world => {
    const ents = queryD(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      D.value[eid] *= 2;
    }
  });
  const queryE = defineQuery([E]);
  const PACKED_E = defineSystem(world => {
    const ents = queryE(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      E.value[eid] *= 2;
    }
  });

  for (let i = 0; i < count; i++) {
    let e = addEntity(world);
    addComponent(world, A, e);
    addComponent(world, B, e);
    addComponent(world, C, e);
    addComponent(world, D, e);
    addComponent(world, E, e);
  }

  const pipeline = pipe(
    PACKED_A,
    PACKED_B,
    PACKED_C,
    PACKED_D,
    PACKED_E,
  );

  return () => {
    pipeline(world)
  };
};
