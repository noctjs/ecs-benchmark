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

  const queryAB = defineQuery([A, B]);
  const systemAB = (world) => {
    const ents = queryAB(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      const x = A.value[eid];
      A.value[eid] = B.value[eid];
      B.value[eid] = x;
    }
    return world;
  };

  const queryCD = defineQuery([C, D]);
  const systemCD = (world) => {
    const ents = queryCD(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      const x = C.value[eid];
      C.value[eid] = D.value[eid];
      D.value[eid] = x;
    }
    return world;
  };

  const queryCE = defineQuery([C, E]);
  const systemCE = (world) => {
    const ents = queryCE(world);
    for (let i = 0; i < ents.length; i++) {
      const eid = ents[i];
      const x = C.value[eid];
      C.value[eid] = E.value[eid];
      E.value[eid] = x;
    }
    return world;
  };

  for (let i = 0; i < count; i++) {
    let e1 = addEntity(world);
    addComponent(world, A, e1);
    A.value[e1] = 0;
    addComponent(world, B, e1);
    B.value[e1] = 1;

    let e2 = addEntity(world);
    addComponent(world, A, e2);
    A.value[e2] = 0;
    addComponent(world, B, e2);
    B.value[e2] = 1;
    addComponent(world, C, e2);
    C.value[e2] = 2;

    let e3 = addEntity(world);
    addComponent(world, A, e3);
    A.value[e3] = 0;
    addComponent(world, B, e3);
    B.value[e3] = 1;
    addComponent(world, C, e3);
    C.value[e3] = 2;
    addComponent(world, D, e3);
    D.value[e3] = 3;

    let e4 = addEntity(world);
    addComponent(world, A, e4);
    A.value[e4] = 0;
    addComponent(world, B, e4);
    B.value[e4] = 1;
    addComponent(world, C, e4);
    C.value[e4] = 2;
    addComponent(world, E, e4);
    E.value[e4] = 3;
  }

  const pipeline = pipe(systemAB, systemCD, systemCE);

  return () => {
    pipeline(world);
  };
};
