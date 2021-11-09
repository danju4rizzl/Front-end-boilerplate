export type InferPromiseResult<T> = T extends { [key: string]: any }
  ? T & { error: any }
  : void;

/**
 * Handler which takes a promise and returns object signature with `{error, ...data}`.
 * @param  {Promise} promise    Promise to handle
 * @return {Object}             Object with signature `{error, ...data}`
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function awaitTo<T>(
  promise: Promise<T>,
): Promise<InferPromiseResult<T>> {
  if (promise && typeof promise.then === 'function') {
    return promise
      .then((data) => data as any)
      .catch((error) => ({ error: error?.error || error } as any));
  } else {
    return promise as any;
  }
}
