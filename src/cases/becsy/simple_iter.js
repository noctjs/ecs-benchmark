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

  class ABSystem extends System {
    entities = this.query((q) => q.current.with(A).write.with(B).write);

    execute() {
      for (const entity of this.entities.current) {
        const a = entity.write(A);
        const b = entity.write(B);
        const x = a.value;
        a.value = b.value;
        b.value = x;
      }
    }
  }

  class CDSystem extends System {
    entities = this.query((q) => q.current.with(C).write.with(D).write);

    execute() {
      for (const entity of this.entities.current) {
        const c = entity.write(C);
        const d = entity.write(D);
        const x = c.value;
        c.value = d.value;
        d.value = x;
      }
    }
  }

  class CESystem extends System {
    entities = this.query((q) => q.current.with(C).write.with(E).write);

    execute() {
      for (const entity of this.entities.current) {
        const c = entity.write(C);
        const e = entity.write(E);
        const x = c.value;
        c.value = e.value;
        e.value = x;
      }
    }
  }

  const world = await World.create({
    maxEntities: count * 4,
    defs: [A, B, C, D, E, ABSystem, CDSystem, CESystem],
  });

  for (let i = 0; i < count; i++) {
    world.createEntity(A, { value: 0 }, B, { value: 1 });
    world.createEntity(A, { value: 0 }, B, { value: 1 }, C, { value: 2 });
    world.createEntity(A, { value: 0 }, B, { value: 1 }, C, { value: 2 }, D, {
      value: 3,
    });
    world.createEntity(A, { value: 0 }, B, { value: 1 }, C, { value: 2 }, E, {
      value: 4,
    });
  }

  return () => {
    world.execute();
  };
};
