import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1, C: 1, D: 1, E: 1 });
  }

  ecs.flush();

  const withA = ecs.archetype("A");

  return () => {
    for (const entity of ecs.get(withA)) {
      entity.A *= 2;
    }
  };
};
