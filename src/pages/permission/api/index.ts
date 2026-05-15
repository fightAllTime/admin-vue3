interface PermissionRow {
  permissionId: string;
  permissionName: string;
  permissionCode: string;
  parentId: string | null;
}

interface PermissionNode extends PermissionRow {
  children?: PermissionNode[];
}

export type { PermissionRow, PermissionNode };
