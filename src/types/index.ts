export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  runtime: number;
  watched: boolean;
  prerequisites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMoviePayload {
  title: string;
  releaseYear: number;
  runtime: number;
  watched?: boolean;
  prerequisites?: string[];
}

export interface UpdateMoviePayload {
  title?: string;
  releaseYear?: number;
  runtime?: number;
  watched?: boolean;
  prerequisites?: string[];
}

export interface RewatchOrderMovie {
  id: string;
  title: string;
  releaseYear: number;
  runtime: number;
  watched: boolean;
}

export interface RewatchPlanData {
  target: {
    id: string;
    title: string;
  };
  movies: RewatchOrderMovie[];
  totalMovies: number;
  watchedCount: number;
  unwatchedCount: number;
  unwatchedRuntime: number;
}

export interface Cinema {
  id: string;
  name: string;
  bundleSizes: number[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCinemaPayload {
  name: string;
  bundleSizes: number[];
}

export interface BundleQuote {
  size: number;
  quantity: number;
}

export interface BookingQuoteData {
  groupSize: number;
  possible: boolean;
  totalBundles: number;
  bundles: BundleQuote[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  code?: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}
