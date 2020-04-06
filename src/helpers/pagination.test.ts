import { getPage, PAGE_SIZE } from 'helpers/pagination';

describe('getPage', () => {
  it('should return correct page', () => {
    const arrSize = 120;
    const data = new Array(arrSize).fill(0).map((_, i) => i);
    expect(getPage(data, 0)).toHaveLength(PAGE_SIZE);
    expect(getPage(data, 0)).toContain(PAGE_SIZE - 1);
    expect(getPage(data, 0)).not.toContain(PAGE_SIZE);

    expect(getPage(data, 1)).toHaveLength(PAGE_SIZE);
    expect(getPage(data, 1)).toContain(PAGE_SIZE);
    expect(getPage(data, 1)).not.toContain(PAGE_SIZE * 2);

    expect(getPage(data, 2).length).toBeLessThanOrEqual(PAGE_SIZE);
  });
});
