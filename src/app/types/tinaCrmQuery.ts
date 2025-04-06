export interface TinaCrmQuery<T> {
  data: T;
  variables: {
    relativePath: string;
  };
  query: string;
}
