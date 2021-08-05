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

  class C {
    static schema = {
      value: Type.int32,
    };
  }

  class D {
    static schema = {
      value: Type.int32,
    };
  }

  class E {
    static schema = {
      value: Type.int32,
    };
  }

  class ASystem extends System {
    entities = this.query((q) => q.current.with(A).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(A).value *= 2;
      }
    }
  }

  class BSystem extends System {
    entities = this.query((q) => q.current.with(B).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(B).value *= 2;
      }
    }
  }

  class CSystem extends System {
    entities = this.query((q) => q.current.with(C).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(C).value *= 2;
      }
    }
  }

  class DSystem extends System {
    entities = this.query((q) => q.current.with(D).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(D).value *= 2;
      }
    }
  }

  class ESystem extends System {
    entities = this.query((q) => q.current.with(E).write);

    execute() {
      for (const entity of this.entities.current) {
        entity.write(E).value *= 2;
      }
    }
  }

  const world = await World.create({
    maxEntities: count,
    defs: [A, B, C, D, E, ASystem, BSystem, CSystem, DSystem, ESystem],
  });

  for (let i = 0; i < count; i++) {
    world.createEntity(
      A,
      { value: 0 },
      B,
      { value: 0 },
      C,
      { value: 0 },
      D,
      { value: 0 },
      E,
      { value: 0 }
    );
  }

  return () => {
    world.execute();
  };
};
