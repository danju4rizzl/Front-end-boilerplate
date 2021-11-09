import * as React from 'react';
import {
  useQuery,
  UseQueryOptions,
  QueryClient,
  MutationFunction,
  UseMutationOptions,
  useMutation,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryFunctionContext,
} from 'react-query';

import apiRequest from '@utils/apiRequest';

// Access the key, status and page variables in your query function!
export const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function useBaseMutation<TData, TVar, TContext = undefined>(
  request: MutationFunction<TData, TVar>,
  key: QueryKey,
  onMutate?: (variables: TVar) => Promise<TContext | TData> | TContext | TData,
  options?: UseMutationOptions<TData, unknown, TVar, TContext | TData>,
) {
  return useMutation(request, {
    // When mutate is called:
    onMutate,
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _newTodo, oldData) => {
      queryClient.setQueryData(key, oldData);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
    ...options,
  });
}

export function fetcher({ queryKey }: QueryFunctionContext) {
  const [url, params] = queryKey as [string, unknown];
  return apiRequest.getRequest(url, {
    ...Object.assign({}, params),
  });
}

export function useBaseQuery<T>(
  url: string,
  params?: unknown,
  options?: UseQueryOptions<T>,
) {
  const key: any = [url];
  if (params) {
    key.push(params);
  }
  return useQuery<T>({ queryKey: key, queryFn: fetcher, ...options });
}

export function paginationFetcher({
  queryKey,
  pageParam = 0,
}: QueryFunctionContext) {
  const [url, params = {}] = queryKey as [string, any];
  params.limit = params.limit || 10;
  params.skip = pageParam * params.limit;
  return apiRequest.getRequest(url, {
    ...Object.assign({}, params),
  });
}

export function useBaseQueryPagination<T>(
  url: string,
  limit: number,
  params?: any,
  options?: UseQueryOptions<T[]>,
) {
  const [data, setData] = React.useState<T[]>([]);
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const { isLoading } = useBaseQuery<T[]>(
    url,
    { ...params, limit, skip: page * limit },
    {
      ...options,
      onSuccess(result) {
        setData([...data.slice(0, page * limit), ...result]);
        setHasMore(result.length >= limit);
        options?.onSuccess?.(result);
      },
    },
  );
  const isFetchingNextPage = isLoading && !!page;
  return {
    data,
    page,
    isLoading: isLoading && !isFetchingNextPage,
    hasMore,
    isFetchingNextPage,
    fetchNextPage() {
      setPage(page + 1);
    },
  };
}

export function useBaseQueryInfinite<T>(
  url: string,
  params?: any,
  options?: UseInfiniteQueryOptions<T[]>,
) {
  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    data,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<T[]>(params ? [url, params] : [url], {
    queryFn: paginationFetcher,
    getNextPageParam: (_, pages) => pages.length,
    ...options,
  });

  const initialLoad = !!url && !data && !error;
  const item = data?.pages ? data.pages.flat() : undefined;
  const lastLength = data?.pages?.[data.pages.length - 1].length || 0;

  if (data?.pageParams?.length === 1 && !isFetching) {
    fetchNextPage();
  }

  return {
    isError,
    error,
    data: item,
    fetchNextPage,
    initialLoad,
    loading: isLoading || isFetching,
    isFetchingNextPage,
    hasMore: initialLoad || lastLength > 0,
    refetch,
  };
}
