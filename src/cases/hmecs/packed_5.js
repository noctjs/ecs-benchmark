import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1, C: 1, D: 1, E: 1 });
  }

  ecs.flush();

  const withA = ecs.archetype("A");
  const withB = ecs.archetype("B");
  const withC = ecs.archetype("C");
  const withD = ecs.archetype("D");
  const withE = ecs.archetype("E");

  return () => {
    for (const entity of ecs.get(withA)) {
      entity.A *= 2;
    }

    for (const entity of ecs.get(withB)) {
      entity.B *= 2;
    }

    for (const entity of ecs.get(withC)) {
      entity.C *= 2;
    }

    for (const entity of ecs.get(withD)) {
      entity.D *= 2;
    }

    for (const entity of ecs.get(withE)) {
      entity.E *= 2;
    }
  };
};
