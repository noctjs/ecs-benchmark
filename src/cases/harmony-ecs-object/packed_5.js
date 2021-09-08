import {
  formats,
  makeEntity,
  makeQuery,
  makeSchema,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const world = makeWorld(count);
  const shape = { x: formats.float64 };
  const A = makeSchema(world, shape);
  const B = makeSchema(world, shape);
  const C = makeSchema(world, shape);
  const D = makeSchema(world, shape);
  const E = makeSchema(world, shape);
  const qa = makeQuery(world, [A]);
  const qb = makeQuery(world, [B]);
  const qc = makeQuery(world, [C]);
  const qd = makeQuery(world, [D]);
  const qe = makeQuery(world, [E]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A, B, C, D, E]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        a[j].x *= 2;
      }
    }
    for (let i = 0; i < qb.length; i++) {
      const [e, [b]] = qb[i];
      for (let j = 0; j < e.length; j++) {
        b[j].x *= 2;
      }
    }
    for (let i = 0; i < qc.length; i++) {
      const [e, [c]] = qc[i];
      for (let j = 0; j < e.length; j++) {
        c[j].x *= 2;
      }
    }
    for (let i = 0; i < qd.length; i++) {
      const [e, [d]] = qd[i];
      for (let j = 0; j < e.length; j++) {
        d[j].x *= 2;
      }
    }
    for (let i = 0; i < qe.length; i++) {
      const [e, [_e]] = qe[i];
      for (let j = 0; j < e.length; j++) {
        _e[j].x *= 2;
      }
    }
  };
};
