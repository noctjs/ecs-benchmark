import { World } from "uecs";

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    world.create(new A(0));
  }

  return () => {
    world.view(A).each((entity) => {
      world.emplace(entity, new B(0));
    });

    world.view(B).each((entity) => {
      world.remove(entity, B);
    });
  };
};
