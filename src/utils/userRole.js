const userRole = {
  student: "student",
  admin: "admin",
  superAdmin: "superAdmin",
};
export const authAccess = (...roles) => (roles.length ? [userRole.superAdmin, ...roles] : Object.keys(userRole));
export default userRole;
