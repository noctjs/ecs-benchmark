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
  const qab = makeQuery(world, [A, B]);
  const qcd = makeQuery(world, [C, D]);
  const qce = makeQuery(world, [C, E]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A, B], [{ x: 0 }, { x: 1 }]);
    makeEntity(world, [A, B, C], [{ x: 0 }, { x: 1 }, { x: 2 }]);
    makeEntity(world, [A, B, C, D], [{ x: 0 }, { x: 1 }, { x: 2 }, { x: 3 }]);
    makeEntity(world, [A, B, C, E], [{ x: 0 }, { x: 1 }, { x: 2 }, { x: 4 }]);
  }

  return () => {
    for (let i = 0; i < qab.length; i++) {
      const [e, [a, b]] = qab[i];
      for (let j = 0; j < e.length; j++) {
        const x = a[j].x;
        a[j].x = b[j].x;
        b[j].x = x;
      }
    }
    for (let i = 0; i < qcd.length; i++) {
      const [e, [c, d]] = qcd[i];
      for (let j = 0; j < e.length; j++) {
        const x = c[j].x;
        c[j].x = d[j].x;
        d[j].x = x;
      }
    }
    for (let i = 0; i < qce.length; i++) {
      const [e, [c, _e]] = qce[i];
      for (let j = 0; j < e.length; j++) {
        const x = c[j].x;
        c[j].x = _e[j].x;
        _e[j].x = x;
      }
    }
  };
};
