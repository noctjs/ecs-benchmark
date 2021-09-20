import { ECS, types } from "wolf-ecs";

export default (count) => {
  const ecs = new ECS();

  const A = ecs.defineComponent(types.u32);
  const B = ecs.defineComponent(types.u32);
  const C = ecs.defineComponent(types.u32);
  const D = ecs.defineComponent(types.u32);
  const E = ecs.defineComponent(types.u32);

  const q = ecs.createQuery(A);
  function sys(lA) {
    for (let i = 0, l = q.archetypes.length; i < l; i++) {
      const arch = q.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        lA[arch[j]] *= 2;
      }
    }
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity();
    ecs.addComponent(i, A);
    A[i] = 1;
    ecs.addComponent(i, B);
    B[i] = 1;
    ecs.addComponent(i, C);
    C[i] = 1;
    ecs.addComponent(i, D);
    D[i] = 1;
    ecs.addComponent(i, E);
    E[i] = 1;
  }

  return () => {
    sys(A);
  };
};
