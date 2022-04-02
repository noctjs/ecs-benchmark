import { World } from "miniplex";

export default (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1 });
  }

  const withA = ecs.archetype("A");
  const withB = ecs.archetype("B");

  return () => {
    for (const entity of withA.entities) {
      ecs.createEntity({ B: 1 });
    }

    for (let i = withB.entities.length; i > 0; i--) {
      const entity = withB.entities[i - 1];
      ecs.destroyEntity(entity);
    }
  };
};
