import { World } from "miniplex";

export default async (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1 });
  }

  const withB = ecs.archetype("B");

  return () => {
    for (const entity in ecs.entities) {
      ecs.createEntity({ B: 1 });
    }

    for (const entity in ecs.get(withB)) {
      ecs.destroyEntity(entity);
    }
  };
};
