import { Entity, Format, Query, Schema, World } from "harmony-ecs";

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.float64);
  const B = Schema.makeBinary(world, Format.float64);
  const C = Schema.makeBinary(world, Format.float64);
  const D = Schema.makeBinary(world, Format.float64);
  const E = Schema.makeBinary(world, Format.float64);
  const qa = Query.make(world, [A]);
  const qb = Query.make(world, [B]);
  const qc = Query.make(world, [C]);
  const qd = Query.make(world, [D]);
  const qe = Query.make(world, [E]);

  for (let i = 0; i < count; i++) {
    Entity.make(world, [A, B, C, D, E]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        a[j] *= 2;
      }
    }
    for (let i = 0; i < qb.length; i++) {
      const [e, [b]] = qb[i];
      for (let j = 0; j < e.length; j++) {
        b[j] *= 2;
      }
    }
    for (let i = 0; i < qc.length; i++) {
      const [e, [c]] = qc[i];
      for (let j = 0; j < e.length; j++) {
        c[j] *= 2;
      }
    }
    for (let i = 0; i < qd.length; i++) {
      const [e, [d]] = qd[i];
      for (let j = 0; j < e.length; j++) {
        d[j] *= 2;
      }
    }
    for (let i = 0; i < qe.length; i++) {
      const [e, [_e]] = qe[i];
      for (let j = 0; j < e.length; j++) {
        _e[j] *= 2;
      }
    }
  };
};
