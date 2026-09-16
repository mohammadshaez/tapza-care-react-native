import { useMutation, useQueryClient } from "@tanstack/react-query";

import { mockApiClient } from "@/services/mock/mock-api-client";
import { queryKeys } from "@/services/query/query-keys";
import type { CreateBookingInput } from "@/types/booking";
import type { Slot } from "@/types/slot";

export type CreateBookingVariables = CreateBookingInput & {
  date: string;
};

type BookingMutationContext = {
  previousSlots: Slot[] | undefined;
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ doctorId, slotId }: CreateBookingVariables) =>
      mockApiClient.createBooking({
        doctorId,
        slotId,
      }),

    onMutate: async (variables): Promise<BookingMutationContext> => {
      const key = queryKeys.slots(variables.doctorId, variables.date);

      await queryClient.cancelQueries({
        queryKey: key,
      });

      const previousSlots = queryClient.getQueryData<Slot[]>(key);

      queryClient.setQueryData<Slot[]>(key, (currentSlots = []) =>
        currentSlots.map((slot) =>
          slot.id === variables.slotId
            ? {
                ...slot,
                available: false,
              }
            : slot,
        ),
      );

      return {
        previousSlots,
      };
    },

    onError: (_error, variables, context) => {
      if (context?.previousSlots) {
        queryClient.setQueryData(
          queryKeys.slots(variables.doctorId, variables.date),
          context.previousSlots,
        );
      }
    },

    onSettled: async (_booking, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.slots(variables.doctorId, variables.date),
      });
    },
  });
}
