import { ECS, types } from "wolf-ecs";

export default function (n) {
  const ecs = new ECS();

  for (let i = 0; i < 26; i++) {
    ecs.defineComponent(i.toString(), types.u8);
  }
  ecs.defineComponent("data", types.u32);

  const q = ecs.createQuery("data");

  function sys() {
    const data = ecs.components.data;
    for (let i = 0, l = q.archetypes.length; i < l; i++) {
      const arch = q.archetypes[i].entities;
      for (let i = 0, l = arch.length; i < l; i++) {
        data[arch[i]] *= 2;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let i = 0; i < 26; i++) {
      const id = ecs.createEntity();
      ecs.addComponent(id, i.toString());
      ecs.addComponent(id, "data");
      ecs.components.data[id] = 1;
    }
  }

  return () => {
    sys();
  };
}
