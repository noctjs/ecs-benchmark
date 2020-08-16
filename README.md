# ECS benchmark comparison

- [Adding and deleting entities](#adding-and-deleting-entities)
- [Iterating over entities](#iterating-over-entities)

## Frameworks

- [@jakeklassen/ecs](https://github.com/jakeklassen/ecs)
- [ent-comp](https://github.com/andyhall/ent-comp)
- [flock-ecs](https://github.com/dannyfritz/flock-ecs)
- [makr](https://github.com/makrjs/makr)
- [modecs](https://github.com/NateTheGreatt/modecs)
- [perform-ecs](https://github.com/fireveined/perform-ecs)
- [picoes](https://github.com/ayebear/picoes)
- [tiny-ecs](https://github.com/bvalosek/tiny-ecs)
- [goodluck](https://github.com/piesku/goodluck)

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs@2.3.6: 74 op/s (±3.08%)
  ent-comp@0.9.1: 67 op/s (±2.16%)
  flock-ecs@0.1.5: 63 op/s (±19.94%)
  makr@2.1.1: 2,119 op/s (±1.36%)
  modecs@0.1.11: 3 op/s (±3.36%)
  perform-ecs@0.7.8: 136 op/s (±1.69%)
  picoes@0.5.3: 100 op/s (±6.06%)
  tiny-ecs@2.0.0: 95 op/s (±1.21%)
  goodluck@5.0.1: 47 op/s (±1.15%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs@2.3.6: 1,702 op/s (±1.19%)
  ent-comp@0.9.1: 27,696 op/s (±14.31%)
  flock-ecs@0.1.5: 1,531 op/s (±3.16%)
  makr@2.1.1: 7,480 op/s (±1.28%)
  modecs@0.1.11: 1,655 op/s (±1.57%)
  perform-ecs@0.7.8: 31,974 op/s (±1.28%)
  picoes@0.5.3: 908 op/s (±1.44%)
  tiny-ecs@2.0.0: 22,624 op/s (±12.09%)
  goodluck@5.0.1: 25,529 op/s (±1.13%)
```
