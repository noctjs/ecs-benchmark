import { createEntitySystem, World } from "piecs/dist/index.mjs";

export default function createAddRemove(count) {
  const world = new World();
  const A = world.createComponentId();
  const B = world.createComponentId();
  const prefabA = world.prefabricate([A]);

  world
    .registerSystem(
      createEntitySystem(
        function addB(entities, world) {
          for (let i = entities.length - 1; i >= 0; i--) {
            world.addComponent(entities[i], B);
          }
        },
        (q) => q.every(A)
      )
    )
    .registerSystem(
      createEntitySystem(
        function removeB(entities, world) {
          for (let i = entities.length - 1; i >= 0; i--) {
            world.removeComponent(entities[i], B);
          }
        },
        (q) => q.every(B)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    world.createEntity(prefabA);
  }

  return function addRemove() {
    world.update();
  };
}
