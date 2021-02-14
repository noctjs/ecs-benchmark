import makr from "makr";

function A(value) {
  this.value = value;
}

function B(value) {
  this.value = value;
}

function C(value) {
  this.value = value;
}

function D(value) {
  this.value = value;
}

function E(value) {
  this.value = value;
}

export default (count) => {
  let em = makr(A, B, C, D, E);

  for (let i = 0; i < count; i++) {
    let e = em.create();
    e.add(new A(0));
    e.add(new B(0));
    e.add(new C(0));
    e.add(new D(0));
    e.add(new E(0));
  }

  return () => {
    for (let entity of em.query(A)) {
      entity.get(A).value *= 2;
    }
  };
};
