# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       |  82,144 op/s |  82,210 op/s |  30,488 op/s |  64,463 op/s |     224 op/s |   8,050 op/s |
| bitecs      | 246,727 op/s | 335,463 op/s | 111,215 op/s | 486,824 op/s |     654 op/s |   2,314 op/s |
| ecsy        |  14,510 op/s |   7,778 op/s |   4,786 op/s |  23,327 op/s |      34 op/s |     914 op/s |
| flock-ecs   |   3,519 op/s |   3,754 op/s |   1,718 op/s |   7,854 op/s |      93 op/s |  19,202 op/s |
| geotic      |  40,963 op/s |  45,986 op/s |  29,105 op/s |  46,699 op/s |      30 op/s |   1,005 op/s |
| goodluck    |  58,862 op/s |  54,663 op/s |  35,040 op/s | 103,021 op/s |  13,752 op/s | 269,077 op/s |
| harmony-ecs | 312,105 op/s | 252,354 op/s | 133,024 op/s | 495,510 op/s |   2,221 op/s |  11,180 op/s |
| javelin-ecs |  61,655 op/s |  68,741 op/s |  36,541 op/s | 118,779 op/s |     293 op/s |   2,969 op/s |
| makr        |  13,685 op/s |   9,565 op/s |   7,162 op/s |  23,187 op/s |  10,967 op/s |  25,982 op/s |
| perform-ecs |  56,221 op/s |  56,417 op/s |  73,847 op/s |  28,948 op/s |      39 op/s |     424 op/s |
| picoes      |  26,221 op/s |   7,733 op/s |   4,549 op/s |  16,157 op/s |   1,403 op/s |   4,124 op/s |
| tiny-ecs    |  20,034 op/s |  17,194 op/s |  31,176 op/s |  49,498 op/s |      52 op/s |   1,048 op/s |
| uecs        |  35,038 op/s |  31,911 op/s |  15,051 op/s |  66,222 op/s |     858 op/s |   5,189 op/s |
| wolf-ecs    | 324,656 op/s | 304,422 op/s | 165,203 op/s | 524,042 op/s |   3,352 op/s |  10,765 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v16.3.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`makr`](https://github.com/makrjs/makr)
- [`perform-ecs`](https://github.com/fireveined/perform-ecs)
- [`picoes`](https://github.com/ayebear/picoes)
- [`tiny-ecs`](https://github.com/bvalosek/tiny-ecs)
- [`uecs`](https://github.com/jprochazk/uecs)
- [`wolf-ecs`](https://github.com/EnderShadow8/wolf-ecs)

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
