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

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    world.addEntityComponents(world.createEntity(), new A(0), new B(0));
  }

  return () => {
    for (let comps of world.view().values()) {
      comps.set(new B(0));
    }

    for (let comps of world.view(B).values()) {
      comps.remove(B);
    }
  };
};
