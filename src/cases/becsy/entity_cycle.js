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

  class SpawnB extends System {
    entities = this.query((q) => q.all.with(A).also.using(B).write);

    execute() {
      for (const entity of this.entities.all) {
        const value = entity.read(A).value;
        this.createEntity(B, { value });
        this.createEntity(B, { value });
      }
    }
  }

  class KillB extends System {
    entities = this.query((q) => q.all.with(B).write);

    execute() {
      for (const entity of this.entities.all) {
        entity.delete();
      }
    }
  }

  const world = new World({
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
