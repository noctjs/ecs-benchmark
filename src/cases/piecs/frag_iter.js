import { World, createEntitySystem } from "piecs/dist/index.mjs";

export default function createFragIter(count) {
  const world = new World();

  const components = [];
  for (let i = 0; i < 26; i++) {
    components.push(world.createComponentId());
  }
  const Z = {
    id: components[25],
    arr: new Int32Array(count),
  };
  const Data = {
    id: world.createComponentId(),
    arr: new Int32Array(count * 26),
  };

  const prefabs = components.map((c) => world.prefabricate([Data, c]));

  world
    .registerSystem(
      createEntitySystem(
        function dataSystem(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            Data.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(Data)
      )
    )
    .registerSystem(
      createEntitySystem(
        function zSystem(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            Z.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(Z)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    for (const prefab of prefabs) {
      world.createEntity(prefab);
    }
  }

  return function fragIter() {
    world.update();
  };
}
