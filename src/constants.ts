import { AssetCategory, AssetStatus } from "./types";
import { Laptop, Table, Car, Package, Settings, CheckCircle2, AlertCircle, Trash2, HelpCircle } from "lucide-react";

export const STATUS_CONFIG = {
  [AssetStatus.ACTIVE]: {
    label: "พร้อมใช้งาน",
    color: "status-active",
    icon: CheckCircle2,
  },
  [AssetStatus.MAINTENANCE]: {
    label: "ซ่อมบำรุง",
    color: "status-maintenance",
    icon: Settings,
  },
  [AssetStatus.DISPOSED]: {
    label: "จำหน่ายออก",
    color: "status-disposed",
    icon: Trash2,
  },
  [AssetStatus.MISSING]: {
    label: "สูญหาย",
    color: "status-missing",
    icon: AlertCircle,
  },
};

export const CATEGORY_CONFIG = {
  [AssetCategory.IT_EQUIPMENT]: {
    label: "อุปกรณ์ไอที",
    icon: Laptop,
  },
  [AssetCategory.FURNITURE]: {
    label: "เฟอร์นิเจอร์",
    icon: Table,
  },
  [AssetCategory.VEHICLE]: {
    label: "ยานพาหนะ",
    icon: Car,
  },
  [AssetCategory.OFFICE_SUPPLIES]: {
    label: "อุปกรณ์สำนักงาน",
    icon: Package,
  },
  [AssetCategory.MACHINERY]: {
    label: "เครื่องจักร",
    icon: Settings,
  },
};

export const DEPARTMENTS = [
  "Finance",
  "Human Resources",
  "Information Technology",
  "Operations",
  "Sales & Marketing",
  "Engineering",
];
