// lib/camperApi.ts
import axios from "axios";

const DEFAULT_API_URL = "https://campers-api.goit.study";
const API_BASE = process.env.API_URL?.replace(/\/+$/, "") || DEFAULT_API_URL;

// Создаём экземпляр axios с настройками
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 секунд
});

// ==================== ТИПЫ (те же, что и раньше) ====================

export interface CamperListItemDto {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  coverImage: string;
  totalReviews: number;
}

export interface CamperListResponseDto {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItemDto[];
}

export interface FiltersResponseDto {
  forms: string[];
  transmissions: string[];
  engines: string[];
}

export interface CamperImageEntity {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface CamperDetailsEntity {
  id: string;
  name: string;
  price: number;
  rating: number;
  totalReviews: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string[];
  amenities: string[];
  gallery: CamperImageEntity[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewEntity {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingRequestDto {
  name: string;
  email: string;
}

export interface BookingRequestResponseDto {
  message: string;
}

// API ФУНКЦИИ

export async function getAllCampers(
  page = 1,
  perPage = 4,
): Promise<CamperListResponseDto> {
  const { data } = await api.get("/campers", {
    params: { page, perPage },
  });
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

export async function getBackendStatus(): Promise<string> {
  const { data } = await api.get("/campers", {
    params: { page: 1, perPage: 3 },
  });

  if (Array.isArray(data.campers) && data.campers.length > 0) {
    return `Backend работает: получено ${data.campers.length} кемперов, первый: ${data.campers[0].name}`;
  }

  return "Backend работает, но не удалось получить кемперы.";
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
