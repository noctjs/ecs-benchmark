# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

**SoA implementations**

| op/s        | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | ----------: | --------: | -----------: | ---------: |
| bitecs      |  335,064 |     115,954 |   431,207 |        1,634 |      2,334 |
| harmony-ecs |  313,278 |     132,026 |   489,903 |        4,040 |      4,194 |
| piecs       |  364,652 |     177,269 |   470,904 |       64,075 |     20,649 |
| wolf-ecs    |  378,471 |     165,951 |   535,362 |        2,597 |      3,913 |

**Object-based implementations**

| op/s        | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | ----------: | --------: | -----------: | ---------: |
| becsy       |  103,417 |      28,337 |    61,296 |          692 |      8,953 |
| ecsy        |    7,822 |       4,822 |    24,537 |          120 |        975 |
| geotic      |   45,957 |      29,631 |    49,482 |          106 |      1,099 |
| goodluck    |   53,927 |      31,894 |    77,575 |       27,253 |    301,727 |
| javelin-ecs |   65,990 |      38,474 |   121,207 |          656 |      3,286 |
| miniplex    |  109,296 |      36,316 |    20,372 |          310 |      6,645 |
| perform-ecs |   55,241 |      94,791 |    31,170 |          159 |        442 |
| picoes      |    6,814 |       4,223 |    12,368 |        2,679 |      4,303 |
| tiny-ecs    |   16,391 |      35,488 |    45,760 |          194 |      1,082 |
| uecs        |   29,855 |      14,747 |     9,861 |        1,724 |      5,207 |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v17.8.0.

## Frameworks

- [`@javelin/ecs`](https://github.com/3mcd/javelin)
- [`@lastolivegames/becsy`](https://github.com/lastolivegames/becsy)
- [`bitecs`](https://github.com/NateTheGreatt/bitecs)
- [`ecsy`](https://github.com/ecsyjs/ecsy)
- [`harmony-ecs`](https://github.com/3mcd/harmony-ecs)
- [`geotic`](https://github.com/ddmills/geotic)
- [`goodluck`](https://github.com/piesku/goodluck)
- [`miniplex`](https://github.com/hmans/miniplex)
- [`perform-ecs`](https://github.com/fireveined/perform-ecs)
- [`picoes`](https://github.com/ayebear/picoes)
- [`piecs`](https://github.com/sondresj/piecs)
- [`tiny-ecs`](https://github.com/bvalosek/tiny-ecs)
- [`uecs`](https://github.com/jprochazk/uecs)
- [`wolf-ecs`](https://github.com/EnderShadow8/wolf-ecs)

## Benchmarks

### Packed Iteration (5 queries)

This benchmark is designed to test the core overheads involved in component iteration when multiple queries are run.

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
- **Test:** Iterate through all entities, and create 1 entity with a `B` component. Then iterate through all entities with a `B` component and destroy them.

### Add / Remove

This benchmark is designed to test how quickly the ECS can add and then remove a component from an existing entity.

- **Dataset:** 1,000 entities with a single `A` component.
- **Test:** Iterate through all entities, adding a `B` component. Then iterate through all entities again, removing their `B` component.
