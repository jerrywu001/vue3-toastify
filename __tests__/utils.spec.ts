import { it, expect, describe } from 'vitest';
import { generateToastId, isBool, isNum, isStr, mergeOptions, parseClassName } from '../src/utils/tools';
import { CSSTransitionProps, toast } from '../src';
import { Bounce, getDefaultTransition } from '../src/utils/constant';

describe('Utils', () => {
  it('Test getDefaultTransition', () => {
    const custom = {} as CSSTransitionProps;
    expect(getDefaultTransition(toast.TRANSITIONS.BOUNCE)).toBe(Bounce);
    expect(getDefaultTransition(custom)).toBe(custom);
  });

  describe("parseClassName", () => {
    it("Should return a string if input is a string", () => {
      expect(parseClassName('foo')).toBe('foo');
    });

    it("Should return null on invalid input", () => {
      // @ts-ignore
      expect(parseClassName(113123412)).toBe(null);
    })
  })

  it('Test tools', () => {
    expect(generateToastId().length).toBe(7);
    expect(isNum(2)).toBe(true);
    expect(isNum('2')).not.toBe(true);
    expect(isBool(2)).not.toBe(true);
    expect(isBool(false)).toBe(true);
    expect(isStr('1')).toBe(true);
    expect(isStr(undefined)).not.toBe(true);
  });

  it('Test mergeOptions', () => {
    expect(mergeOptions({ a: '1', b: 2 }, { b: 5 })).toEqual({ a: '1', b: 5 });
    expect(
      mergeOptions(
        {
          a: '1',
          style: { fonstSize: '12px', color: '#333' },
        },
        {
          style: { color: '#999', backgroundColor: 'transpraent' },
        },
      )
    ).toEqual({
      a: '1',
      style: {
        fonstSize: '12px',
        color: '#999',
        backgroundColor: 'transpraent',
      },
    });
  })
});
