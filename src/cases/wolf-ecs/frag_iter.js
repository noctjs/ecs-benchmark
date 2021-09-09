import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  const cmps = [];
  for (let i = 0; i < 26; i++) {
    cmps.push(ecs.defineComponent());
  }
  const data = ecs.defineComponent(types.u32);

  const q = ecs.createQuery(data);
  function sys() {
    const lData = data;
    for (let i = 0, l = q.archetypes.length; i < l; i++) {
      const arch = q.archetypes[i].entities;
      for (let j = 0, l = arch.length; j < l; j++) {
        lData[arch[j]] *= 2;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let i = 0; i < cmps.length; i++) {
      const id = ecs.createEntity();
      ecs.addComponent(id, cmps[i]);
      ecs.addComponent(id, data);
      data[id] = 1;
    }
  }

  return () => {
    sys();
  };
}
