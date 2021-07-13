import * as React from "react";

import { client, ClientInit } from "../utils/api-client";

function useClient() {
  return React.useCallback(
    (endpoint: RequestInfo, config?: ClientInit) => client(endpoint, config),
    []
  );
}

export { useClient };
