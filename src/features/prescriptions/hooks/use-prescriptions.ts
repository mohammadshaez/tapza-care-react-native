import { useQuery } from "@tanstack/react-query";

import { mockApiClient } from "@/services/mock/mock-api-client";
import { queryKeys } from "@/services/query/query-keys";

export function usePrescriptions() {
  return useQuery({
    queryKey: queryKeys.prescriptions(),
    queryFn: () => mockApiClient.getPrescriptions(),
  });
}
