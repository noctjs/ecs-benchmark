# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |         packed_1 |        packed_5 |     simple_iter |        frag_iter |      add_remove |
| ----------- | ---------------: | --------------: | --------------: | ---------------: | --------------: |
| bitecs      | **156,884 op/s** |     23,825 op/s |     18,774 op/s | **254,007 op/s** |        950 op/s |
| ecsy        |      13,942 op/s |      7,223 op/s |      3,463 op/s |      23,958 op/s |        752 op/s |
| flock-ecs   |       3,269 op/s |      4,658 op/s |      1,900 op/s |       8,240 op/s |     18,702 op/s |
| geotic      |      36,420 op/s |     46,334 op/s |     29,546 op/s |      53,521 op/s |        915 op/s |
| goodluck    |      55,556 op/s |     54,153 op/s |     30,100 op/s |     111,126 op/s | **87,386 op/s** |
| makr        |      13,207 op/s |     11,121 op/s |      6,910 op/s |      25,396 op/s |     27,215 op/s |
| perform-ecs |      62,546 op/s | **59,691 op/s** | **73,185 op/s** |      29,505 op/s |        346 op/s |
| picoes      |       3,799 op/s |      2,739 op/s |      1,935 op/s |       5,456 op/s |      2,602 op/s |
| tiny-ecs    |      18,145 op/s |     17,819 op/s |     30,253 op/s |      54,270 op/s |        916 op/s |

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

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
