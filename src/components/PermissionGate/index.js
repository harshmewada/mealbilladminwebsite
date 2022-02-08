import { cloneElement } from "react";
import { useSelector } from "react-redux";
import { PERMISSIONS } from "../../contants/index";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export const usePermissions = ({ scopes = [] }) => {
  const { role, permissions } = useSelector((state) => state.user);

  const permissionGranted = hasPermission({ permissions, scopes });
  return permissionGranted;
};

export default function PermissionsGate({
  children,
  scopes = [],
  errorProps = null,
}) {
  const permissionGranted = usePermissions({ scopes: scopes });

  if (permissionGranted) {
    return children || null;
  }

  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });
  if (!permissionGranted) return <></>;

  // return children;
}
