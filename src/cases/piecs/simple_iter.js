import { createEntitySystem, World } from "piecs/dist/index.mjs";

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

  const prefabAB = world.prefabricate([A, B]);
  const prefabABC = world.prefabricate([A, B, C]);
  const prefabABCD = world.prefabricate([A, B, C, D]);
  const prefabABCE = world.prefabricate([A, B, C, E]);

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
        (q) => q.every(A, B)
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
        (q) => q.every(C, D)
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
        (q) => q.every(C, E)
      )
    )
    .initialize();

  for (let i = 0; i < count; i++) {
    world.createEntity(prefabAB);
    world.createEntity(prefabABC);
    world.createEntity(prefabABCD);
    world.createEntity(prefabABCE);
  }

  return function simpleIter() {
    world.update();
  };
}
