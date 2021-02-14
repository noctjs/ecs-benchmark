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
    world.addEntityComponents(
      world.createEntity(),
      new A(0),
      new B(0),
      new C(0),
      new D(0),
      new E(0)
    );
  }

  return () => {
    for (let comps of world.view(A).values()) {
      comps.get(A).value *= 2;
    }

    for (let comps of world.view(B).values()) {
      comps.get(B).value *= 2;
    }

    for (let comps of world.view(C).values()) {
      comps.get(C).value *= 2;
    }

    for (let comps of world.view(D).values()) {
      comps.get(D).value *= 2;
    }

    for (let comps of world.view(E).values()) {
      comps.get(E).value *= 2;
    }
  };
};
