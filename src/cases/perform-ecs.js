import {
  Component,
  ECS,
  EntityViewFactory,
  makeComponent,
  System,
} from "perform-ecs";

class PositionComponent extends Component {
  reset(obj, x, y) {
    obj.x = x;
    obj.y = y;
  }
}

class VelocityComponent extends Component {
  reset(obj, dx, dy) {
    obj.dx = dx;
    obj.dy = dy;
  }
}

class AnimationComponent extends Component {
  reset(obj, length) {
    obj.frame = 0;
    obj.length = length;
  }
}

class RenderComponent extends Component {
  reset(obj, sprite) {
    obj.sprite = sprite;
  }
}

makeComponent(PositionComponent);
makeComponent(VelocityComponent);
makeComponent(AnimationComponent);
makeComponent(RenderComponent);

class MovementSystem extends System {
  view = EntityViewFactory.createView({
    components: [PositionComponent, VelocityComponent],
  });

  update() {
    for (let entity of this.view.entities) {
      entity.x += entity.dx;
      entity.y += entity.dy;
    }
  }
}

class AnimationSystem extends System {
  view = EntityViewFactory.createView({
    components: [AnimationComponent],
  });

  update() {
    for (let entity of this.view.entities) {
      entity.frame = (entity.frame + 1) % entity.length;
    }
  }
}

class RenderingSystem extends System {
  view = EntityViewFactory.createView({
    components: [PositionComponent, RenderComponent],
  });

  update() {
    for (let entity of this.view.entities) {
      if (!entity.sprite) throw new Error();
    }
  }
}

let ent_a = [{ component: PositionComponent, args: [0, 0] }];
let ent_b = ent_a.concat({ component: RenderComponent, args: ["a"] });
let ent_c = ent_b.concat({ component: AnimationComponent, args: [5] });
let ent_d = ent_c.concat({ component: VelocityComponent, args: [0, 0] });

function create_entities(ecs, count) {
  let entities = [];

  for (let i = 0; i < count; i++) {
    entities.push(
      ecs.createEntity(ent_a),
      ecs.createEntity(ent_b),
      ecs.createEntity(ent_c),
      ecs.createEntity(ent_d)
    );
  }

  return entities;
}

export const name = "perform-ecs";

export function bench_create_delete(count) {
  let ecs = new ECS();

  return () => {
    for (let entity of create_entities(ecs, count)) {
      ecs.removeEntity(entity);
    }
  };
}

export function bench_update(count) {
  let ecs = new ECS();

  ecs.registerSystem(new MovementSystem());
  ecs.registerSystem(new AnimationSystem());
  ecs.registerSystem(new RenderingSystem());

  create_entities(ecs, count);

  return () => {
    ecs.update(0);
  };
}
