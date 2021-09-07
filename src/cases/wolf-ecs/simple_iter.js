import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  const A = ecs.defineComponent(types.u32);
  const B = ecs.defineComponent(types.u32);
  const C = ecs.defineComponent(types.u32);
  const D = ecs.defineComponent(types.u32);
  const E = ecs.defineComponent(types.u32);

  const qAB = ecs.createQuery(A, B);
  const qCD = ecs.createQuery(C, D);
  const qCE = ecs.createQuery(C, E);

  function sysAB() {
    const lA = A;
    const lB = B;
    for (let i = 0, l = qAB.archetypes.length; i < l; i++) {
      const arch = qAB.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lA[arch[j]];
        lA[arch[j]] = lB[arch[j]];
        lB[arch[j]] = temp;
      }
    }
  }

  function sysCD() {
    const lC = C;
    const lD = D;
    for (let i = 0, l = qCD.archetypes.length; i < l; i++) {
      const arch = qCD.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lC[arch[j]];
        lC[arch[j]] = lD[arch[j]];
        lD[arch[j]] = temp;
      }
    }
  }

  function sysCE() {
    const lC = C;
    const lE = E;
    for (let i = 0, l = qCE.archetypes.length; i < l; i++) {
      const arch = qCE.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lC[arch[j]];
        lC[arch[j]] = lE[arch[j]];
        lE[arch[j]] = temp;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const ab = ecs.createEntity();
    ecs.addComponent(ab, A);
    ecs.addComponent(ab, B);

    const abc = ecs.createEntity();
    ecs.addComponent(abc, A);
    ecs.addComponent(abc, B);
    ecs.addComponent(abc, C);

    const abcd = ecs.createEntity();
    ecs.addComponent(abcd, A);
    ecs.addComponent(abcd, B);
    ecs.addComponent(abcd, C);
    ecs.addComponent(abcd, D);

    const abce = ecs.createEntity();
    ecs.addComponent(abce, A);
    ecs.addComponent(abce, B);
    ecs.addComponent(abce, C);
    ecs.addComponent(abce, E);
  }

  return () => {
    sysAB();
    sysCD();
    sysCE();
  };
}
