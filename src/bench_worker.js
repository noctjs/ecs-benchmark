import { performance } from "perf_hooks";
import { parentPort, workerData } from "worker_threads";

// Load the function to bench
let mod;
try {
  mod = await import(workerData.path);
} catch {
  let todo = new Error();
  todo.message = "Not yet implemented";
  todo.code = "TODO";
  throw todo;
}

let setup = mod.default;
let fn = setup(workerData.config);

// Run an initial cycle to get an estimate
let initial_n = 1_000;
let initial_ms = bench_iter(fn, initial_n) / initial_n;

// Try to correct the estimate
let cycle_n = 1_000 / initial_ms;
let cycle_ms = bench_iter(fn, cycle_n) / cycle_n;

// Try to estimate the iteration count for 1s
let target_n = 1_000 / cycle_ms;
let total_ms = bench_iter(fn, target_n);
let total_hz = (target_n / total_ms) * 1_000;

parentPort.postMessage({
  hz: total_hz, // ops/sec
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
