import { ECS, types } from "wolf-ecs";

export default (count) => {
  const ecs = new ECS();

  const A = ecs.defineComponent(types.u32);
  const B = ecs.defineComponent(types.u32);
  const C = ecs.defineComponent(types.u32);
  const D = ecs.defineComponent(types.u32);
  const E = ecs.defineComponent(types.u32);

  const qAB = ecs.createQuery(A, B);
  const qCD = ecs.createQuery(C, D);
  const qCE = ecs.createQuery(C, E);

  function sysAB(lA, lB) {
    for (let i = 0, l = qAB.length; i < l; i++) {
      const arch = qAB[i];
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lA[arch[j]];
        lA[arch[j]] = lB[arch[j]];
        lB[arch[j]] = temp;
      }
    }
  }

  function sysCD(lC, lD) {
    for (let i = 0, l = qCD.length; i < l; i++) {
      const arch = qCD[i];
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lC[arch[j]];
        lC[arch[j]] = lD[arch[j]];
        lD[arch[j]] = temp;
      }
    }
  }

  function sysCE(lC, lE) {
    for (let i = 0, l = qCE.length; i < l; i++) {
      const arch = qCE[i];
      for (let j = 0, l = arch.length; j < l; j++) {
        const temp = lC[arch[j]];
        lC[arch[j]] = lE[arch[j]];
        lE[arch[j]] = temp;
      }
    }
  }

  for (let i = 0; i < count; i++) {
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
    sysAB(A, B);
    sysCD(C, D);
    sysCE(C, E);
  };
};
