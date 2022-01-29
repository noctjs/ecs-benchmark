import { World } from "uecs";

function A() {}
function B() {}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    world.create(new A());
  }

  return () => {
    world.view(A).each((entity) => {
      world.emplace(entity, new B());
    });

    world.view(B).each((entity) => {
      world.remove(entity, B);
    });
  };
};
