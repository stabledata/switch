import {
  AnyRouter,
  createRouter as tanStackCreateRouter,
} from "@tanstack/react-router";
import { routeTree } from './.routes.tree.js';
import { inflateState } from './state/registry.js';
import { rpcClient } from './surface.client.js';

export type RouterContext = {
  rpc?: typeof rpcClient;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

export function createRouter(injections?: RouterContext): AnyRouter {
  const router = tanStackCreateRouter({
    routeTree,
    context: {
      ...injections,
    },
    dehydrate: (): RouterContext => {
      // async state need to be dehydrated from method above
      // easier to just handle it all there
      return {
        ...injections,
      };
    },
    hydrate: (context) => {
      // inflate state from the state.registry.
      // note that loaders and beforeLoaders also receive context,
      // but you'll have to add it to context/state manually or else
      // it may not be there, unless you use RPC round trip (self request)
      inflateState(context);
    },
  });

  return router;
}
