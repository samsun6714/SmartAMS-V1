export enum AssetStatus {
  ACTIVE = "active",
  MAINTENANCE = "maintenance",
  DISPOSED = "disposed",
  MISSING = "missing",
}

export enum AssetCategory {
  IT_EQUIPMENT = "it_equipment",
  FURNITURE = "furniture",
  VEHICLE = "vehicle",
  OFFICE_SUPPLIES = "office_supplies",
  MACHINERY = "machinery",
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: AssetCategory;
  status: AssetStatus;
  location: string;
  department: string;
  purchaseDate: string;
  purchasePrice: number;
  lastAuditDate?: string;
  lastMaintenanceDate?: string;
  currentValue?: number;
  condition: "good" | "fair" | "poor" | "broken";
  ownerId?: string;
  description?: string;
}

export interface MaintenanceRecord {
  id: string;
  assetId: string;
  date: string;
  description: string;
  cost: number;
  performer: string;
  status: "completed" | "pending";
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  role: "admin" | "manager" | "auditor" | "staff";
  department: string;
  avatarUrl?: string;
}
