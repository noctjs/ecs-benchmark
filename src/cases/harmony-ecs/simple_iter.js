import {
  formats,
  makeBinarySchema,
  makeEntity,
  makeQuery,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const world = makeWorld(count);
  const A = makeBinarySchema(world, formats.float64);
  const B = makeBinarySchema(world, formats.float64);
  const C = makeBinarySchema(world, formats.float64);
  const D = makeBinarySchema(world, formats.float64);
  const E = makeBinarySchema(world, formats.float64);
  const qab = makeQuery(world, [A, B]);
  const qcd = makeQuery(world, [C, D]);
  const qce = makeQuery(world, [C, E]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A, B], [0, 1]);
    makeEntity(world, [A, B, C], [0, 1, 2]);
    makeEntity(world, [A, B, C, D], [0, 1, 2, 3]);
    makeEntity(world, [A, B, C, E], [0, 1, 2, 4]);
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
