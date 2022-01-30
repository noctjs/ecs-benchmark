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
    world.view(A).each((entity, a) => {
      world.create(new B(a.value));
    });

    world.view(B).each((entity) => {
      world.destroy(entity);
    });
  };
};
