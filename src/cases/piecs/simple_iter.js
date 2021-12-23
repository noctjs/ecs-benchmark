import { World, createEntitySystem } from "piecs/dist/index.mjs";

export default function createSimpleIter(count) {
  const world = new World();
  const A = {
    id: world.createComponentId(),
    arr: new Uint32Array(count * 4).fill(0),
  };
  const B = {
    id: world.createComponentId(),
    arr: new Uint32Array(count * 4).fill(0),
  };
  const C = {
    id: world.createComponentId(),
    arr: new Uint32Array(count * 4).fill(0),
  };
  const D = {
    id: world.createComponentId(),
    arr: new Uint32Array(count * 4).fill(0),
  };
  const E = {
    id: world.createComponentId(),
    arr: new Uint32Array(count * 4).fill(0),
  };

  const prefab1 = world.prefabricate([A, B]);
  const prefab2 = world.prefabricate([A, B, C]);
  const prefab3 = world.prefabricate([A, B, C, D]);
  const prefab4 = world.prefabricate([A, B, C, E]);

  world
    .registerSystem(
      createEntitySystem(
        function systemAB(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            const entity = entities[i];
            const a = A.arr[entity];
            const b = B.arr[entity];
            A.arr[entity] = b;
            B.arr[entity] = a;
          }
        },
        (q) => q.prefabricated(prefab1)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemCD(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            const entity = entities[i];
            const c = C.arr[entity];
            const d = D.arr[entity];
            C.arr[entity] = d;
            D.arr[entity] = c;
          }
        },
        (q) => q.prefabricated(prefab3)
      )
    )
    .registerSystem(
      createEntitySystem(
        function systemCE(entities) {
          for (let i = 0, l = entities.length; i < l; i++) {
            const entity = entities[i];
            const c = C.arr[entity];
            const e = E.arr[entity];
            C.arr[entity] = e;
            E.arr[entity] = c;
          }
        },
        (q) => q.prefabricated(prefab4)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    world.createEntity(prefab1);
    world.createEntity(prefab2);
    world.createEntity(prefab3);
    world.createEntity(prefab4);
  }

  return function simpleIter() {
    world.update();
  };
}
