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

  class SpawnB extends System {
    entities = this.query((q) => q.current.with(A).also.using(B).write);

    execute() {
      for (const entity of this.entities.current) {
        this.createEntity(B, {
          value: entity.read(A).value,
        });
      }
    }
  }

  class KillB extends System {
    entities = this.query((q) => q.current.with(B).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.delete();
      }
    }
  }

  const world = await World.create({
    maxEntities: count * 8,
    maxLimboEntities: 10000,
    defs: [A, B, SpawnB, KillB],
  });

  for (let i = 0; i < count; i++) {
    world.createEntity(A, { value: i });
  }

  return () => {
    world.execute();
  };
};
