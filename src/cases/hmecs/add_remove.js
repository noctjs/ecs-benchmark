import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  for (let i = 0; i < count; i++) {
    ecs.addEntity({ A: true });
  }

  ecs.flush();

  return () => {
    for (const entity of ecs.entities) {
      ecs.addComponent(entity, { B: true });
    }

    for (const entity of ecs.entities) {
      ecs.removeComponent(entity, "B");
    }

    ecs.flush();
  };
};
