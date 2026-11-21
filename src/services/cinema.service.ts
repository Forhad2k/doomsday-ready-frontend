import { apiClient } from "../lib/api-client";
import {
  Cinema,
  CreateCinemaPayload,
  BookingQuoteData,
  ApiResponse,
} from "../types";

export const cinemaService = {
  async getAllCinemas(): Promise<Cinema[]> {
    const res = await apiClient.get<ApiResponse<Cinema[]>>("/cinemas");
    return res.data.data;
  },

  async createCinema(payload: CreateCinemaPayload): Promise<Cinema> {
    const res = await apiClient.post<ApiResponse<Cinema>>("/cinemas", payload);
    return res.data.data;
  },

  async getBookingQuote(
    cinemaId: string,
    groupSize: number
  ): Promise<BookingQuoteData> {
    const res = await apiClient.get<ApiResponse<BookingQuoteData>>(
      `/cinemas/${cinemaId}/booking`,
      {
        params: { groupSize },
      }
    );
    return res.data.data;
  },
};
