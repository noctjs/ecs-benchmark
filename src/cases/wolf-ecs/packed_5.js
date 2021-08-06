import {ECS, types} from "wolf-ecs"

export default function(n) {
  const ecs = new ECS()

  const A = ecs.defineComponent(types.u32)
  const B = ecs.defineComponent(types.u32)
  const C = ecs.defineComponent(types.u32)
  const D = ecs.defineComponent(types.u32)
  const E = ecs.defineComponent(types.u32)

  const qA = ecs.createQuery(A)
  function sysA() {
    const lA = A
    for(let i = 0, l = qA.archetypes.length; i < l; i++) {
      const arch = qA.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        lA[arch[j]] *= 2
      }
    }
  }

  const qB = ecs.createQuery(B)
  function sysB() {
    const lB = B
    for(let i = 0, l = qB.archetypes.length; i < l; i++) {
      const arch = qB.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        lB[arch[j]] *= 2
      }
    }
  }

  const qC = ecs.createQuery(C)
  function sysC() {
    const lC = C
    for(let i = 0, l = qC.archetypes.length; i < l; i++) {
      const arch = qC.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        lC[arch[j]] *= 2
      }
    }
  }

  const qD = ecs.createQuery(D)
  function sysD() {
    const lD = D
    for(let i = 0, l = qD.archetypes.length; i < l; i++) {
      const arch = qD.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        lD[arch[j]] *= 2
      }
    }
  }

  const qE = ecs.createQuery(E)
  function sysE() {
    const lE = E
    for(let i = 0, l = qE.archetypes.length; i < l; i++) {
      const arch = qE.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        lE[arch[j]] *= 2
      }
    }
  }

  for(let i = 0; i < n; i++) {
    ecs.createEntity()
    ecs.addComponent(i, A)
    A[i] = 1
    ecs.addComponent(i, B)
    B[i] = 1
    ecs.addComponent(i, C)
    C[i] = 1
    ecs.addComponent(i, D)
    D[i] = 1
    ecs.addComponent(i, E)
    E[i] = 1
  }

  for(let i = 0; i < 1000; i++) {
    sysA()
    sysB()
    sysC()
    sysD()
    sysE()
  }

  return () => {
    sysA()
    sysB()
    sysC()
    sysD()
    sysE()
  }
}
