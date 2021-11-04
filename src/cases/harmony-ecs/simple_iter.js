import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.float64);
  const B = Schema.makeBinary(world, Format.float64);
  const C = Schema.makeBinary(world, Format.float64);
  const D = Schema.makeBinary(world, Format.float64);
  const E = Schema.makeBinary(world, Format.float64);
  const qab = Query.make(world, [A, B]);
  const qcd = Query.make(world, [C, D]);
  const qce = Query.make(world, [C, E]);

  for (let i = 0; i < count; i++) {
    Entity.make(world, [A, B], [0, 1]);
    Entity.make(world, [A, B, C], [0, 1, 2]);
    Entity.make(world, [A, B, C, D], [0, 1, 2, 3]);
    Entity.make(world, [A, B, C, E], [0, 1, 2, 4]);
  }

  return () => {
    for (let i = 0; i < qab.length; i++) {
      const [e, [a, b]] = qab[i];
      for (let j = 0; j < e.length; j++) {
        const x = a[j];
        a[j] = b[j];
        b[j] = x;
      }
    }
    for (let i = 0; i < qcd.length; i++) {
      const [e, [c, d]] = qcd[i];
      for (let j = 0; j < e.length; j++) {
        const x = c[j];
        c[j] = d[j];
        d[j] = x;
      }
    }
    for (let i = 0; i < qce.length; i++) {
      const [e, [c, _e]] = qce[i];
      for (let j = 0; j < e.length; j++) {
        const x = c[j];
        c[j] = _e[j];
        _e[j] = x;
      }
    }
  };
};
