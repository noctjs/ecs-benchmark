import {ECS, types} from "wolf-ecs"

export default function(n) {
  const ecs = new ECS()

  ecs.defineComponent("A")
  ecs.defineComponent("B")

  const qA = ecs.createQuery("A")
  const qB = ecs.createQuery("B")

  function create() {
    for(let i = 0, l = qA.archetypes.length; i < l; i++) {
      for(let j = 0, l = qA.archetypes[i].entities.length; j < l; j++) {
        const id = ecs.createEntity()
        ecs.addComponent(id, "B")
        const id2 = ecs.createEntity()
        ecs.addComponent(id2, "B")
      }
    }
  }

  function destroy() {
    for(let i = 0, l = qB.archetypes.length; i < l; i++) {
      const ent = qB.archetypes[i].entities
      for(let j = ent.length; j > 0; j--) {
        ecs.destroyEntity(ent[j - 1])
      }
    }
  }

  for(let i = 0; i < n; i++) {
    ecs.createEntity()
    ecs.addComponent(i, "A")
    ecs.components.A[i] = 1
  }

  create()
  destroy()

  return () => {
    create()
    destroy()
  }
}
