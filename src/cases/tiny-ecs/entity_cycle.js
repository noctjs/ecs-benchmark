import pkg from "tiny-ecs";

const { EntityManager } = pkg;

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

export default (count) => {
  let ecs = new EntityManager();

  for (let i = 0; i < count; i++) {
    ecs.createEntity().addComponent(A);
  }

  return () => {
    for (let entity of ecs.queryComponents([A])) {
      let value = entity.a.value;
      ecs.createEntity().addComponent(B).value = value;
      ecs.createEntity().addComponent(B).value = value;
    }

    for (let entity of ecs.queryComponents([B])) {
      entity.remove();
    }
  };
};
