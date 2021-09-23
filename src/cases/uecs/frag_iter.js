import { World } from "uecs";

const COMPS = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ", (name) =>
  Function(`
    return function ${name} (value) {
      this.value = value;
    }
  `)()
);

const Z = COMPS[25];

function Data(value = 0) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      world.create(new Data(0), new Comp(0));
    }
  }

  return () => {
    world.view(Data).each((entity, data) => {
      data.value *= 2;
    });
    world.view(Z).each((entity, z) => {
      z.value *= 2;
    });
  };
};
