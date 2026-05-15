type PermissionType = "MENU" | "BUTTON" | "API";

interface PermissionRow {
  permissionId: string;
  permissionName: string;
  permissionCode: string;
  permissionType: PermissionType;

  parentId: string | null;

  routePath?: string;
  component?: string;
  icon: string;

  sortOrder?: number;
}

interface PermissionNode extends PermissionRow {
  children?: PermissionNode[];
}

interface PermissionTypeMeta {
  label: string;
  type: string;
}

export type {
  PermissionType,
  PermissionRow,
  PermissionNode,
  PermissionTypeMeta,
};
