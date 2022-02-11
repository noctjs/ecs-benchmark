import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1 });
  }

  ecs.flush();

  const withB = ecs.archetype("B");

  return () => {
    for (const entity in ecs.entities) {
      ecs.addEntity({ B: 1 });
    }

    ecs.flush();

    for (const entity in ecs.get(withB)) {
      ecs.removeEntity(entity);
    }

    ecs.flush();
  };
};
