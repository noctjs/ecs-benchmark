import { Component, World } from "@jakeklassen/ecs";

class A extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

class B extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

class C extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

class D extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

class E extends Component {
  constructor(value) {
    super();
    this.value = value;
  }
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    let e1 = world.createEntity();
    let e2 = world.createEntity();
    let e3 = world.createEntity();
    let e4 = world.createEntity();

    world.addEntityComponents(e1, new A(0), new B(1));
    world.addEntityComponents(e2, new A(0), new B(1), new C(2));
    world.addEntityComponents(e3, new A(0), new B(1), new C(2), new D(3));
    world.addEntityComponents(e4, new A(0), new B(1), new C(2), new E(4));
  }

  return () => {
    for (let comps of world.view(A, B).values()) {
      let a = comps.get(A);
      let b = comps.get(B);
      let x = a.value;
      a.value = b.value;
      b.value = x;
    }

    for (let comps of world.view(C, D).values()) {
      let c = comps.get(C);
      let d = comps.get(D);
      let x = c.value;
      c.value = d.value;
      d.value = x;
    }

    for (let comps of world.view(C, E).values()) {
      let c = comps.get(C);
      let e = comps.get(E);
      let x = c.value;
      c.value = e.value;
      e.value = x;
    }
  };
};
