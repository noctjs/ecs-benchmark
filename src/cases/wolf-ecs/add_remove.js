import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  const A = ecs.defineComponent();
  const B = ecs.defineComponent();

  const qA = ecs.createQuery(A);
  function add() {
    const lB = B;
    for (let i = 0; i < qA.a.length; i++) {
      const arch = qA.a[i].e;
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.addComponent(arch[j], lB);
      }
    }
  }

  const qB = ecs.createQuery(B);
  function remove() {
    const lB = B;
    for (let i = 0; i < qB.a.length; i++) {
      const arch = qB.a[i].e;
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.removeComponent(arch[j], lB);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    ecs.createEntity();
    ecs.addComponent(i, A);
  }

  return () => {
    add();
    remove();
  };
}
