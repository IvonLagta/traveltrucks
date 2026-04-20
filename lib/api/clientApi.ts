import { createApiClient } from "./api";
import type {
  CamperFilters,
  CamperListResponseDto,
  FiltersResponseDto,
  CamperDetailsEntity,
  ReviewEntity,
  BookingRequestDto,
  BookingRequestResponseDto,
} from "@/types/types";

const api = createApiClient();

export async function getAllCampers(
  page = 1,
  perPage = 4,
  filters?: CamperFilters,
): Promise<CamperListResponseDto> {
  const params: Record<string, unknown> = { page, perPage };
  if (filters?.form) params.form = filters.form;
  if (filters?.transmission) params.transmission = filters.transmission;
  if (filters?.engine) params.engine = filters.engine;
  if (filters?.location) params.location = filters.location;
  const { data } = await api.get("/campers", { params });
  return data;
}

export async function getCamperFilters(): Promise<FiltersResponseDto> {
  const { data } = await api.get("/campers/filters");
  return data;
}

export async function getCamperById(id: string): Promise<CamperDetailsEntity> {
  const { data } = await api.get(`/campers/${id}`);
  return data;
}

export async function getCamperReviews(id: string): Promise<ReviewEntity[]> {
  const { data } = await api.get(`/campers/${id}/reviews`);
  return data;
}

export async function createBookingRequest(
  camperId: string,
  payload: BookingRequestDto,
): Promise<BookingRequestResponseDto> {
  const { data } = await api.post(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data;
}

export type {
  CamperFilters,
  CamperListItemDto,
  CamperListResponseDto,
  FiltersResponseDto,
  CamperImageEntity,
  CamperDetailsEntity,
  ReviewEntity,
  BookingRequestDto,
  BookingRequestResponseDto,
} from "@/types/types";
