import { screen } from '@testing-library/vue';
import { toast } from '../../src';
import { positionClass } from '../tools';

describe('toastify', () => {
  afterEach(() => {
    toast.clearAll();
  });

  it('default containerId should be top-right', async () => {
    const id = toast('hello');
    const container = screen.getByTestId(positionClass());
    const target = await screen.findByTestId(`toast-item-${id}`);
    expect(container).toBeInTheDocument();
    expect(container.id).toBe(toast.POSITION.TOP_RIGHT);
    expect(target).toBeInTheDocument();
  });

  it('containerId shoule be custom position', async () => {
    const customPosition = toast.POSITION.BOTTOM_CENTER;
    const id = toast('hello', { position: toast.POSITION.BOTTOM_CENTER });
    const container = screen.getByTestId(positionClass(customPosition));
    const target = await screen.findByTestId(`toast-item-${id}`);
    expect(container).toBeInTheDocument();
    expect(container.id).toBe(customPosition);
    expect(target).toBeInTheDocument();
  });

  test('custom containerId', async () => {
    const containerId = 'A';
    toast('hello', { containerId, position: toast.POSITION.BOTTOM_LEFT });
    const container = await screen.findByTestId(positionClass(toast.POSITION.BOTTOM_LEFT));
    expect(container.id).toBe(containerId);
  });
});
