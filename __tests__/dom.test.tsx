import '@testing-library/jest-dom';

describe('dom test', () => {
  test.concurrent('testing-library/jest-dom', async () => {
    const div = document.createElement('div');
    div.id = 'adm-mask';
    expect(div).not.toBeNull();
    expect(div).toBeDefined();
    expect(div).toBeInstanceOf(HTMLDivElement);

    await document.body.appendChild(div);

    const mask = document.body.querySelector('#adm-mask') as HTMLElement;
    expect(mask).toMatchSnapshot();
    div.remove();
    expect(mask).not.toBeInTheDocument();
  });
});
