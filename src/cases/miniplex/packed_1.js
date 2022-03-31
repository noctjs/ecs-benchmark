import { World } from "miniplex";

export default async (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.addEntity({ A: 1, B: 1, C: 1, D: 1, E: 1 });
  }

  const withA = ecs.archetype("A");

  return () => {
    for (const entity of ecs.get(withA)) {
      entity.A *= 2;
    }
  };
};
