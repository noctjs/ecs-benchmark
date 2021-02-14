import {
  Component,
  ECS,
  EntityViewFactory,
  makeComponent,
  System,
} from "perform-ecs";

class A extends Component {
  reset(obj, a) {
    obj.a = a;
  }
}

class B extends Component {
  reset(obj, b) {
    obj.b = b;
  }
}

class C extends Component {
  reset(obj, c) {
    obj.c = c;
  }
}

class D extends Component {
  reset(obj, d) {
    obj.d = d;
  }
}

class E extends Component {
  reset(obj, e) {
    obj.e = e;
  }
}

makeComponent(A);
makeComponent(B);
makeComponent(C);
makeComponent(D);
makeComponent(E);

class ASystem extends System {
  view = EntityViewFactory.createView({
    components: [A],
  });

  update() {
    for (let entity of this.view.entities) {
      entity.a *= 2;
    }
  }
}

export default (count) => {
  let ecs = new ECS();

  ecs.registerSystem(new ASystem());

  for (let i = 0; i < count; i++) {
    ecs.createEntity([
      { component: A, args: [0] },
      { component: B, args: [0] },
      { component: C, args: [0] },
      { component: D, args: [0] },
      { component: E, args: [0] },
    ]);
  }

  return () => {
    ecs.update(0);
  };
};
