# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|             |     packed_1 |     packed_5 |  simple_iter |    frag_iter | entity_cycle |   add_remove |
| ----------- | -----------: | -----------: | -----------: | -----------: | -----------: | -----------: |
| becsy       |  94,575 op/s |  84,279 op/s |  32,457 op/s |  58,258 op/s |     225 op/s |   7,971 op/s |
| bitecs      | 253,655 op/s | 311,195 op/s | 111,961 op/s | 432,781 op/s |     673 op/s |   2,320 op/s |
| ecsy        |  12,863 op/s |   7,981 op/s |   4,828 op/s |  24,866 op/s |      36 op/s |     817 op/s |
| flock-ecs   |   3,451 op/s |   3,825 op/s |   1,734 op/s |   6,474 op/s |      88 op/s |  18,929 op/s |
| geotic      |  38,062 op/s |  39,530 op/s |  26,410 op/s |  46,832 op/s |      30 op/s |     829 op/s |
| goodluck    |  64,034 op/s |  54,710 op/s |  34,944 op/s |  82,482 op/s |  14,384 op/s | 267,147 op/s |
| harmony-ecs | 317,857 op/s | 253,654 op/s | 132,760 op/s | 486,285 op/s |   2,238 op/s |  11,162 op/s |
| javelin-ecs |  53,437 op/s |  53,171 op/s |  34,938 op/s | 103,905 op/s |     239 op/s |   2,927 op/s |
| makr        |  11,720 op/s |   8,495 op/s |   5,518 op/s |  17,623 op/s |   8,675 op/s |  24,936 op/s |
| perform-ecs |  54,325 op/s |  56,576 op/s |  70,736 op/s |  30,036 op/s |      40 op/s |     385 op/s |
| picoes      |  24,218 op/s |   7,066 op/s |   3,677 op/s |  11,094 op/s |   1,263 op/s |   3,734 op/s |
| tiny-ecs    |  18,254 op/s |  16,222 op/s |  29,307 op/s |  43,993 op/s |      50 op/s |     990 op/s |
| uecs        |  33,098 op/s |  29,833 op/s |  14,513 op/s |  10,096 op/s |     807 op/s |   5,013 op/s |
| wolf-ecs    | 303,799 op/s | 291,085 op/s | 161,958 op/s | 400,477 op/s |   3,291 op/s |  10,400 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v16.3.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`flock-ecs`](https://github.com/dannyfritz/flock-ecs)
- [`harmony-ecs`](https://github.com/3mcd/harmony-ecs)
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
- **Test:**
  - Iterate through all entities with a `Data` component and double its value.
  - Iterate through all entities with a `Z` component and double its value.

### Entity Cycle

This benchmark is designed to test the base cost of constructing and destroying entities into the ECS.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, and create 2 entities with a `B` component. Then iterate through all entities with a `B` component and destroy them.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
