# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|     | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| --- | --: |--: |--: |--: |--: |--: |
| becsy | 25,255 op/s | 24,249 op/s | 17,427 op/s | 45,495 op/s | 637 op/s | 3,847 op/s |
| bitecs | 76,780 op/s | 68,638 op/s | 35,408 op/s | 141,930 op/s | 254 op/s | 1,066 op/s |
| ecsy | 1,827 op/s | 1,902 op/s | 992 op/s | 5,538 op/s | 10 op/s | 216 op/s |
| flock-ecs | 715 op/s | 1,085 op/s | 466 op/s | 2,154 op/s | 48 op/s | 5,940 op/s |
| geotic | 8,665 op/s | 11,208 op/s | 4,587 op/s | 11,834 op/s | 6 op/s | 265 op/s |
| goodluck | 12,528 op/s | 14,476 op/s | 9,711 op/s | 28,465 op/s | 3,635 op/s | 26,686 op/s |
| javelin-ecs | TODO | TODO | TODO | TODO | TODO | TODO |
| makr | 3,907 op/s | 3,274 op/s | 2,307 op/s | 8,483 op/s | 3,529 op/s | 8,545 op/s |
| perform-ecs | 16,865 op/s | 14,345 op/s | 25,181 op/s | 8,150 op/s | 11 op/s | 65 op/s |
| picoes | 6,981 op/s | 1,912 op/s | 1,188 op/s | 4,288 op/s | 493 op/s | 1,386 op/s |
| tiny-ecs | 5,359 op/s | 5,318 op/s | 10,208 op/s | 16,305 op/s | 14 op/s | 291 op/s |
| wolf-ecs | 88,996 op/s | 104,250 op/s | 55,283 op/s | 195,988 op/s | 1,070 op/s | 3,146 op/s |

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
