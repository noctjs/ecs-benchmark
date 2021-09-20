import pkg from "tiny-ecs";

const { EntityManager } = pkg;

function A() {}
function B() {}

export default (count) => {
  let ecs = new EntityManager();

  for (let i = 0; i < count; i++) {
    ecs.createEntity().addComponent(A);
  }

  return () => {
    for (let entity of ecs.queryComponents([A])) {
      entity.addComponent(B);
    }

    for (let entity of ecs.queryComponents([B])) {
      entity.removeComponent(B);
    }
  };
};
