import { performance } from "node:perf_hooks";
import { parentPort, workerData } from "node:worker_threads";
import { pathToFileURL } from "node:url";

// Load the function to bench
let setup = await import(pathToFileURL(workerData.path)).then(
  (module) => module.default
);
let fn = await setup(workerData.config);

let cycle_n = 1;
let cycle_ms = 0;
let cycle_total_ms = 0;

// Run multiple cycles to get an estimate
while (cycle_total_ms < 500) {
  let elapsed = bench_iter(fn, cycle_n);
  cycle_ms = elapsed / cycle_n;
  cycle_n *= 2;
  cycle_total_ms += elapsed;
}

// Try to estimate the iteration count for 500ms
let target_n = 500 / cycle_ms;
let total_ms = bench_iter(fn, target_n);

parentPort.postMessage({
  hz: (target_n / total_ms) * 1_000, // ops/sec
  ms: total_ms / target_n, // ms/op
});

function bench_iter(fn, count) {
  let start = performance.now();
  for (let i = 0; i < count; i++) {
    fn();
  }
  let end = performance.now();
  return end - start;
}
