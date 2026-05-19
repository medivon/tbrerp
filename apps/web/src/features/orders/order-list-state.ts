import type {
  DraftOrderFixture,
  OrderFixture,
  OrderStatus,
} from "@/features/orders/fixtures/orders";

export const orderPageSizeOptions = [25, 50, 100] as const;

export type OrderPageSize = (typeof orderPageSizeOptions)[number];

export type OrderListFilters = {
  orderStatus: OrderStatus | null;
  query: string;
  shipmentStatus: "waiting-confirmation" | null;
};

export type PaginationState = {
  page: number;
  pageSize: OrderPageSize;
};

export function filterOrders(
  orders: OrderFixture[],
  filters: OrderListFilters,
): OrderFixture[] {
  const query = normalizeQuery(filters.query);

  return orders.filter((order) => {
    if (filters.orderStatus && order.orderStatus !== filters.orderStatus) {
      return false;
    }

    if (
      filters.shipmentStatus === "waiting-confirmation" &&
      order.shipmentSummary.kind !== "waiting-confirmation"
    ) {
      return false;
    }

    if (!query) {
      return true;
    }

    return getOrderSearchFields(order).some((field) =>
      normalizeQuery(field).includes(query),
    );
  });
}

export function filterDraftOrders(
  drafts: DraftOrderFixture[],
  queryValue: string,
): DraftOrderFixture[] {
  const query = normalizeQuery(queryValue);

  if (!query) {
    return drafts;
  }

  return drafts.filter((draft) =>
    [
      draft.draftNo,
      draft.customerName,
      draft.customerPhone,
      draft.recipientName,
      draft.itemSummary,
      draft.ownerName,
      draft.status,
      ...draft.missingData,
    ].some((field) => normalizeQuery(field).includes(query)),
  );
}

export function hasOrderListFilters(filters: OrderListFilters): boolean {
  return (
    filters.query.trim().length > 0 ||
    filters.orderStatus !== null ||
    filters.shipmentStatus !== null
  );
}

export function paginateRows<T>(
  rows: T[],
  pagination: PaginationState,
): {
  currentPage: number;
  endIndex: number;
  pageRows: T[];
  startIndex: number;
  totalPages: number;
} {
  const totalPages = Math.max(1, Math.ceil(rows.length / pagination.pageSize));
  const currentPage = Math.min(Math.max(1, pagination.page), totalPages);
  const startIndex =
    rows.length === 0 ? 0 : (currentPage - 1) * pagination.pageSize;
  const endIndex = Math.min(rows.length, startIndex + pagination.pageSize);

  return {
    currentPage,
    endIndex,
    pageRows: rows.slice(startIndex, endIndex),
    startIndex,
    totalPages,
  };
}

function getOrderSearchFields(order: OrderFixture): string[] {
  return [
    order.id,
    order.customerName,
    order.customerPhone,
    order.customerTier,
    order.recipientName,
    order.recipientPhone,
    order.address,
    order.createdDate,
    order.createdDateShort,
    order.orderStatus,
    order.payment.term,
    order.payment.followUpStatus,
    order.shipmentSummary.label,
    order.shipmentSummary.detail,
    order.socialContact,
    ...order.lines.flatMap((line) => [
      line.title,
      line.skuCode,
      line.skuName,
      line.color,
      line.dimensions,
      line.shipmentState,
      line.shipmentNo,
      line.stockWarning,
      line.customDetail,
      line.deliveryDate,
      line.job?.id,
      line.job?.status,
      line.job?.currentDepartment,
      line.shipmentBlockedReason,
      line.editBlockedReason,
      line.cancelledReason,
    ]),
    ...order.shipmentRounds.flatMap((round) => [
      round.shipmentNo,
      round.carrier,
      round.tracking,
      round.status,
      round.createdDate,
      round.sentOutDate,
    ]),
    ...order.timeline.flatMap((event) => [event.title, event.detail]),
  ].filter((field): field is string => Boolean(field));
}

function normalizeQuery(value: string | undefined): string {
  return (value ?? "").trim().toLowerCase();
}
