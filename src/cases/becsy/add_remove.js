import { System, World } from "@lastolivegames/becsy/perf.js";

export default async (count) => {
  class A {
    static schema = {};
  }

  class B {
    static schema = {};
  }

  class AddB extends System {
    entities = this.query((q) => q.current.with(A).but.without(B).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.add(B);
      }
    }
  }

  class RemoveB extends System {
    entities = this.query((q) => q.current.with(B).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.remove(B);
      }
    }
  }

  const world = await World.create({
    maxEntities: count,
    maxShapeChangesPerFrame: count * 3,
    defs: [A, B, AddB, RemoveB],
  });

  for (let i = 0; i < count; i++) {
    world.createEntity(A);
  }

  return () => {
    world.execute();
  };
};
