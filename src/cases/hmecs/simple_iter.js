import { createECS } from "hmecs";

export default async (count) => {
  const ecs = createECS();

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1, C: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1, C: 1, D: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.addComponent({ A: 1, B: 1, C: 1, E: 1 });
  }

  ecs.flush();

  const withAB = ecs.archetype("A", "B");
  const withCD = ecs.archetype("C", "D");
  const withCE = ecs.archetype("C", "E");

  return () => {
    for (const entity of ecs.get(withAB)) {
      [entity.A, entity.B] = [entity.B, entity.A];
    }

    for (const entity of ecs.get(withCD)) {
      [entity.C, entity.D] = [entity.D, entity.C];
    }

    for (const entity of ecs.get(withCE)) {
      [entity.C, entity.E] = [entity.E, entity.C];
    }
  };
};
