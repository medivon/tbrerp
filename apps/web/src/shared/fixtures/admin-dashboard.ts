import type { NavigationItemId } from "@/shared/navigation/navigation";
import type { StatusChipProps } from "@thaiboran/ui";

export type DashboardCardFixture = {
  id: string;
  title: string;
  count: number;
  unit: string;
  status: string;
  statusVariant: StatusChipProps["variant"];
  subtext: string;
  actionLabel: string;
  destination: NavigationItemId;
  destinationPath?: string;
  icon: "orders" | "jobs" | "shipments" | "production" | "finance";
};

export type CriticalPreviewFixture = {
  id: string;
  imageSrc: string;
  workName: string;
  customerName: string;
  receivedDate: string;
  reference: string;
  chips: Array<{
    label: string;
    variant: StatusChipProps["variant"];
  }>;
  riskContext: string;
  relatedDate: string;
  destination: NavigationItemId;
};

export const dashboardCards: DashboardCardFixture[] = [
  {
    id: "orders-follow-up",
    title: "ออเดอร์ที่ต้องติดตาม",
    count: 18,
    unit: "Order",
    status: "ยังต้องตามงาน",
    statusVariant: "action",
    subtext: "กำลังผลิต 11 • พร้อมสร้างรอบจัดส่ง 7",
    actionLabel: "ดูออเดอร์",
    destination: "orders",
    icon: "orders",
  },
  {
    id: "active-jobs",
    title: "งานกำลังผลิต",
    count: 17,
    unit: "Job",
    status: "กำลังทำงาน",
    statusVariant: "warning",
    subtext: "งานลูกค้า 11 • ผลิตเข้าสต๊อก 6",
    actionLabel: "ดูภาพรวมงาน",
    destination: "jobs",
    icon: "jobs",
  },
  {
    id: "waiting-shipment",
    title: "รอสร้างรอบจัดส่ง",
    count: 7,
    unit: "Order",
    status: "พร้อมสร้างรอบจัดส่ง",
    statusVariant: "success",
    subtext: "มี COD 3 ออเดอร์",
    actionLabel: "เปิดคิวงาน",
    destination: "shipments",
    destinationPath: "/modules/shipments",
    icon: "shipments",
  },
  {
    id: "shipment-confirmation",
    title: "ยืนยันการจัดส่ง",
    count: 4,
    unit: "Shipment round",
    status: "รอเพิ่มข้อมูล",
    statusVariant: "warning",
    subtext: "เพิ่มเลขติดตามพัสดุ / หลักฐานขนส่ง",
    actionLabel: "เปิดคิวงาน",
    destination: "shipments",
    destinationPath: "/modules/shipments/confirmation",
    icon: "shipments",
  },
  {
    id: "production-follow-up",
    title: "งานผลิตต้องติดตาม",
    count: 2,
    unit: "Follow-up case",
    status: "รอรับทราบ Revision",
    statusVariant: "revision",
    subtext: "ไม่เข้าใจให้ติดต่อหา 1",
    actionLabel: "เปิดคิวงาน",
    destination: "jobs",
    icon: "production",
  },
  {
    id: "financial-follow-up",
    title: "ติดตาม COD / Payment",
    count: 6,
    unit: "Follow-up item",
    status: "ต้องติดตามเงิน",
    statusVariant: "danger",
    subtext: "ค้างตรวจสอบ 6 รายการ",
    actionLabel: "เปิดคิวงาน",
    destination: "expenses",
    icon: "finance",
  },
];

export const criticalPreviewItems: CriticalPreviewFixture[] = [
  {
    id: "critical-teak-cabinet",
    imageSrc: "/sector-1-thumbnails/teak-display-cabinet.png",
    workName: "ตู้โชว์ไม้สักแกะลาย",
    customerName: "คุณศิริพร",
    receivedDate: "08 พ.ค. 67",
    reference: "ORD-240522-018 / JOB-O-0241",
    chips: [
      { label: "ใกล้ส่ง", variant: "warning" },
      { label: "ค้าง 18 วัน", variant: "danger" },
    ],
    riskContext: "ค้างนาน",
    relatedDate: "กำหนดส่ง 26 พ.ค. 67",
    destination: "jobs",
  },
  {
    id: "critical-carved-table",
    imageSrc: "/sector-1-thumbnails/carved-console-table.png",
    workName: "โต๊ะคอนโซลแกะลาย",
    customerName: "คุณนภัส",
    receivedDate: "11 พ.ค. 67",
    reference: "ORD-240525-006 / JOB-O-0250",
    chips: [
      { label: "รอวัตถุดิบ", variant: "warning" },
      { label: "งานด่วน", variant: "danger" },
    ],
    riskContext: "รอวัตถุดิบ",
    relatedDate: "กำหนดส่ง 24 พ.ค. 67",
    destination: "jobs",
  },
  {
    id: "critical-shipment-proof",
    imageSrc: "/sector-1-thumbnails/shipment-chair-set.png",
    workName: "ชุดเก้าอี้รับแขก",
    customerName: "คุณมาลี",
    receivedDate: "14 พ.ค. 67",
    reference: "ORD-240528-014 / JOB-O-0267",
    chips: [
      { label: "ยืนยันการจัดส่ง", variant: "action" },
      { label: "รอหลักฐานส่ง", variant: "warning" },
    ],
    riskContext: "รอเพิ่มข้อมูล",
    relatedDate: "ส่งออกแล้ววันนี้",
    destination: "shipments",
  },
];
