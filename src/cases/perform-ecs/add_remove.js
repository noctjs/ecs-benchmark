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

class AddB extends System {
  view = EntityViewFactory.createView({
    components: [A],
  });

  update() {
    for (let entity of this.view.entities) {
      this.ecs.addComponentsToEntity(entity, [{ component: B, args: [0] }]);
    }
  }
}

class RemoveB extends System {
  view = EntityViewFactory.createView({
    components: [B],
  });

  update() {
    for (let entity of this.view.entities) {
      this.ecs.removeComponentsFromEntity(entity, B);
    }
  }
}

export default (count) => {
  let ecs = new ECS();

  ecs.registerSystem(new AddB());
  ecs.registerSystem(new RemoveB());

  for (let i = 0; i < count; i++) {
    ecs.createEntity([{ component: A, args: [0] }]);
  }

  return () => {
    ecs.update(0);
  };
};
