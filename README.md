# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|                      |           bitecs |        ecsy |   flock-ecs |      geotic |         goodluck |        makr |     perform-ecs |    tiny-ecs |
| -------------------- | ---------------: | ----------: | ----------: | ----------: | ---------------: | ----------: | --------------: | ----------: |
| Packed (1 query)     | **102,388** op/s | 13,749 op/s |  4,305 op/s | 36,446 op/s |  **99,783** op/s | 12,882 op/s |     57,609 op/s | 19,103 op/s |
| Packed (5 queries)   |      22,308 op/s |  7,518 op/s |  4,048 op/s | 45,400 op/s | **100,599** op/s | 11,098 op/s |     58,707 op/s | 17,809 op/s |
| Simple Iteration     |      11,398 op/s |  4,805 op/s |  1,802 op/s | 32,124 op/s |      45,955 op/s |  6,589 op/s | **95,412** op/s | 25,912 op/s |
| Fragmented Iteration |      25,692 op/s | 20,475 op/s |  9,107 op/s | 44,619 op/s | **124,318** op/s | 22,221 op/s |     27,945 op/s | 94,788 op/s |
| Add / Remove         |         923 op/s |    725 op/s | 19,172 op/s |    826 op/s | **266,291** op/s | 21,822 op/s |        343 op/s |    916 op/s |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”.

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

## Results

The benchmarks are run on node v15.8.0.

```
Packed (1 query)
  bitecs: 102,388 op/s (±11.34%)
  ecsy: 13,749 op/s (±3.33%)
  flock-ecs: 4,305 op/s (±2.36%)
  geotic: 36,446 op/s (±2.27%)
  goodluck: 99,783 op/s (±0.67%)
  makr: 12,882 op/s (±0.43%)
  perform-ecs: 57,609 op/s (±0.41%)
  tiny-ecs: 19,103 op/s (±0.76%)

Packed (5 queries)
  bitecs: 22,308 op/s (±0.30%)
  ecsy: 7,518 op/s (±3.48%)
  flock-ecs: 4,048 op/s (±0.40%)
  geotic: 45,400 op/s (±1.20%)
  goodluck: 100,599 op/s (±0.29%)
  makr: 11,098 op/s (±0.43%)
  perform-ecs: 58,707 op/s (±0.72%)
  tiny-ecs: 17,809 op/s (±0.79%)

Simple Iteration
  bitecs: 11,398 op/s (±0.71%)
  ecsy: 4,805 op/s (±2.32%)
  flock-ecs: 1,802 op/s (±0.31%)
  geotic: 32,124 op/s (±0.84%)
  goodluck: 45,955 op/s (±1.02%)
  makr: 6,589 op/s (±0.79%)
  perform-ecs: 95,412 op/s (±0.65%)
  tiny-ecs: 25,912 op/s (±1.08%)

Fragmented Iteration
  bitecs: 25,692 op/s (±0.40%)
  ecsy: 20,475 op/s (±4.17%)
  flock-ecs: 9,107 op/s (±1.48%)
  geotic: 44,619 op/s (±1.00%)
  goodluck: 124,318 op/s (±0.88%)
  makr: 22,221 op/s (±1.13%)
  perform-ecs: 27,945 op/s (±1.60%)
  tiny-ecs: 94,788 op/s (±1.17%)

Add / Remove
  bitecs: 923 op/s (±0.48%)
  ecsy: 725 op/s (±2.69%)
  flock-ecs: 19,172 op/s (±0.36%)
  geotic: 826 op/s (±0.59%)
  goodluck: 266,291 op/s (±0.36%)
  makr: 21,822 op/s (±0.49%)
  perform-ecs: 343 op/s (±3.81%)
  tiny-ecs: 916 op/s (±0.79%)
```
