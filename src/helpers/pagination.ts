export const PAGE_SIZE = 56;

export const getPage = (data: any[], page: number) => {
  return data.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
};
