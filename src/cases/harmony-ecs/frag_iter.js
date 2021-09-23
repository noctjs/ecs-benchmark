import {
  formats,
  makeBinarySchema,
  makeEntity,
  makeQuery,
  makeWorld,
} from "harmony-ecs";

export default (count) => {
  const COMPS = 26;
  const schemas = [];
  const world = makeWorld(count);

  for (let i = 0; i < COMPS; i++) {
    schemas.push(makeBinarySchema(world, formats.float64));
  }

  const Data = makeBinarySchema(world, formats.float64);
  const qdata = makeQuery(world, [Data]);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < COMPS; j++) {
      makeEntity(world, [schemas[j], Data]);
    }
  }

  return () => {
    for (let i = 0; i < qdata.length; i++) {
      const [e, [d]] = qdata[i];
      for (let j = 0; j < e.length; j++) {
        d[j] *= 2;
      }
    }
  };
};
