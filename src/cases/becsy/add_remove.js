import { System, Type, World } from "@lastolivegames/becsy/perf.js";

export default async (count) => {
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
    entities = this.query((q) => q.current.with(A).but.without(B).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.add(B, { value: 0 });
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
    world.createEntity(A, { value: 0 });
  }

  return () => {
    world.execute();
  };
};
