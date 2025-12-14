module.exports.requireRole = (role, ctx) => {
  if (ctx.role !== role) throw new Error("Forbidden");
};
