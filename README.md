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

## Benchmarks

### Adding and deleting entities

```
Create and delete (entities: 4000)
  @jakeklassen/ecs@2.3.6: 129 op/s (±0.96%)
  ent-comp@0.9.1: 90 op/s (±1.15%)
  flock-ecs@0.1.5: 76 op/s (±19.74%)
  makr@2.1.1: 2,865 op/s (±2.24%)
  modecs@0.1.11: 9 op/s (±2.42%)
  perform-ecs@0.7.8: 164 op/s (±1.28%)
  picoes@0.5.3: 137 op/s (±5.25%)
  tiny-ecs@2.0.0: 110 op/s (±2.58%)
```

### Iterating over entities

```
Update (entities: 4000, queries: 3)
  @jakeklassen/ecs@2.3.6: 2,438 op/s (±0.76%)
  ent-comp@0.9.1: 43,347 op/s (±14.47%)
  flock-ecs@0.1.5: 1,896 op/s (±2.40%)
  makr@2.1.1: 9,078 op/s (±0.62%)
  modecs@0.1.11: 2,021 op/s (±0.99%)
  perform-ecs@0.7.8: 46,113 op/s (±0.29%)
  picoes@0.5.3: 1,195 op/s (±0.63%)
  tiny-ecs@2.0.0: 41,128 op/s (±12.77%)
```
