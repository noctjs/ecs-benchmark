import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  ecs.defineComponent("A", types.u32);
  ecs.defineComponent("B", types.u32);
  ecs.defineComponent("C", types.u32);
  ecs.defineComponent("D", types.u32);
  ecs.defineComponent("E", types.u32);

  const qAB = ecs.createQuery("A", "B");
  const qCD = ecs.createQuery("C", "D");
  const qCE = ecs.createQuery("C", "E");

  function sysAB() {
    const A = ecs.components.A;
    const B = ecs.components.B;
    for (let i = 0, l = qAB.archetypes.length; i < l; i++) {
      const arch = qAB.archetypes[i].entities;
      for (let i = 0, l = arch.length; i < l; i++) {
        const temp = A[arch[i]];
        A[arch[i]] = B[arch[i]];
        B[arch[i]] = temp;
      }
    }
  }

  function sysCD() {
    const C = ecs.components.C;
    const D = ecs.components.D;
    for (let i = 0, l = qCD.archetypes.length; i < l; i++) {
      const arch = qCD.archetypes[i].entities;
      for (let i = 0, l = arch.length; i < l; i++) {
        const temp = C[arch[i]];
        C[arch[i]] = D[arch[i]];
        D[arch[i]] = temp;
      }
    }
  }

  function sysCE() {
    const C = ecs.components.C;
    const E = ecs.components.E;
    for (let i = 0, l = qCE.archetypes.length; i < l; i++) {
      const arch = qCE.archetypes[i].entities;
      for (let i = 0, l = arch.length; i < l; i++) {
        const temp = C[arch[i]];
        C[arch[i]] = E[arch[i]];
        E[arch[i]] = temp;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    const ab = ecs.createEntity();
    ecs.addComponent(ab, "A");
    ecs.addComponent(ab, "B");

    const abc = ecs.createEntity();
    ecs.addComponent(abc, "A");
    ecs.addComponent(abc, "B");
    ecs.addComponent(abc, "C");

    const abcd = ecs.createEntity();
    ecs.addComponent(abcd, "A");
    ecs.addComponent(abcd, "B");
    ecs.addComponent(abcd, "C");
    ecs.addComponent(abcd, "D");

    const abce = ecs.createEntity();
    ecs.addComponent(abce, "A");
    ecs.addComponent(abce, "B");
    ecs.addComponent(abce, "C");
    ecs.addComponent(abce, "E");
  }

  return () => {
    sysAB();
    sysCD();
    sysCE();
  };
}
