import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  const A = ecs.defineComponent();
  const B = ecs.defineComponent();

  const qA = ecs.createQuery(A);
  function create() {
    const lB = B;
    for (let i = 0, l = qA.a.length; i < l; i++) {
      const arch = qA.a[i].e;
      for (let j = 0, l = arch.length; j < l; j++) {
        const id = ecs.createEntity();
        ecs.addComponent(id, lB);
        const id2 = ecs.createEntity();
        ecs.addComponent(id2, lB);
      }
    }
  }

  const qB = ecs.createQuery(B);
  function destroy() {
    for (let i = 0, l = qB.a.length; i < l; i++) {
      const arch = qB.a[i].e;
      for (let j = arch.length - 1; j >= 0; j--) {
        ecs.destroyEntity(arch[j]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    ecs.createEntity();
    ecs.addComponent(i, A);
  }

  return () => {
    create();
    destroy();
  };
}
