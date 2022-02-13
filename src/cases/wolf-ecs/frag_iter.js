import { ECS, types } from "wolf-ecs";

export default (count) => {
  const ecs = new ECS();

  const cmps = [];
  for (let i = 0; i < 26; i++) {
    cmps.push(ecs.defineComponent(types.i32));
  }

  const z = cmps[25];
  const data = ecs.defineComponent(types.i32);

  const dataQuery = ecs.createQuery(data);
  function dataSystem(lData) {
    for (let i = 0, l = dataQuery.length; i < l; i++) {
      const arch = dataQuery[i];
      for (let j = 0, l = arch.length; j < l; j++) {
        lData[arch[j]] *= 2;
      }
    }
  }

  const zQuery = ecs.createQuery(z);
  function zSystem(lZ) {
    for (let i = 0, l = zQuery.length; i < l; i++) {
      const arch = zQuery[i];
      for (let j = 0, l = arch.length; j < l; j++) {
        lZ[arch[j]] *= 2;
      }
    }
  }

  for (let i = 0; i < count; i++) {
    for (let i = 0; i < cmps.length; i++) {
      const id = ecs.createEntity();
      ecs.addComponent(id, cmps[i]);
      ecs.addComponent(id, data);
      data[id] = 0;
      cmps[i][id] = 0;
    }
  }

  return () => {
    dataSystem(data);
    zSystem(z);
  };
};
