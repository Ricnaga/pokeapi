export type Params = Record<string, string> & {
  // limit: pagesize
  offset?: string;

  // offset: previous/nextPage
  limit?: string;
};

export type Pagination<T = unknown> = {
  results: Array<T>;
};
