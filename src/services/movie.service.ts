import { apiClient } from "../lib/api-client";
import {
  Movie,
  CreateMoviePayload,
  UpdateMoviePayload,
  RewatchPlanData,
  ApiResponse,
} from "../types";

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    const res = await apiClient.get<ApiResponse<Movie[]>>("/movies");
    return res.data.data;
  },

  async getMovieById(id: string): Promise<Movie> {
    const res = await apiClient.get<ApiResponse<Movie>>(`/movies/${id}`);
    return res.data.data;
  },

  async createMovie(payload: CreateMoviePayload): Promise<Movie> {
    const res = await apiClient.post<ApiResponse<Movie>>("/movies", payload);
    return res.data.data;
  },

  async updateMovie(id: string, payload: UpdateMoviePayload): Promise<Movie> {
    const res = await apiClient.patch<ApiResponse<Movie>>(`/movies/${id}`, payload);
    return res.data.data;
  },

  async getRewatchOrder(movieId: string): Promise<RewatchPlanData> {
    const res = await apiClient.get<ApiResponse<RewatchPlanData>>(
      `/movies/${movieId}/rewatch-order`
    );
    return res.data.data;
  },
};
