import { screen } from '@testing-library/vue';
import { toast } from '../../src';

describe('toastify icons', () => {
  it('default have no icon', async () => {
    toast('hello');
    const content = await screen.findByTestId(`toast-content`);
    expect(content.previousElementSibling).not.toBeInTheDocument();
  });

  it('INFO icon', async () => {
    toast('hello', { type: toast.TYPE.INFO });
    const icon = await screen.findByTestId(`toast-icon-${toast.TYPE.INFO}`);
    expect(icon).toBeInTheDocument();
  });

  it('SUCCESS icon', async () => {
    const id = toast('hello', { type: toast.TYPE.INFO });
    const target = await screen.findByTestId(`toast-item-${id}`);
    const icon = await target.firstElementChild?.firstElementChild as HTMLElement;
    expect(icon).toBeInTheDocument();
    expect(icon.dataset.testid).toBe(`toast-icon-${toast.TYPE.INFO}`);
  });

  it('WARNING icon', async () => {
    const id = toast('hello', { type: toast.TYPE.WARNING });
    const target = await screen.findByTestId(`toast-item-${id}`);
    const icon = await target.firstElementChild?.firstElementChild as HTMLElement;
    expect(icon).toBeInTheDocument();
    expect(icon.dataset.testid).toBe(`toast-icon-${toast.TYPE.WARNING}`);
  });

  it('ERROR icon', async () => {
    const id = toast('hello', { type: toast.TYPE.ERROR });
    const target = await screen.findByTestId(`toast-item-${id}`);
    const icon = await target.firstElementChild?.firstElementChild as HTMLElement;
    expect(icon).toBeInTheDocument();
    expect(icon.dataset.testid).toBe(`toast-icon-${toast.TYPE.ERROR}`);
  });
});
``
