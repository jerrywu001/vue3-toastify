# toast

## Props

:::tip
When displaying a toast, the options are inherited from the container. Toast options supersede Container props
:::


| Options            | Type              | Description                                                                                         |
|--------------------|-------------------|-----------------------------------------------------------------------------------------------------|
| toastId            | Id                | Provide a custom id                                                                                 |
| type               | ToastType         | One of info, success, warning, error                                                                |
| position           | ToastPosition     | One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left                    |
| rtl                | boolean           | Support right to left content                                                                       |
| onOpen             | () => void        | Called when the notification appear                                                                 |
| onClose            | () => void        | Called when the notification disappear                                                              |
| autoClose          | bool \| number    | Delay in ms to close the toast. If set to false, the notification needs to be closed manually       |
| closeButton        | CloseBtnType      | A React Component to replace the default close button or `false` to hide the button                 |
| transition         | ToastTransition \| CSSTransitionProps         | A reference to a valid react-transition-group/Transition componen       |
| hideProgressBar    | bool              | Display or not the progress bar below the toast(remaining time)                                     |
| pauseOnHover       | bool              | Keep the timer running or not on hover                                                              |
| pauseOnFocusLoss   | bool              | Pause the timer when the window loses focus                                                         |
| closeOnClick       | bool              | Dismiss toast on click                                                                              |
| toastClassName     | string            | Add optional classes to the container                                                               |
| bodyClassName      | string            | Add optional classes to the TransitionGroup container                                               |
| toastStyle         | CSSProperties     | Add optional inline style to the toast wrapper                                                      |
| progressClassName  | string            | Add optional classes to the progress bar                                                            |
| progressStyle      | CSSProperties     | Add optional inline style to the progress bar                                                       |
| containerId        | Id                | Used to match a specific Toast container                                                            |
| role               | string            | Define the ARIA role for the toasts                                                                 |
| delay              | number            | Let you delay the toast appearance. Pass a value in ms                                              |
| onClick            | (event: MouseEvent) => void      | Called when click inside Toast notification                                          |
| render             | ToastContent\<T\>                | Only available when using `toast.update`                                             |
| data               | T                                | any additional data you want to pass `toast("hello", { data: {key: value} } as T)`   |

## Usages

All the toast methods return a **toastId** except `remove` and `isActive`. The **toastId** can be used to remove a toast programmatically or to check if the toast is displayed.

```ts
const options = {
  onOpen: () => console.log('opened'),
  onClose: () => console.log('closed'),
  autoClose: 6000,
  closeButton: SomeVNode, // CloseBtnType
  type: toast.TYPE.INFO,
  hideProgressBar: false,
  position: toast.POSITION.TOP_LEFT,
  pauseOnHover: true,
  transition: MyCustomTransition,
  progress: 0.2
  // and so on ...
} as ToastOptions;

// display toasts
const toastId = toast("Hello", options as ToastOptions);
toast(MyComponent, options as ToastOptions);
toast(({ closeToast } as ToastContentProps) => <div>Render props like</div>, options as ToastOptions);

//shortcut to different types
toast.success("Hello", options as ToastOptions);
toast.info("World", options as ToastOptions);
toast.warn(MyComponent, options as ToastOptions);
toast.error("Error", options as ToastOptions);

// Remove all toasts !
toast.remove();
toast.clearAll();

// Remove given toast
toast.remove(toastId as Id);

//Check if a toast is displayed or not
toast.isActive(toastId);

// update a toast
toast.update(toastId, {
  type: toast.TYPE.INFO,
  render: SomeVNode, // ToastContent<T>
});

// completes the controlled progress bar
toast.done(toastId as Id);
```
