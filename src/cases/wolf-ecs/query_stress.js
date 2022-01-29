import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS(n * 200);

  const cmps = [];
  for (let i = 0; i < 7; i++) {
    cmps.push(ecs.defineComponent(types.u32));
  }

  const qA = ecs.createQuery(cmps[0]);
  const qBC = ecs.createQuery(cmps[1], cmps[2]);
  const qBCD = ecs.createQuery(cmps[1], cmps[2], cmps[3]);
  const qDEFG = ecs.createQuery(cmps[3], cmps[4], cmps[5], cmps[6]);

  function sysA() {
    const lA = cmps[0];
    for (let i = 0, l = qA.a.length; i < l; i++) {
      const arch = qA.a[i].e;
      for (let j = 0, l = arch.length; j < l; j++) {
        lA[arch[j]] *= 2;
      }
    }
  }

  function sysBC() {
    const lB = cmps[1];
    const lC = cmps[2];
    for (let i = 0, l = qBC.a.length; i < l; i++) {
      const arch = qBC.a[i].e;
      for (let j = 0, l = arch.length; j < l; j++) {
        lB[arch[j]] *= 2;
        lC[arch[j]] *= 2;
      }
    }
  }

  function sysBCD() {
    const lB = cmps[1];
    const lC = cmps[2];
    const lD = cmps[3];
    for (let i = 0, l = qBCD.a.length; i < l; i++) {
      const arch = qBCD.a[i].e;
      for (let j = 0, l = arch.length; j < l; j++) {
        lB[arch[j]] *= 2;
        lC[arch[j]] *= 2;
        lD[arch[j]] *= 2;
      }
    }
  }

  function sysDEFG() {
    const lD = cmps[3];
    const lE = cmps[4];
    const lF = cmps[5];
    const lG = cmps[6];
    for (let i = 0, l = qDEFG.a.length; i < l; i++) {
      const arch = qDEFG.a[i].e;
      for (let j = 0, l = arch.length; j < l; j++) {
        lD[arch[j]] *= 2;
        lE[arch[j]] *= 2;
        lF[arch[j]] *= 2;
        lG[arch[j]] *= 2;
      }
    }
  }

  for (let _ = 0; _ < n; _++) {
    for (let i = 0; i < 128; i++) {
      let e = ecs.createEntity();
      for (let j = 0; j < 7; j++) {
        if (i & (1 << j)) {
          // Create entities with every possible component combination (n * 2 ^ 7 ents in total)
          ecs.addComponent(e, cmps[j]);
        }
      }
    }
  }

  return () => {
    sysA();
    sysBC();
    sysBCD();
    sysDEFG();
  };
}
