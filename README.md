# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |         packed_1 |        packed_5 |     simple_iter |        frag_iter |      add_remove |
| ----------- | ---------------: | --------------: | --------------: | ---------------: | --------------: |
| bitecs      | **229,460 op/s** | **207,628 op/s**| **121,285 op/s**| **418,492 op/s** | 1,071 op/s      |
| ecsy        | 6,039 op/s       | 4,680 op/s      | 1,979 op/s      | 11,552 op/s      | 534 op/s        |
| flock-ecs   | 2,190 op/s       | 2,949 op/s      | 1,141 op/s      | 4,816 op/s       | 12,081 op/s     |
| geotic      | 20,619 op/s      | 40,264 op/s     | 18,357 op/s     | 35,961 op/s      | 658 op/s        |
| goodluck    | 34,211 op/s      | 33,650 op/s     | 20,749 op/s     | 68,192 op/s      | **52,618 op/s** |
| makr        | 7,921 op/s       | 6,575 op/s      | 4,134 op/s      | 16,666 op/s      | 16,877 op/s     |
| perform-ecs | 37,267 op/s      | 36,790 op/s     | 49,039 op/s     | 18,907 op/s      | 271 op/s        |
| tiny-ecs    | 10,420 op/s      | 12,819 op/s     | 23,410 op/s     | 35,004 op/s      | 661 op/s        |

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
