import { toast } from '../src';
import { Default } from '../src/utils/constant';

export const positionClass = (position = toast.POSITION.TOP_RIGHT) => `${Default.CSS_NAMESPACE}__toast-container--${position}`;

it('Test', () => {
  expect(1 + 1).toBe(2);
});
