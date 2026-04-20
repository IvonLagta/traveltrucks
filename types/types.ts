import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ReactNode,
} from "react";

export interface CamperFilters {
	form?: string;
	transmission?: string;
	engine?: string;
	location?: string;
}

export interface CamperListItemDto {
	id: string;
	name: string;
	price: number;
	rating: number;
	location: string;
	description: string;
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
	engine: string | string[];
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

export type ButtonVariant = "mainBtn" | "clearBtn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	href?: string;
	target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
	rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
}

export interface BookingFormProps {
	camperId: string;
}

export interface CamperCardProps {
	camper: CamperListItemDto;
}

export interface CamperGalleryProps {
	camperName: string;
	gallery: CamperImageEntity[];
}

export interface CamperReviewsProps {
	reviews: ReviewEntity[];
}

export interface CatalogFiltersProps {
	filterOptions?: FiltersResponseDto;
	pendingFilters: CamperFilters;
	onPendingFiltersChange: (
		updater: (prev: CamperFilters) => CamperFilters,
	) => void;
	onApply: () => void;
	onReset: () => void;
}

export interface FilterRadioGroupProps {
	label: string;
	name: string;
	options: string[];
	value?: string;
	onChange: (value?: string) => void;
}

export interface LoadMoreButtonProps {
	isLoading: boolean;
	onClick: () => void;
}

export interface PageProps {
	params: Promise<{ Id: string }>;
}

export interface ProvidersProps {
	children: ReactNode;
}
