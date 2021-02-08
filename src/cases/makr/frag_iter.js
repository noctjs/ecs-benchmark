import makr from "makr";

const COMPS = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  () =>
    function (value) {
      this.value = value;
    }
);

function Data(value) {
  this.value = value;
}

export default (count) => {
  let em = makr(Data, ...COMPS);

  for (let i = 0; i < count; i++) {
    for (let Comp of COMPS) {
      let e = em.create();
      e.add(new Data(0));
      e.add(new Comp(0));
    }
  }

  return () => {
    for (let entity of em.query(Data)) {
      let data = entity.get(Data);
      data.value *= 2;
    }
  };
};
