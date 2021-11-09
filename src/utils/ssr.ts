import { NextPageContext } from 'next';

let serverSideContext: NextPageContext;

export function updateServerSideContext(context: NextPageContext) {
  serverSideContext = context;
}

export function getBaseUrl() {
  return serverSideContext
    ? `${serverSideContext.req?.headers['x-forwarded-proto'] || 'http:'}//${
        serverSideContext.req?.headers.host
      }`
    : window.location.origin;
}
