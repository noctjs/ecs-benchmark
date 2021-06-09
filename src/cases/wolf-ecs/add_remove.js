import {ECS, types} from "wolf-ecs"

export default function(n) {
  const ecs = new ECS()

  ecs.defineComponent("A", types.u32)
  ecs.defineComponent("B", types.u32)

  const qA = ecs.createQuery("A")
  const qB = ecs.createQuery("B")

  function add() {
    for(let i = 0, l = qA.archetypes.length; i < l; i++) {
      const ent = qA.archetypes[i].entities
      for(let j = ent.length; j > 0; j--) {
        ecs.addComponent(ent[j - 1], "B")
      }
    }
  }

  function remove() {
    for(let i = 0, l = qB.archetypes.length; i < l; i++) {
      const ent = qB.archetypes[i].entities
      for(let j = ent.length; j > 0; j--) {
        ecs.removeComponent(ent[j - 1], "B")
      }
    }
  }

  for(let i = 0; i < n; i++) {
    ecs.createEntity()
    ecs.addComponent(i, "A")
  }

  return () => {
    add()
    remove()
  }
}
