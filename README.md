# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |  add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | ----------: |
| bitecs      | 328,625 op/s | 328,672 op/s | 191,774 op/s | 659,881 op/s |     623 op/s |  1,510 op/s |
| ecsy        |  13,810 op/s |   7,343 op/s |   4,707 op/s |  25,882 op/s |      32 op/s |    788 op/s |
| flock-ecs   |   3,599 op/s |   4,722 op/s |   1,610 op/s |   7,925 op/s |      88 op/s | 18,523 op/s |
| geotic      |  32,987 op/s |  47,799 op/s |  27,691 op/s |  49,348 op/s |      29 op/s |    888 op/s |
| goodluck    |  51,657 op/s |  52,887 op/s |  29,363 op/s | 110,981 op/s |  12,959 op/s | 81,781 op/s |
| makr        |  12,707 op/s |  10,368 op/s |   6,653 op/s |  24,439 op/s |   8,790 op/s | 25,504 op/s |
| perform-ecs |  55,518 op/s |  57,716 op/s |  72,009 op/s |  28,827 op/s |      38 op/s |    350 op/s |
| picoes      |   3,827 op/s |   2,729 op/s |   1,897 op/s |   5,522 op/s |   1,050 op/s |  2,997 op/s |
| tiny-ecs    |  19,419 op/s |  19,013 op/s |  29,778 op/s |  11,676 op/s |      38 op/s |    895 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v15.8.0.

## Frameworks

- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`makr`](https://github.com/makrjs/makr)
- [`perform-ecs`](https://github.com/fireveined/perform-ecs)
- [`picoes`](https://github.com/ayebear/picoes)
- [`tiny-ecs`](https://github.com/bvalosek/tiny-ecs)

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

### Entity Cycle

This benchmark is designed to test the base cost of constructing and destroying entities into the ECS.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, and create 2 entities with a `B` component. Then iterate through all entities with a `B` component and destroy them.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
