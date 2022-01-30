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

makeComponent(A);
makeComponent(B);

class SpawnB extends System {
  view = EntityViewFactory.createView({
    components: [A],
  });

  update() {
    for (let entity of this.view.entities) {
      this.ecs.createEntity([{ component: B, args: [entity.a] }]);
    }
  }
}

class KillB extends System {
  view = EntityViewFactory.createView({
    components: [B],
  });

  update() {
    for (let entity of this.view.entities) {
      this.ecs.removeEntity(entity);
    }
  }
}

export default (count) => {
  let ecs = new ECS();

  ecs.registerSystem(new SpawnB());
  ecs.registerSystem(new KillB());

  for (let i = 0; i < count; i++) {
    ecs.createEntity([{ component: A, args: [i] }]);
  }

  return () => {
    ecs.update(0);
  };
};
