# ECS benchmark comparison

- [Adding and deleting entities](#adding-and-deleting-entities)
- [Iterating over entities](#iterating-over-entities)

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
- [ecsy](https://github.com/ecsyjs/ecsy)
- [ent-comp](https://github.com/andyhall/ent-comp)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [goodluck](https://github.com/piesku/goodluck)
- [makr](https://github.com/makrjs/makr)
- [modecs](https://github.com/NateTheGreatt/modecs)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs: 117 op/s (±5.94%)
  ecsy: 159 op/s (±4.20%)
  ent-comp: 80 op/s (±4.33%)
  flock-ecs: 75 op/s (±18.50%)
  goodluck: 96 op/s (±0.35%)
  makr: 3,641 op/s (±0.57%)
  modecs: 9 op/s (±1.39%)
  perform-ecs: 410 op/s (±0.72%)
  picoes: 142 op/s (±7.49%)
  tiny-ecs: 106 op/s (±2.95%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,443 op/s (±2.60%)
  ecsy: 1,895 op/s (±2.41%)
  ent-comp: 40,167 op/s (±13.98%)
  flock-ecs: 2,073 op/s (±3.70%)
  goodluck: 32,264 op/s (±0.90%)
  makr: 10,073 op/s (±1.39%)
  modecs: 2,512 op/s (±2.44%)
  perform-ecs: 46,631 op/s (±0.80%)
  picoes: 1,293 op/s (±0.83%)
  tiny-ecs: 33,562 op/s (±12.82%)
```
