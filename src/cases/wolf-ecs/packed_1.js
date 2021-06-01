import {ECS, types} from "wolf-ecs"

export default function(n) {
  const ecs = new ECS()

  ecs.defineComponent("A", types.u32)
  ecs.defineComponent("B", types.u32)
  ecs.defineComponent("C", types.u32)
  ecs.defineComponent("D", types.u32)
  ecs.defineComponent("E", types.u32)

  const q = ecs.createQuery("A")

  function sys() {
    const A = ecs.components.A
    for(let i = 0, l = q.archetypes.length; i < l; i++) {
      const arch = q.archetypes[i].entities
      for(let j = 0, l = arch.length; j < l; j++) {
        A[arch[j]] *= 2
      }
    }
  }

  for(let i = 0; i < n; i++) {
    ecs.createEntity()
    ecs.addComponent(i, "A")
    ecs.components.A[i] = 1
    ecs.addComponent(i, "B")
    ecs.components.B[i] = 1
    ecs.addComponent(i, "C")
    ecs.components.C[i] = 1
    ecs.addComponent(i, "D")
    ecs.components.D[i] = 1
    ecs.addComponent(i, "E")
    ecs.components.E[i] = 1
  }

  return () => {
    sys()
  }
}
