import * as bitecs from "./cases/bitecs/mod.js";
import * as ecsy from "./cases/ecsy/mod.js";
import * as flock_ecs from "./cases/flock-ecs/mod.js";
import * as geotic from "./cases/geotic/mod.js";
import * as goodluck from "./cases/goodluck/mod.js";
import * as jakeklassen__ecs from "./cases/jakeklassen__ecs/mod.js";
import * as makr from "./cases/makr/mod.js";
import * as perform_ecs from "./cases/perform-ecs/mod.js";
import * as tiny_ecs from "./cases/tiny-ecs/mod.js";
import { suite } from "./suite.js";

const packed_1 = suite(`Packed (1 query)`);
const packed_5 = suite(`Packed (5 queries)`);
const add_remove = suite(`Add / Remove`);
const simple_iter = suite(`Simple Iteration`);
const frag_iter = suite(`Fragmented Iteration`);

const libraries = [
  jakeklassen__ecs,
  bitecs,
  ecsy,
  flock_ecs,
  geotic,
  goodluck,
  makr,
  perform_ecs,
  tiny_ecs,
];

const suites = [packed_1, packed_5, add_remove, simple_iter, frag_iter];

for (let mod of libraries) {
  packed_1.add(mod.name, mod.bench_packed_1(5_000));
  packed_5.add(mod.name, mod.bench_packed_5(1_000));
  simple_iter.add(mod.name, mod.bench_simple_iter(1_000));
  frag_iter.add(mod.name, mod.bench_frag_iter(100));
  add_remove.add(mod.name, mod.bench_add_remove(1_000));
}

for (let suite of suites) {
  suite.run();
}

console.log("|     | " + libraries.map((mod) => mod.name).join(" | ") + " |");
console.log("| --- |" + " --: |".repeat(libraries.length));
for (let suite of suites) {
  console.log(
    `| ${suite.name} | ${suite
      .map((bench) => Math.floor(bench.hz).toLocaleString())
      .join(" op/s | ")} |`
  );
}
