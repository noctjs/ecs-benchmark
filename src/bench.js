import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const LIBRARIES = [
  "becsy",
  "bitecs",
  "ecsy",
  "flock-ecs",
  "geotic",
  "goodluck",
  "harmony-ecs",
  "javelin-ecs",
  "makr",
  "perform-ecs",
  "picoes",
  "piecs",
  "tiny-ecs",
  "uecs",
  "wolf-ecs",
];

const BENCHMARKS = {
  packed_1: 5_000,
  packed_5: 1_000,
  simple_iter: 1_000,
  frag_iter: 100,
  entity_cycle: 1_000,
  add_remove: 1_000,
};

let libraries = [];
let args = process.argv.slice(2);
if (args.length > 0) {
  for (let lib of args) {
    if (LIBRARIES.includes(lib)) {
      libraries.push(lib);
    } else {
      console.warn(`${lib} is not supported`);
    }
  }
} else {
  libraries = LIBRARIES;
}

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
const RESULTS = [];

for (let lib of libraries) {
  let results = [];
  RESULTS.push(results);
  console.log(lib);
  for (let name in BENCHMARKS) {
    let log = `  ${name} ${" ".repeat(14 - name.length)}`;
    let path = resolve(CURRENT_DIR, `./cases/${lib}/${name}.js`);
    if (!existsSync(path)) {
      results.push("TODO");
      console.log(`${log} TODO`);
      continue;
    }
    try {
      let config = BENCHMARKS[name];
      let result = await run_bench(path, config);
      results.push(result);
      console.log(`${log} ${Math.floor(result.hz).toLocaleString()} op/s`);
    } catch (err) {
      if (err instanceof Error) {
        results.push(err.code ?? "ERROR");
        console.log(`${log} ${err.code ?? "ERROR"}`);
        console.log(err.stack);
      } else {
        results.push("ERROR");
        console.log(`${log} ERROR`);
        console.log(err);
      }
    }
  }
  console.log();
}

console.log("|     | " + Object.keys(BENCHMARKS).join(" | ") + " |");
console.log("| --- | " + "--: |".repeat(Object.keys(BENCHMARKS).length));
for (let i = 0; i < libraries.length; i++) {
  console.log(
    `| ${libraries[i]} | ` +
      RESULTS[i]
        .map((result) =>
          "hz" in result
            ? `${Math.floor(result.hz).toLocaleString()} op/s`
            : result
        )
        .join(" | ") +
      " |"
  );
}

function run_bench(path, config) {
  let worker_file = resolve(CURRENT_DIR, "bench_worker.js");

  return new Promise((resolve, reject) => {
    let worker = new Worker(worker_file, {
      workerData: {
        path,
        config,
      },
    });

    worker.on("message", resolve);
    worker.on("error", reject);
  });
}
