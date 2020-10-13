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
  @jakeklassen/ecs: 105 op/s (±3.56%)
  ecsy: 164 op/s (±3.97%)
  ent-comp: 85 op/s (±2.33%)
  flock-ecs: 82 op/s (±23.51%)
  goodluck: 85 op/s (±0.89%)
  makr: 3,525 op/s (±1.34%)
  modecs: 8 op/s (±2.48%)
  perform-ecs: 415 op/s (±0.63%)
  picoes: 144 op/s (±5.65%)
  tiny-ecs: 119 op/s (±1.85%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs: 2,506 op/s (±0.99%)
  ecsy: 2,127 op/s (±0.98%)
  ent-comp: 38,800 op/s (±14.62%)
  flock-ecs: 1,981 op/s (±1.87%)
  goodluck: 33,347 op/s (±0.41%)
  makr: 9,848 op/s (±0.39%)
  modecs: 2,485 op/s (±0.68%)
  perform-ecs: 47,612 op/s (±0.67%)
  picoes: 1,273 op/s (±0.54%)
  tiny-ecs: 36,544 op/s (±12.92%)
```
