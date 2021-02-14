import Benchmark from "benchmark";
import { bold, dim, inverse, red, white } from "kleur/colors";

/**
 * @param {string} name
 * @returns {Benchmark.Suite}
 */
export function suite(name) {
  return new Benchmark.Suite(name)
    .on("start", () => {
      console.log(bold(white(name)));
    })
    .on("complete", () => {
      console.log();
    })
    .on("cycle", (event) => {
      let bench = event.target;
      if (bench.error) {
        console.log(`  ${bench.name}  ${inverse(red(" ERROR "))}`);
        console.log(red(bench.error.stack));
      } else {
        let ops = Math.floor(bench.hz).toLocaleString();
        let rme = bench.stats.rme.toFixed(2);
        console.log(`  ${bench.name}:`, dim(`${ops} op/s (±${rme}%)`));
      }
    });
}
