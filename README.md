# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|     | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| --- | --: |--: |--: |--: |--: |--: |
| wolf-ecs | 79,166 op/s | 75,697 op/s | 49,891 op/s | 125,761 op/s | 1,399 op/s | 7,328 op/s |
| becsy | 23,522 op/s | 23,206 op/s | 17,869 op/s | 52,931 op/s | 607 op/s | 3,307 op/s |
| bitecs | 78,382 op/s | 64,447 op/s | 39,133 op/s | 123,640 op/s | 480 op/s | 983 op/s |
| ecsy | 1,259 op/s | 1,833 op/s | 859 op/s | 4,652 op/s | 10 op/s | 249 op/s |
| flock-ecs | 1,018 op/s | 950 op/s | 462 op/s | 2,240 op/s | 45 op/s | 4,423 op/s |
| geotic | 8,229 op/s | 14,648 op/s | 7,570 op/s | 15,102 op/s | 8 op/s | 269 op/s |
| goodluck | 17,356 op/s | 13,264 op/s | 10,520 op/s | 27,127 op/s | 3,904 op/s | 23,328 op/s |
| makr | 3,637 op/s | 3,289 op/s | 2,229 op/s | 7,328 op/s | 3,192 op/s | 7,973 op/s |
| picoes | 3,832 op/s | 1,968 op/s | 1,282 op/s | 3,630 op/s | 438 op/s | 841 op/s |
| tiny-ecs | 5,003 op/s | 5,152 op/s | 10,026 op/s | 13,066 op/s | 7 op/s | 312 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v15.12.0.

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
