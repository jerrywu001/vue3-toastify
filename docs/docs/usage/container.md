# Container Id

toasts will group by container id

## default container Id

```ts
// containerId to be `toast.POSITION.TOP_RIGHT`
toast('Wow so easy !');

// containerId to be `toast.POSITION.BOTTOM_LEFT`
toast('Wow so easy !', { position: toast.POSITION.BOTTOM_LEFT });
```

## custom container id

```ts
// containerId to be A
toast('Wow so easy !', { containerId: 'A' });
```
