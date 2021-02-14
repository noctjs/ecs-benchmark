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
    let e1 = em.create();
    e1.add(new A(0));
    e1.add(new B(1));

    let e2 = em.create();
    e2.add(new A(0));
    e2.add(new B(1));
    e2.add(new C(2));

    let e3 = em.create();
    e3.add(new A(0));
    e3.add(new B(1));
    e3.add(new C(2));
    e3.add(new D(3));

    let e4 = em.create();
    e4.add(new A(0));
    e4.add(new B(1));
    e4.add(new C(2));
    e4.add(new E(4));
  }

  return () => {
    for (let entity of em.query(A, B)) {
      let a = entity.get(A);
      let b = entity.get(B);
      let x = a.value;
      a.value = b.value;
      b.value = x;
    }

    for (let entity of em.query(C, D)) {
      let c = entity.get(C);
      let d = entity.get(D);
      let x = c.value;
      c.value = d.value;
      d.value = x;
    }

    for (let entity of em.query(C, E)) {
      let c = entity.get(C);
      let e = entity.get(E);
      let x = c.value;
      c.value = e.value;
      e.value = x;
    }
  };
};
