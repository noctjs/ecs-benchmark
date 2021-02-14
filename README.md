# ECS benchmark comparison

A suite of benchmarks designed to test and compare JavaScript ECS library performance across a variety of challenging circumstances.

|                  | Packed (1 query) | Packed (5 queries) | Add / Remove     | Simple Iteration | Fragmented Iteration |
|------------------|------------------|--------------------|------------------|------------------|----------------------|
| @jakeklassen/ecs | 1,510 op/s       | 2,326 op/s         | 4,729 op/s       | 1,155 op/s       | 3,712 op/s           |
| bitecs           | 105,069 op/s     | 14,387 op/s        | 716 op/s         | 10,755 op/s      | 22,614 op/s          |
| ecsy             | 13,954 op/s      | 5,924 op/s         | 233 op/s         | 4,100 op/s       | 16,408 op/s          |
| flock-ecs        | 3,596 op/s       | 4,014 op/s         | 18,908 op/s      | 1,546 op/s       | 8,852 op/s           |
| geotic           | 31,201 op/s      | 38,097 op/s        | 727 op/s         | 29,375 op/s      | 70,292 op/s          |
| goodluck         | **128,556 op/s** | **149,271 op/s**   | **317,066 op/s** | 55,528 op/s      | **93,897 op/s**      |
| makr             | 12,424 op/s      | 10,308 op/s        | 21,362 op/s      | 7,028 op/s       | 24,836 op/s          |
| perform-ecs      | 60,098 op/s      | 62,406 op/s        | 391 op/s         | **87,091 op/s**  | 24,522 op/s          |
| tiny-ecs         | 16,196 op/s      | 15,774 op/s        | 897 op/s         | 23,972 op/s      | 67,528 op/s          |

The best result for each benchmark is marked in bold text. Note that run to run variance for these benchmarks is typically 1-4%. Any benchmarks within a few percent of each other should be considered “effectively equal”.

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
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
  @jakeklassen/ecs: 1,510 op/s (±3.71%)
  bitecs: 105,069 op/s (±22.15%)
  ecsy: 13,954 op/s (±2.82%)
  flock-ecs: 3,596 op/s (±4.00%)
  geotic: 31,201 op/s (±4.46%)
  goodluck: 128,556 op/s (±3.20%)
  makr: 12,424 op/s (±4.41%)
  perform-ecs: 60,098 op/s (±5.57%)
  tiny-ecs: 16,196 op/s (±4.86%)

Packed (5 queries)
  @jakeklassen/ecs: 2,326 op/s (±3.31%)
  bitecs: 14,387 op/s (±7.10%)
  ecsy: 5,924 op/s (±4.88%)
  flock-ecs: 4,014 op/s (±3.82%)
  geotic: 38,097 op/s (±27.46%)
  goodluck: 149,271 op/s (±1.05%)
  makr: 10,308 op/s (±2.84%)
  perform-ecs: 62,406 op/s (±5.93%)
  tiny-ecs: 15,774 op/s (±2.76%)

Add / Remove
  @jakeklassen/ecs: 4,729 op/s (±3.25%)
  bitecs: 716 op/s (±3.44%)
  ecsy: 233 op/s (±1.84%)
  flock-ecs: 18,908 op/s (±2.34%)
  geotic: 727 op/s (±1.68%)
  goodluck: 317,066 op/s (±3.36%)
  makr: 21,362 op/s (±2.68%)
  perform-ecs: 391 op/s (±4.09%)
  tiny-ecs: 897 op/s (±2.76%)

Simple Iteration
  @jakeklassen/ecs: 1,155 op/s (±2.56%)
  bitecs: 10,755 op/s (±6.93%)
  ecsy: 4,100 op/s (±4.41%)
  flock-ecs: 1,546 op/s (±16.45%)
  geotic: 29,375 op/s (±1.68%)
  goodluck: 55,528 op/s (±2.03%)
  makr: 7,028 op/s (±2.25%)
  perform-ecs: 87,091 op/s (±2.24%)
  tiny-ecs: 23,972 op/s (±2.84%)

Fragmented Iteration
  @jakeklassen/ecs: 3,712 op/s (±4.28%)
  bitecs: 22,614 op/s (±3.29%)
  ecsy: 16,408 op/s (±44.60%)
  flock-ecs: 8,852 op/s (±2.66%)
  geotic: 70,292 op/s (±7.06%)
  goodluck: 93,897 op/s (±6.47%)
  makr: 24,836 op/s (±2.47%)
  perform-ecs: 24,522 op/s (±6.25%)
  tiny-ecs: 67,528 op/s (±16.72%)
```
