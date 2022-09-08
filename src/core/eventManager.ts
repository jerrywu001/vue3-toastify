import {
  Id,
  ToastItem,
  Content,
  ToastOptions,
} from '../types';

export const enum Event {
  /** add a toast */
  Add,
  /** remove a toast */
  Remove,
  /** update a toast */
  Update,
  /** clear all toast items */
  ClearAll,
}

type NotValidatedToastProps = Partial<ToastOptions>;

type OnAddCallback = (
  content: Content,
  options: NotValidatedToastProps
) => void;
type OnRemoveCallback = (id: Id) => void;
type OnClearAllQueueCallback = (containerId?: Id) => void;
export type OnUpdateCallback = (toast: ToastItem) => void;

type Callback =
  | OnAddCallback
  | OnRemoveCallback
  | OnClearAllQueueCallback
  | OnUpdateCallback;
type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<Event, Callback[]>;
  emitQueue: Map<Event, TimeoutId[]>;
  on(event: Event.Add, callback: OnAddCallback): EventManager;
  on(event: Event.Remove, callback: OnRemoveCallback): EventManager;
  on(event: Event.Update, callback: OnUpdateCallback): EventManager;
  on(event: Event.ClearAll, callback: OnClearAllQueueCallback): EventManager;
  off(event: Event, callback?: Callback): EventManager;
  cancelEmit(event: Event): EventManager;
  emit(
    event: Event.Add,
    content: Content,
    options: NotValidatedToastProps
  ): void;
  emit(event: Event.Remove, id: Id): void;
  emit(event: Event.Update, data: ToastItem): void;
  emit(event: Event.ClearAll, containerId?: Id): void;
}

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event: Event, callback: Callback) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }

    const callbacks = this.list.get(event) as Callback[];
    callbacks.push(callback);
    return this;
  },

  off(event, callback) {
    if (callback) {
      const callbacks = this.list.get(event) as Callback[];
      if (callbacks) {
        const cb = callbacks.filter((v) => v !== callback);
        this.list.set(event, cb);
      }
      return this;
    }
    this.list.delete(event);
    return this;
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }

    return this;
  },

  /**
   * Enqueue the event at the end of the call stack
   * Doing so let the user call toast as follow:
   * toast('1')
   * toast('2')
   * toast('3')
   * Without setTimemout the code above will not work
   */
  emit(event: Event, ...args: any[]) {
    if (this.list.has(event)) {
      const callbacks = this.list.get(event) as Callback[];
      callbacks.forEach((callback: Callback) => {
        const timer: TimeoutId = setTimeout(() => {
          // @ts-ignore
          callback(...args);
        }, 0);

        if (!this.emitQueue.has(event)) {
          this.emitQueue.set(event, []);
        }

        const emitQueues = this.emitQueue.get(event) as NodeJS.Timeout[];
        emitQueues.push(timer);
      });
    }
  },
};
