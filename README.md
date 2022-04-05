# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

**SoA implementations**

| op/s        | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | -------: | ----------: | --------: | -----------: | ---------: |
| bitecs      |  267,617 |  336,564 |     115,079 |   447,017 |        1,704 |      2,378 |
| harmony-ecs |  322,344 |  315,090 |     131,084 |   487,506 |        4,279 |      4,136 |
| piecs       |  359,421 |  373,086 |     178,521 |   472,741 |       64,130 |     20,752 |
| wolf-ecs    |  369,404 |  367,648 |     166,334 |   544,661 |        2,521 |      3,964 |

**Object-based implementations**

| op/s        | packed_1 | packed_5 | simple_iter | frag_iter | entity_cycle | add_remove |
| ----------- | -------: | -------: | ----------: | --------: | -----------: | ---------: |
| becsy       |   78,738 |  102,034 |      28,640 |    60,945 |          682 |      9,003 |
| ecsy        |   14,656 |    7,964 |       4,562 |    22,156 |          107 |        996 |
| geotic      |   35,785 |   43,397 |      29,146 |    48,329 |          105 |      1,061 |
| goodluck    |   48,004 |   53,413 |      30,671 |    71,558 |       26,408 |    278,057 |
| javelin-ecs |   53,673 |   62,704 |      34,157 |   114,460 |          635 |      2,718 |
| perform-ecs |   54,174 |   52,388 |      90,815 |    30,407 |          145 |        399 |
| picoes      |   25,694 |    6,609 |       4,079 |    11,244 |        2,771 |      4,367 |
| tiny-ecs    |   19,782 |   16,378 |      33,890 |    45,214 |          191 |      1,088 |
| uecs        |   35,189 |   29,688 |      14,645 |     9,289 |        1,737 |      5,385 |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”. The above benchmarks are run on node v17.4.0.

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
