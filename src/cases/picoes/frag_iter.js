import { World } from "picoes";

const COMPS = "abcdefghijklmnopqrstuvwxyz";

function Box(value = 0) {
  this.value = value;
}

function Data(value = 0) {
  this.value = value;
}

export default (count) => {
  let world = new World();

  for (let comp of COMPS) {
    world.component(comp, Box);
  }

  world.component("data", Data);

  for (let i = 0; i < count; i++) {
    for (let comp of COMPS) {
      world.entity().set(comp, 0).set("data", 0);
    }
  }

  return () => {
    world.each("data", ({ data }) => {
      data.value *= 2;
    });

    world.each("z", ({ z }) => {
      z.value *= 2;
    });
  };
};
