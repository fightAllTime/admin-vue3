import type { PermissionType, PermissionTypeMeta } from "../api";

const permissionTypeMap: Record<PermissionType, PermissionTypeMeta> = {
  MENU: { label: "菜单", type: "primary" },
  BUTTON: { label: "按钮", type: "success" },
  API: { label: "接口", type: "warning" },
};

export {
  permissionTypeMap,
};
