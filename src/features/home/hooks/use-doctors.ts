import { useQuery } from "@tanstack/react-query";

import { mockApiClient } from "@/services/mock/mock-api-client";
import { queryKeys } from "@/services/query/query-keys";

export function useDoctors() {
  return useQuery({
    queryKey: queryKeys.doctors(),
    queryFn: () => mockApiClient.getDoctors(),
  });
}
