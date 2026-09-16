import { useQuery } from "@tanstack/react-query";

import { mockApiClient } from "@/services/mock/mock-api-client";
import { queryKeys } from "@/services/query/query-keys";

export function useSlots(doctorId: string | null, date: string) {
  return useQuery({
    queryKey: queryKeys.slots(doctorId ?? "none", date),
    queryFn: () => {
      if (!doctorId) {
        return Promise.resolve([]);
      }

      return mockApiClient.getSlots(doctorId, date);
    },
    enabled: Boolean(doctorId),
  });
}
