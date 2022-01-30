import { ECS } from "wolf-ecs";

export default (count) => {
  const ecs = new ECS();

  const A = ecs.defineComponent();
  const B = ecs.defineComponent();

  const qA = ecs.createQuery(A);
  function create(lB) {
    for (let i = 0, l = qA.archetypes.length; i < l; i++) {
      const arch = qA.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        ecs.addComponent(ecs.createEntity(), lB);
      }
    }
  }

  const qB = ecs.createQuery(B);
  function destroy() {
    for (let i = 0, l = qB.archetypes.length; i < l; i++) {
      const arch = qB.archetypes[i].entities;
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.destroyEntity(arch[j]);
      }
    }
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity();
    ecs.addComponent(i, A);
  }

  return () => {
    create(B);
    destroy();
  };
};
