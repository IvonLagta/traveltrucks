"use client";

import { useState, useCallback } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import CamperCard from "@/components/camper-card/camper-card";
import CatalogFilters from "@/components/catalog-filters/catalog-filters";
import LoadMoreButton from "@/components/pagination/load-more-button";
import css from "./page.module.css";
import {
  getAllCampers,
  getCamperFilters,
  CamperListItemDto,
  CamperFilters,
} from "@/lib/camperApi";

const PER_PAGE = 4;

export default function CatalogPage() {
  const [filters, setFilters] = useState<CamperFilters>({});
  const [pendingFilters, setPendingFilters] = useState<CamperFilters>({});

  const { data: filterOptions } = useQuery({
    queryKey: ["camper-filters"],
    queryFn: getCamperFilters,
    staleTime: Infinity,
  });

  const {
    data,
    error,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) => getAllCampers(pageParam, PER_PAGE, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const allCampers: CamperListItemDto[] =
    data?.pages.flatMap((page) => page.campers) ?? [];

  const handleApply = useCallback(() => {
    setFilters(pendingFilters);
  }, [pendingFilters]);

  const handleReset = useCallback(() => {
    setPendingFilters({});
    setFilters({});
  }, []);

  return (
    <div className={css.page}>
      <div className={css.layout}>
        <CatalogFilters
          filterOptions={filterOptions}
          pendingFilters={pendingFilters}
          onPendingFiltersChange={(updater) =>
            setPendingFilters((prev) => updater(prev))
          }
          onApply={handleApply}
          onReset={handleReset}
        />

        <main className={css.main}>
          {isError && (
            <div className={css.error}>
              Error loading data:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </div>
          )}

          <div className={css.grid}>
            {isPending
              ? Array.from({ length: PER_PAGE }).map((_, i) => (
                  <div key={i} className={css.skeleton} />
                ))
              : allCampers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}

            {isFetchingNextPage &&
              Array.from({ length: PER_PAGE }).map((_, i) => (
                <div key={`skeleton-${i}`} className={css.skeleton} />
              ))}
          </div>

          {hasNextPage && !isPending && (
            <LoadMoreButton
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          )}

          {!isPending && !hasNextPage && allCampers.length > 0 && (
            <p className={css.resultCount}>
              Showing all {allCampers.length} campervans
            </p>
          )}

          {!isPending && allCampers.length === 0 && !isError && (
            <div className={css.empty}>
              No campervans were found matching your search criteria.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
