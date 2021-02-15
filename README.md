# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |         packed_1 |         packed_5 |     simple_iter |        frag_iter |      add_remove |
| ----------- | ---------------: | ---------------: | --------------: | ---------------: | --------------: |
| bitecs      | **155,690 op/s** |      24,031 op/s |     19,351 op/s | **256,273 op/s** |        969 op/s |
| ecsy        |      13,228 op/s |       7,980 op/s |      4,049 op/s |      27,031 op/s |        779 op/s |
| flock-ecs   |       3,674 op/s |       4,392 op/s |      2,169 op/s |       9,480 op/s |     17,791 op/s |
| geotic      |      35,887 op/s |      40,176 op/s |     27,413 op/s |      52,031 op/s |        883 op/s |
| goodluck    |     112,402 op/s | **115,208 op/s** |     45,434 op/s |     128,875 op/s | **91,454 op/s** |
| makr        |      13,108 op/s |      10,912 op/s |      6,754 op/s |      22,589 op/s |     26,650 op/s |
| perform-ecs |      61,016 op/s |      56,979 op/s | **74,168 op/s** |      29,918 op/s |        345 op/s |
| tiny-ecs    |      17,686 op/s |      18,799 op/s |     28,911 op/s |      53,393 op/s |        829 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v15.8.0.

## Frameworks

- [bitecs](https://github.com/NateTheGreatt/bitecs)
- [ecsy](https://github.com/ecsyjs/ecsy)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [geotic](https://github.com/ddmills/geotic)
- [goodluck](https://github.com/piesku/goodluck)
- [makr](https://github.com/makrjs/makr)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Packed Iteration (1 query)

This benchmark is designed to test the core overheads involved in component iteration in best-case conditions.

- **Dataset:** 5,000 entities, each with `(A, B, C, D, E)` components.
- **Test:** Iterate through all entities with `A` and double its value.

### Packed Iteration (5 queries)

This benchmark is designed to test the core overheads involved in component iteration when multiple queries are run. The results are expected to match the ones from _Packed Iteration (1 query)_.

- **Dataset:** 1,000 entities, each with `(A, B, C, D, E)` components.
- **Test:**
  - Iterate through all entities with `A` and double its value.
  - Iterate through all entities with `B` and double its value.
  - Iterate through all entities with `C` and double its value.
  - Iterate through all entities with `D` and double its value.
  - Iterate through all entities with `E` and double its value.

### Simple Iteration

This benchmark is designed to test how efficiently the ECS can run multiple independent systems.

- **Dataset:**
  - 1,000 entities with `(A, B)` components
  - 1,000 entities with `(A, B, C)` components
  - 1,000 entities with `(A, B, C, D)` components
  - 1,000 entities with `(A, B, C, E)` components
- **Test:** Three systems accessing the following components, where each system swaps the values stored in each component:
  - `(A, B)`
  - `(C, D)`
  - `(C, E)`

### Fragmented Iteration

This benchmark is designed to test how the ECS handles iteration through a fragmented dataset.

- **Dataset:** 26 component types (`A` through `Z`), each with 100 entities plus a `Data` component.
- **Test:** Iterate through all entities with a `Data` component and double its value.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
