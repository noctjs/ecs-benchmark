import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  ecs.defineComponent("A", types.u32);
  ecs.defineComponent("B", types.u32);

  const qA = ecs.createQuery("A");
  const qB = ecs.createQuery("B");

  function add() {
    for (let i = 0, l = qA.archetypes.length; i < l; i++) {
      for (let j of qA.archetypes[i].entities) {
        ecs.addComponent(j, "B");
      }
    }
  }

  function remove() {
    for (let i = 0, l = qB.archetypes.length; i < l; i++) {
      for (let j of qB.archetypes[i].entities) {
        ecs.removeComponent(j, "B");
      }
    }
  }

  for (let i = 0; i < n; i++) {
    ecs.createEntity();
    ecs.addComponent(i, "A");
  }

  return () => {
    add();
    remove();
  };
}
