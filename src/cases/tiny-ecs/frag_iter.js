import pkg from "tiny-ecs";

const { EntityManager } = pkg;

const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ", (name) =>
  Function(`
    return function ${name} (value = 0) {
      this.value = value;
    }
  `)()
);

function Data(value = 0) {
  this.value = value;
}

export default (count) => {
  let ecs = new EntityManager();

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      ecs.createEntity().addComponent(Data).addComponent(Comp);
    }
  }

  return () => {
    for (let entity of ecs.queryComponents([Data])) {
      entity.data.value *= 2;
    }
  };
};
