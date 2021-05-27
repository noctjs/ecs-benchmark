import { System, Type, World } from "@lastolivegames/becsy/perf.js";

export default (count) => {
  class A {
    static schema = {
      value: Type.int32,
    };
  }

  class B {
    static schema = {
      value: Type.int32,
    };
  }

  class AddB extends System {
    entities = this.query((q) => q.all.with(A).but.without(B).write);

    execute() {
      for (const entity of this.entities.all) {
        entity.add(B, { value: 0 });
      }
    }
  }

  class RemoveB extends System {
    entities = this.query((q) => q.all.with(B).write);

    execute() {
      for (const entity of this.entities.all) {
        entity.remove(B);
      }
    }
  }

  const world = new World({
    maxEntities: count,
    maxShapeChangesPerFrame: count * 3,
    defs: [A, B, AddB, RemoveB],
  });

  for (let i = 0; i < count; i++) {
    world.createEntity(A, { value: 0 });
  }

  return () => {
    world.execute();
  };
};
