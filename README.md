# ECS benchmark comparison

- [Adding and deleting entities](#adding-and-deleting-entities)
- [Iterating over entities](#iterating-over-entities)

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
- [bitecs](https://github.com/NateTheGreatt/bitecs)
- [ecsy](https://github.com/ecsyjs/ecsy)
- [ent-comp](https://github.com/andyhall/ent-comp)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [goodluck](https://github.com/piesku/goodluck)
- [makr](https://github.com/makrjs/makr)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 118 op/s (±1.99%)
  bitecs: 99 op/s (±0.42%)
  ecsy: 110 op/s (±2.88%)
  ent-comp: 84 op/s (±2.79%)
  flock-ecs: 75 op/s (±18.54%)
  goodluck: 1,678 op/s (±5.60%)
  makr: 3,391 op/s (±0.30%)
  perform-ecs: 406 op/s (±0.96%)
  picoes: 153 op/s (±3.10%)
  tiny-ecs: 110 op/s (±2.04%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,518 op/s (±0.63%)
  bitecs: 44,077 op/s (±6.63%)
  ecsy: 2,081 op/s (±0.97%)
  ent-comp: 42,910 op/s (±9.14%)
  flock-ecs: 1,993 op/s (±2.20%)
  goodluck: 24,322 op/s (±1.32%)
  makr: 9,422 op/s (±0.56%)
  perform-ecs: 45,264 op/s (±0.43%)
  picoes: 1,319 op/s (±0.70%)
  tiny-ecs: 37,088 op/s (±8.36%)
```
