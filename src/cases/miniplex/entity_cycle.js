import { World } from "miniplex";

export default (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1 });
  }

  const withB = ecs.archetype("B");

  return () => {
    for (let i = ecs.entities.length; i > 0; i--) {
      ecs.createEntity({ B: 1 });
    }

    for (let i = withB.entities.length; i > 0; i--) {
      const entity = withB.entities[i - 1];
      ecs.destroyEntity(entity);
    }
  };
};
