import { vi } from 'vitest';
import { eventManager, Event } from '../src/core';

vi.useFakeTimers();

const eventList: Event[] = [
  Event.Add,
  Event.Update,
  Event.Remove,
  Event.ClearAll,
];

beforeEach(() => {
  eventManager.list.clear();
  eventManager.emitQueue.clear();
});

describe('EventManager', () => {
  it('Should be able to listen for an event', () => {
    eventManager
      .on(Event.Update, () => {})
      .on(Event.Add, () => {})
      .on(Event.Remove, () => {})
      .on(Event.ClearAll, () => {});

    for (const event of eventList) {
      expect(eventManager.list.has(event)).toBe(true);
    }
  });

  it('Should be able to emit event', () => {
    const cb = vi.fn();

    eventManager.on(Event.Add, cb);
    expect(cb).not.toHaveBeenCalled();

    eventManager.emit(Event.Add, 'Hello', {});
    vi.runAllTimers();
    expect(cb).toHaveBeenCalled();
  });

  it('Should be possible to remove a specific callback', () => {
    const cb1 = vi.fn();
    const cb2 = vi.fn();
    eventManager.on(Event.Remove, cb1);
    eventManager.on(Event.Remove, cb2);

    eventManager.emit(Event.Remove, '');
    vi.runAllTimers();
    expect(cb1).toHaveBeenCalled();
    expect(cb2).toHaveBeenCalled();

    eventManager.off(Event.Remove, cb1);
    eventManager.emit(Event.Remove, '');
    vi.runAllTimers();

    expect(cb1).toHaveBeenCalledTimes(1);
    expect(cb2).toHaveBeenCalledTimes(2);
  });

  it('Should be possible to cancel event by kind', () => {
    const cb = vi.fn();
    eventManager.on(Event.Update, cb);
    eventManager.emit(Event.Update, {});
    eventManager.cancelEmit(Event.Update);
    vi.runAllTimers();
    expect(cb).not.toHaveBeenCalled();
  });

  it('Should be able to remove event', () => {
    eventManager.on(Event.Update, () => {});
    expect(eventManager.list.size).toBe(1);

    eventManager.off(Event.Update);
    expect(eventManager.list.size).toBe(0);
  });
});
