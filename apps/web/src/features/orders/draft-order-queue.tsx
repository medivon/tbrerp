"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilePenLine, Search } from "lucide-react";
import {
  Button,
  EmptyState,
  PageHeader,
  StatusChip,
  SurfaceCard,
  ToolbarShell,
} from "@thaiboran/ui";

import { DraftStatusChip } from "@/features/orders/components/order-status-chip";
import { OrderTabs } from "@/features/orders/components/order-tabs";
import { getDraftOrderFixturesWithSaved } from "@/features/orders/order-entry-memory-store";
import { filterDraftOrders } from "@/features/orders/order-list-state";
import { orderHref, orderRoutes } from "@/features/orders/routes";
import type { FixtureUser } from "@/shared/fixtures/users";

export function DraftOrderQueue({ currentUser }: { currentUser: FixtureUser }) {
  const [query, setQuery] = useState("");
  const drafts = getDraftOrderFixturesWithSaved();
  const filteredDrafts = useMemo(
    () => filterDraftOrders(drafts, query),
    [drafts, query],
  );
  const hasQuery = query.trim().length > 0;

  function clearSearch() {
    setQuery("");
  }

  return (
    <div className="mx-auto grid w-full max-w-[1480px] gap-5">
      <PageHeader
        actions={
          <Button asChild>
            <Link href={orderHref(orderRoutes.create, currentUser)}>
              สร้างออเดอร์
            </Link>
          </Button>
        }
        description="คิวร่างออเดอร์ที่บันทึกไว้ มีเลขร่างและต้องตรวจสอบก่อนสร้างออเดอร์"
        meta={
          <div className="flex flex-wrap gap-2">
            <StatusChip variant="neutral">
              {filteredDrafts.length} จาก {drafts.length} ร่าง
            </StatusChip>
            {hasQuery ? (
              <StatusChip variant="action">กำลังค้นหา</StatusChip>
            ) : null}
          </div>
        }
        title="ร่างออเดอร์"
      />

      <OrderTabs activeTab="drafts" currentUser={currentUser} />

      <ToolbarShell
        actions={
          <Button
            disabled={!hasQuery}
            onClick={clearSearch}
            size="sm"
            title={hasQuery ? undefined : "ยังไม่มีคำค้นให้ล้าง"}
            type="button"
            variant="outline"
          >
            ล้างตัวกรอง
          </Button>
        }
        leading={
          <Search aria-hidden className="h-4 w-4 text-muted-foreground" />
        }
      >
        <label className="sr-only" htmlFor="draft-search">
          ค้นหาร่างออเดอร์
        </label>
        <input
          className="min-h-10 min-w-0 flex-1 basis-full rounded-md border border-border bg-surface px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:basis-auto sm:min-w-[22rem]"
          id="draft-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ค้นหาเลขร่าง ลูกค้า เบอร์ ผู้รับ รายการ สถานะ หรือข้อมูลที่ยังไม่ครบ"
          type="search"
          value={query}
        />
      </ToolbarShell>

      {filteredDrafts.length > 0 ? (
        <SurfaceCard className="overflow-hidden" padding="none">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="bg-subtle text-xs font-bold text-muted-foreground">
                <tr>
                  <th className="px-3 py-3" scope="col">
                    เลขร่าง
                  </th>
                  <th className="px-3 py-3" scope="col">
                    ลูกค้า
                  </th>
                  <th className="px-3 py-3" scope="col">
                    ผู้รับสินค้า
                  </th>
                  <th className="px-3 py-3" scope="col">
                    จำนวนรายการ
                  </th>
                  <th className="px-3 py-3" scope="col">
                    แก้ไขล่าสุด
                  </th>
                  <th className="px-3 py-3" scope="col">
                    ผู้รับผิดชอบหลัก
                  </th>
                  <th className="px-3 py-3" scope="col">
                    สถานะ
                  </th>
                  <th className="px-3 py-3 text-right" scope="col">
                    การทำงาน
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDrafts.map((draft) => (
                  <tr
                    className="border-t border-border bg-surface align-top transition-colors hover:bg-subtle/50"
                    key={draft.draftNo}
                  >
                    <td className="px-3 py-4 font-extrabold text-foreground">
                      {draft.draftNo}
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-semibold text-foreground">
                        {draft.customerName}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {draft.customerPhone}
                      </p>
                    </td>
                    <td className="px-3 py-4">{draft.recipientName}</td>
                    <td className="px-3 py-4">
                      <p className="font-semibold text-foreground">
                        {draft.itemCount} รายการ
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {draft.itemSummary}
                      </p>
                    </td>
                    <td className="px-3 py-4">{draft.lastUpdated}</td>
                    <td className="px-3 py-4">{draft.ownerName}</td>
                    <td className="px-3 py-4">
                      <div className="grid gap-2">
                        <DraftStatusChip status={draft.status} />
                        {draft.missingData.map((missing) => (
                          <StatusChip key={missing} variant="warning">
                            {missing}
                          </StatusChip>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <Button asChild size="sm" variant="outline">
                        <Link
                          href={orderHref(
                            `${orderRoutes.create}?draft=${draft.draftNo}`,
                            currentUser,
                          )}
                        >
                          ทำต่อ
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid lg:hidden">
            {filteredDrafts.map((draft) => (
              <article
                className="grid gap-3 border-b border-border p-4 last:border-b-0"
                key={draft.draftNo}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-foreground">
                      {draft.draftNo}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {draft.customerName} • {draft.customerPhone}
                    </p>
                  </div>
                  <DraftStatusChip status={draft.status} />
                </div>
                <p className="text-sm leading-6 text-foreground">
                  {draft.itemSummary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {draft.missingData.map((missing) => (
                    <StatusChip key={missing} variant="warning">
                      {missing}
                    </StatusChip>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                  <span>แก้ไขล่าสุด {draft.lastUpdated}</span>
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={orderHref(
                        `${orderRoutes.create}?draft=${draft.draftNo}`,
                        currentUser,
                      )}
                    >
                      ทำต่อ
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </SurfaceCard>
      ) : (
        <EmptyState
          action={
            hasQuery ? (
              <Button
                onClick={clearSearch}
                size="sm"
                type="button"
                variant="outline"
              >
                ล้างตัวกรอง
              </Button>
            ) : (
              <Button asChild>
                <Link href={orderHref(orderRoutes.create, currentUser)}>
                  สร้างออเดอร์
                </Link>
              </Button>
            )
          }
          description={
            hasQuery
              ? "ไม่พบร่างออเดอร์ที่ตรงกับคำค้นนี้"
              : "ร่างเกิดเมื่อกดบันทึกร่างเท่านั้น"
          }
          icon={<FilePenLine aria-hidden className="h-5 w-5" />}
          title={
            hasQuery
              ? "ไม่พบร่างออเดอร์ที่ตรงกับตัวกรอง"
              : "ไม่มีร่างออเดอร์ที่กำลังทำอยู่"
          }
        />
      )}
    </div>
  );
}
