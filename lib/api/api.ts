import axios from "axios";
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

export const DEFAULT_API_URL = "https://campers-api.goit.study";
export const API_BASE =
  process.env.API_URL?.replace(/\/+$/, "") || DEFAULT_API_URL;

export function createApiClient() {
  return axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
  });
}
