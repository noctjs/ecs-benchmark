import {
  addComponent,
  addEntity,
  createWorld,
  defineComponent,
  defineQuery,
  pipe,
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

  const queryA = defineQuery([A]);
  const { value: valA } = A;
  const PACKED_A = (world) => {
    const ents = queryA(world);
    for (let i = 0, n = ents.length; i < n; i++) {
      const eid = ents[i];
      valA[eid] *= 2;
    }
    return world;
  };

  const queryB = defineQuery([B]);
  const { value: valB } = B;
  const PACKED_B = (world) => {
    const ents = queryB(world);
    for (let i = 0, n = ents.length; i < n; i++) {
      const eid = ents[i];
      valB[eid] *= 2;
    }
    return world;
  };

  const queryC = defineQuery([C]);
  const { value: valC } = C;
  const PACKED_C = (world) => {
    const ents = queryC(world);
    for (let i = 0, n = ents.length; i < n; i++) {
      const eid = ents[i];
      valC[eid] *= 2;
    }
    return world;
  };

  const queryD = defineQuery([D]);
  const { value: valD } = D;
  const PACKED_D = (world) => {
    const ents = queryD(world);
    for (let i = 0, n = ents.length; i < n; i++) {
      const eid = ents[i];
      valD[eid] *= 2;
    }
    return world;
  };

  const queryE = defineQuery([E]);
  const { value: valE } = E;
  const PACKED_E = (world) => {
    const ents = queryE(world);
    for (let i = 0, n = ents.length; i < n; i++) {
      const eid = ents[i];
      valE[eid] *= 2;
    }
    return world;
  };

  for (let i = 0; i < count; i++) {
    let e = addEntity(world);
    addComponent(world, A, e);
    addComponent(world, B, e);
    addComponent(world, C, e);
    addComponent(world, D, e);
    addComponent(world, E, e);
  }

  const pipeline = pipe(PACKED_A, PACKED_B, PACKED_C, PACKED_D, PACKED_E);

  return () => {
    pipeline(world);
  };
};
