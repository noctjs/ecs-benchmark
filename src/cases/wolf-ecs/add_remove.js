import { ECS } from "wolf-ecs";

export default (count) => {
  const ecs = new ECS();

  const A = ecs.defineComponent();
  const B = ecs.defineComponent();

  const qA = ecs.createQuery(A);
  function add(lB) {
    for (let i = 0; i < qA.length; i++) {
      const arch = qA[i];
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.addComponent(arch[j], lB);
      }
    }
  }

  const qB = ecs.createQuery(B);
  function remove(lB) {
    for (let i = 0; i < qB.length; i++) {
      const arch = qB[i];
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.removeComponent(arch[j], lB);
      }
    }
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity();
    ecs.addComponent(i, A);
  }

  return () => {
    add(B);
    remove(B);
  };
};
