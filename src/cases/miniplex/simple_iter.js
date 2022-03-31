import { World } from "miniplex";

export default async (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1, B: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1, B: 1, C: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1, B: 1, C: 1, D: 1 });
  }

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1, B: 1, C: 1, E: 1 });
  }

  const withAB = ecs.archetype("A", "B");
  const withCD = ecs.archetype("C", "D");
  const withCE = ecs.archetype("C", "E");

  return () => {
    for (const entity of withAB.entities) {
      [entity.A, entity.B] = [entity.B, entity.A];
    }

    for (const entity of withCD.entities) {
      [entity.C, entity.D] = [entity.D, entity.C];
    }

    for (const entity of withCE.entities) {
      [entity.C, entity.E] = [entity.E, entity.C];
    }
  };
};
