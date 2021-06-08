import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  ecs.defineComponent("A", types.u32);
  ecs.defineComponent("B", types.u32);
  ecs.defineComponent("C", types.u32);
  ecs.defineComponent("D", types.u32);
  ecs.defineComponent("E", types.u32);

  const qA = ecs.createQuery("A");
  const qB = ecs.createQuery("B");
  const qC = ecs.createQuery("C");
  const qD = ecs.createQuery("D");
  const qE = ecs.createQuery("E");

  function sysA() {
    const A = ecs.components.A;
    for (let i = 0, l = qA.archetypes.length; i < l; i++) {
      const arch = qA.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        A[arch[j]] *= 2;
      }
    }
  }

  function sysB() {
    const B = ecs.components.B;
    for (let i = 0, l = qB.archetypes.length; i < l; i++) {
      const arch = qB.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        B[arch[j]] *= 2;
      }
    }
  }

  function sysC() {
    const C = ecs.components.C;
    for (let i = 0, l = qC.archetypes.length; i < l; i++) {
      const arch = qC.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        C[arch[j]] *= 2;
      }
    }
  }

  function sysD() {
    const D = ecs.components.D;
    for (let i = 0, l = qD.archetypes.length; i < l; i++) {
      const arch = qD.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        D[arch[j]] *= 2;
      }
    }
  }

  function sysE() {
    const E = ecs.components.E;
    for (let i = 0, l = qE.archetypes.length; i < l; i++) {
      const arch = qE.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        E[arch[j]] *= 2;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    ecs.createEntity();
    ecs.addComponent(i, "A");
    ecs.components.A[i] = 1;
    ecs.addComponent(i, "B");
    ecs.components.B[i] = 1;
    ecs.addComponent(i, "C");
    ecs.components.C[i] = 1;
    ecs.addComponent(i, "D");
    ecs.components.D[i] = 1;
    ecs.addComponent(i, "E");
    ecs.components.E[i] = 1;
  }

  return () => {
    sysA();
    sysB();
    sysC();
    sysD();
    sysE();
  };
}
