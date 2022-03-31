import { World } from "miniplex";

export default async (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.addEntity({ A: 1 });
  }

  const withB = ecs.archetype("B");

  return () => {
    for (const entity in ecs.entities) {
      ecs.addEntity({ B: 1 });
    }

    for (const entity in ecs.get(withB)) {
      ecs.removeEntity(entity);
    }
  };
};
