export interface Computer {
  id: string;
  name: string;
  serialNumber: string;
  processor: string;
  ram: string;
  storage: string;
  status: "working" | "not-working";
}

export interface User {
  id: string;
  username: string;
  nationalId: string;
  fullName: string;
  role: "admin" | "user";
}

export interface ChangeRecord {
  id: string;
  date: string;
  computerName: string;
  serialNumber: string;
  responsibleUser: string;
  action: "create" | "update" | "delete";
  description: string;
}

export const mockComputers: Computer[] = [
  { id: "1", name: "LAB-PC-001", serialNumber: "SN-2024-0001", processor: "Intel Core i5-12400", ram: "16 GB", storage: "512 GB SSD", status: "working" },
  { id: "2", name: "LAB-PC-002", serialNumber: "SN-2024-0002", processor: "Intel Core i7-13700", ram: "32 GB", storage: "1 TB SSD", status: "working" },
  { id: "3", name: "LAB-PC-003", serialNumber: "SN-2024-0003", processor: "AMD Ryzen 5 5600", ram: "8 GB", storage: "256 GB SSD", status: "not-working" },
  { id: "4", name: "LAB-PC-004", serialNumber: "SN-2024-0004", processor: "Intel Core i3-12100", ram: "8 GB", storage: "512 GB SSD", status: "working" },
  { id: "5", name: "OFFICE-PC-001", serialNumber: "SN-2024-0005", processor: "Intel Core i5-13500", ram: "16 GB", storage: "1 TB HDD", status: "working" },
  { id: "6", name: "OFFICE-PC-002", serialNumber: "SN-2024-0006", processor: "AMD Ryzen 7 5800X", ram: "32 GB", storage: "512 GB SSD", status: "not-working" },
  { id: "7", name: "LIB-PC-001", serialNumber: "SN-2024-0007", processor: "Intel Core i5-11400", ram: "16 GB", storage: "256 GB SSD", status: "working" },
  { id: "8", name: "LIB-PC-002", serialNumber: "SN-2024-0008", processor: "Intel Core i3-10100", ram: "8 GB", storage: "500 GB HDD", status: "working" },
];

export const mockUsers: User[] = [
  { id: "1", username: "admin", nationalId: "12345678", fullName: "Carlos Administrador", role: "admin" },
  { id: "2", username: "jperez", nationalId: "87654321", fullName: "Juan Pérez", role: "user" },
  { id: "3", username: "mlopez", nationalId: "11223344", fullName: "María López", role: "user" },
  { id: "4", username: "agarcia", nationalId: "55667788", fullName: "Ana García", role: "admin" },
];

export const mockHistory: ChangeRecord[] = [
  { id: "1", date: "2024-03-08 10:30", computerName: "LAB-PC-001", serialNumber: "SN-2024-0001", responsibleUser: "Carlos Administrador", action: "create", description: "Initial registration via TOML import" },
  { id: "2", date: "2024-03-08 11:15", computerName: "LAB-PC-002", serialNumber: "SN-2024-0002", responsibleUser: "Juan Pérez", action: "update", description: "RAM upgraded from 16 GB to 32 GB" },
  { id: "3", date: "2024-03-07 09:00", computerName: "LAB-PC-003", serialNumber: "SN-2024-0003", responsibleUser: "María López", action: "update", description: "Status changed to Not Working - motherboard failure" },
  { id: "4", date: "2024-03-07 14:20", computerName: "OFFICE-PC-001", serialNumber: "SN-2024-0005", responsibleUser: "Carlos Administrador", action: "create", description: "Manual registration" },
  { id: "5", date: "2024-03-06 16:45", computerName: "OFFICE-PC-002", serialNumber: "SN-2024-0006", responsibleUser: "Ana García", action: "update", description: "Status changed to Not Working - power supply issue" },
  { id: "6", date: "2024-03-06 08:30", computerName: "LIB-PC-001", serialNumber: "SN-2024-0007", responsibleUser: "Juan Pérez", action: "create", description: "Registered via TOML file upload" },
];
