import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";

import { client, ClientInit } from "../utils/api-client";

function useClient() {
  return React.useCallback(
    (endpoint: RequestInfo, config?: ClientInit) => client(endpoint, config),
    []
  );
}

type AuthGuardProps = {
  children: JSX.Element;
};

function Auth({ children }: AuthGuardProps) {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated") {
      signIn();
    }
  }, [status, router]);

  if (status === "authenticated") {
    return children;
  }

  return <div>Loading...</div>;
}

export { useClient, Auth };
export * from "next-auth/react";
