import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

const LIBRARIES = [
  "bitecs",
  "ecsy",
  "flock-ecs",
  "geotic",
  "goodluck",
  "makr",
  "perform-ecs",
  "tiny-ecs",
];

const BENCHMARKS = {
  packed_1: 5_000,
  packed_5: 1_000,
  simple_iter: 1_000,
  frag_iter: 100,
  add_remove: 1_000,
};

const RESULTS = [];

for (let lib of LIBRARIES) {
  let results = [];
  RESULTS.push(results);
  console.log(lib);
  for (let name in BENCHMARKS) {
    let config = BENCHMARKS[name];
    let path = `./cases/${lib}/${name}.js`;
    try {
      let result = await run_bench(path, config);
      let pad = " ".repeat(14 - name.length);
      console.log(
        `  ${name}${pad} ${Math.floor(result.hz).toLocaleString()} op/s`
      );
      results.push(result);
    } catch (err) {
      console.log(err);
    }
  }
  console.log();
}

console.log("|     | " + Object.keys(BENCHMARKS).join(" | ") + " |");
console.log("| --- | " + "--: |".repeat(Object.keys(BENCHMARKS).length));
for (let i = 0; i < LIBRARIES.length; i++) {
  console.log(
    `| ${LIBRARIES[i]} | ` +
      RESULTS[i]
        .map((result) => `${Math.floor(result.hz).toLocaleString()} op/s`)
        .join(" | ") +
      " |"
  );
}

function run_bench(path, config) {
  let current_dir = dirname(fileURLToPath(import.meta.url));
  let worker_file = resolve(current_dir, "bench_worker.js");

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
