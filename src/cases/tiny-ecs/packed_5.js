import pkg from "tiny-ecs";

const { EntityManager } = pkg;

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

function C(value) {
  this.value = value;
}

function D(value) {
  this.value = value;
}

function E(value) {
  this.value = value;
}

export default (count) => {
  let ecs = new EntityManager();

  for (let i = 0; i < count; i++) {
    ecs
      .createEntity()
      .addComponent(A)
      .addComponent(B)
      .addComponent(C)
      .addComponent(D)
      .addComponent(E);
  }

  return () => {
    for (let entity of ecs.queryComponents([A])) {
      entity.a.value *= 2;
    }

    for (let entity of ecs.queryComponents([B])) {
      entity.b.value *= 2;
    }

    for (let entity of ecs.queryComponents([C])) {
      entity.c.value *= 2;
    }

    for (let entity of ecs.queryComponents([D])) {
      entity.d.value *= 2;
    }

    for (let entity of ecs.queryComponents([E])) {
      entity.e.value *= 2;
    }
  };
};
