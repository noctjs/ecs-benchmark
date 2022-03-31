import { World } from "miniplex";

export default (count) => {
  const ecs = new World();

  for (let i = 0; i < count; i++) {
    ecs.createEntity({ A: 1 });
  }

  const withA = ecs.archetype("A");
  const withB = ecs.archetype("B");

  return () => {
    for (const entity in withA.entities) {
      ecs.createEntity({ B: 1 });
    }

    for (const entity in withB.entities) {
      ecs.destroyEntity(entity);
    }
  };
};
