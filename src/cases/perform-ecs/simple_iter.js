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

class ABSystem extends System {
  view = EntityViewFactory.createView({
    components: [A, B],
  });

  update() {
    for (let entity of this.view.entities) {
      let x = entity.a;
      entity.a = entity.b;
      entity.b = x;
    }
  }
}

class CDSystem extends System {
  view = EntityViewFactory.createView({
    components: [C, D],
  });

  update() {
    for (let entity of this.view.entities) {
      let x = entity.c;
      entity.c = entity.d;
      entity.d = x;
    }
  }
}

class CESystem extends System {
  view = EntityViewFactory.createView({
    components: [C, E],
  });

  update() {
    for (let entity of this.view.entities) {
      let x = entity.c;
      entity.c = entity.e;
      entity.e = x;
    }
  }
}

export default (count) => {
  let ecs = new ECS();

  ecs.registerSystem(new ABSystem());
  ecs.registerSystem(new CDSystem());
  ecs.registerSystem(new CESystem());

  for (let i = 0; i < count; i++) {
    ecs.createEntity([
      { component: A, args: [0] },
      { component: B, args: [1] },
    ]);
    ecs.createEntity([
      { component: A, args: [0] },
      { component: B, args: [1] },
      { component: C, args: [2] },
    ]);
    ecs.createEntity([
      { component: A, args: [0] },
      { component: B, args: [1] },
      { component: C, args: [2] },
      { component: D, args: [3] },
    ]);
    ecs.createEntity([
      { component: A, args: [0] },
      { component: B, args: [1] },
      { component: C, args: [2] },
      { component: E, args: [4] },
    ]);
  }

  return () => {
    ecs.update(0);
  };
};
