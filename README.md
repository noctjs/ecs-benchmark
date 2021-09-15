# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|                    |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ------------------ | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy              |  51,768 op/s |  49,559 op/s |  31,755 op/s | 112,976 op/s |     263 op/s |  15,125 op/s |
| bitecs             | 305,720 op/s | 276,683 op/s | 164,424 op/s | 586,146 op/s |   2,182 op/s |   6,347 op/s |
| ecsy               |  21,282 op/s |  11,751 op/s |   7,570 op/s |  37,356 op/s |      53 op/s |   1,157 op/s |
| flock-ecs          |   6,562 op/s |   6,835 op/s |   3,448 op/s |  16,007 op/s |      83 op/s |  34,923 op/s |
| geotic             |  63,667 op/s |  75,245 op/s |  53,136 op/s |  62,944 op/s |      46 op/s |   1,376 op/s |
| goodluck           |  79,455 op/s |  78,197 op/s |  47,538 op/s | 153,094 op/s |  23,499 op/s | 156,087 op/s |
| harmony-ecs        | 461,247 op/s | 446,759 op/s | 258,028 op/s | 755,269 op/s |  10,047 op/s |  17,907 op/s |
| harmony-ecs-object |  81,935 op/s |  83,734 op/s |  66,414 op/s | 152,264 op/s |   7,398 op/s |  14,277 op/s |
| javelin-ecs        |  85,234 op/s |  84,191 op/s |  95,867 op/s | 145,626 op/s |     478 op/s |   4,894 op/s |
| makr               |  23,431 op/s |  17,998 op/s |  13,148 op/s |  47,069 op/s |  17,535 op/s |  43,012 op/s |
| perform-ecs        |  76,954 op/s |  85,988 op/s | 159,294 op/s |  44,030 op/s |      69 op/s |     626 op/s |
| picoes             |  42,973 op/s |  11,653 op/s |   7,424 op/s |  25,086 op/s |   1,940 op/s |   6,551 op/s |
| tiny-ecs           |  33,298 op/s |  29,848 op/s |  52,432 op/s |  65,742 op/s |      74 op/s |   1,261 op/s |
| wolf-ecs           | 452,731 op/s | 442,979 op/s | 242,801 op/s | 810,898 op/s |   5,906 op/s |  20,640 op/s |

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
