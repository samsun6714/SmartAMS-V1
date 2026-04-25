import { Asset, AssetCategory, AssetStatus } from "../types";

const MOCK_ASSETS: Asset[] = [
  {
    id: "1",
    code: "IT-2024-001",
    name: "MacBook Pro M3 Max",
    category: AssetCategory.IT_EQUIPMENT,
    status: AssetStatus.ACTIVE,
    location: "Floor 4, IT Dept",
    department: "Information Technology",
    purchaseDate: "2024-01-15",
    purchasePrice: 95000,
    condition: "good",
    ownerId: "user-1",
    description: "High performance laptop for development",
  },
  {
    id: "2",
    code: "IT-2024-002",
    name: "Dell UltraSharp 27\" U2723QE",
    category: AssetCategory.IT_EQUIPMENT,
    status: AssetStatus.ACTIVE,
    location: "Floor 4, IT Dept",
    department: "Information Technology",
    purchaseDate: "2024-01-20",
    purchasePrice: 18000,
    condition: "good",
    description: "4K Monitor with USB-C Hub",
  },
  {
    id: "3",
    code: "FN-2023-015",
    name: "Ergonomic Office Chair - Model X",
    category: AssetCategory.FURNITURE,
    status: AssetStatus.ACTIVE,
    location: "Main Lobby",
    department: "Operations",
    purchaseDate: "2023-05-10",
    purchasePrice: 12500,
    condition: "fair",
  },
  {
    id: "4",
    code: "IT-2022-088",
    name: "iPad Air 5th Gen",
    category: AssetCategory.IT_EQUIPMENT,
    status: AssetStatus.MAINTENANCE,
    location: "Storage Room A",
    department: "Sales & Marketing",
    purchaseDate: "2022-11-05",
    purchasePrice: 23900,
    condition: "poor",
    description: "Screen flicker issues, sent for repair",
  },
  {
    id: "5",
    code: "VH-2021-003",
    name: "Company Car - Toyota Camry",
    category: AssetCategory.VEHICLE,
    status: AssetStatus.ACTIVE,
    location: "Parking Lot B",
    department: "Operations",
    purchaseDate: "2021-08-12",
    purchasePrice: 1500000,
    condition: "good",
  },
];

export const assetService = {
  getAssets: async (): Promise<Asset[]> => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ASSETS), 500);
    });
  },
  
  getAssetById: async (id: string): Promise<Asset | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_ASSETS.find(a => a.id === id)), 300);
    });
  },
  
  createAsset: async (asset: Omit<Asset, "id">): Promise<Asset> => {
    const newAsset = { ...asset, id: Math.random().toString(36).substr(2, 9) };
    return newAsset;
  }
};
