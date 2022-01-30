import { createEntitySystem, World } from "piecs/dist/index.mjs";

export default function createEntityCycle(count) {
  const world = new World();
  const A = world.createComponentId();
  const B = world.createComponentId();

  const prefabA = world.prefabricate([A]);
  const prefabB = world.prefabricate([B]);

  world
    .registerSystem(
      createEntitySystem(
        function spawnBs(entities, world) {
          for (let i = 0, l = entities.length; i < l; i++) {
            world.createEntity(prefabB);
          }
        },
        (q) => q.every(A)
      )
    )
    .registerSystem(
      createEntitySystem(
        function deleteBs(entities, world) {
          for (let i = entities.length - 1; i >= 0; i--) {
            world.deleteEntity(entities[i]);
          }
        },
        (q) => q.every(B)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    world.createEntity(prefabA);
  }

  return function entityCycle() {
    world.update();
  };
}
