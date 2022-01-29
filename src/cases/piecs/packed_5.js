import { createEntitySystem, World } from "piecs/dist/index.mjs";

export default function createPacked5(count) {
  const world = new World();

  const A = {
    id: world.createComponentId(),
    arr: new Uint32Array(count).fill(1),
  };
  const B = {
    id: world.createComponentId(),
    arr: new Uint32Array(count).fill(1),
  };
  const C = {
    id: world.createComponentId(),
    arr: new Uint32Array(count).fill(1),
  };
  const D = {
    id: world.createComponentId(),
    arr: new Uint32Array(count).fill(1),
  };
  const E = {
    id: world.createComponentId(),
    arr: new Uint32Array(count).fill(1),
  };

  const prefab = world.prefabricate([A, B, C, D, E]);

  world
    .registerSystem(
      createEntitySystem(
        function systemAp5(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            A.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(A)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemBp5(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            B.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(B)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemCp5(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            C.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(C)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemDp5(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            D.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(D)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemEp5(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            E.arr[entities[i]] *= 2;
          }
        },
        (q) => q.every(E)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    world.createEntity(prefab);
  }

  return function packed5() {
    world.update();
  };
}
