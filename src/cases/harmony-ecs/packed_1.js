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
  const qa = makeQuery(world, [A]);

  for (let i = 0; i < count; i++) {
    makeEntity(world, [A, B, C, D, E]);
  }

  return () => {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        a[j] *= 2;
      }
    }
  };
};
