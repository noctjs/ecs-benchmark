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
    let e1 = ecs.createEntity();
    let e2 = ecs.createEntity();
    let e3 = ecs.createEntity();
    let e4 = ecs.createEntity();

    e1.addComponent(A).addComponent(B);
    e2.addComponent(A).addComponent(B).addComponent(C);
    e3.addComponent(A).addComponent(B).addComponent(C).addComponent(D);
    e4.addComponent(A).addComponent(B).addComponent(C).addComponent(E);

    e1.b.value = e2.b.value = e3.b.value = e4.b.value = 1;
    e2.c.value = e3.c.value = e4.c.value = 2;
    e3.d.value = 3;
    e4.e.value = 4;
  }

  return () => {
    for (let entity of ecs.queryComponents([A, B])) {
      let x = entity.a.value;
      entity.a.value = entity.b.value;
      entity.b.value = x;
    }

    for (let entity of ecs.queryComponents([C, D])) {
      let x = entity.c.value;
      entity.c.value = entity.d.value;
      entity.d.value = x;
    }

    for (let entity of ecs.queryComponents([C, E])) {
      let x = entity.c.value;
      entity.c.value = entity.e.value;
      entity.e.value = x;
    }
  };
};
