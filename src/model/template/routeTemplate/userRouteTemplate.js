exports.userRouteTemplate = {
  baseRoute: "/user",
  login: {
    route: "/login/",
    desc: "Use for login user as normal account",
  },
  registerNormal: {
    route: "/register/normal/",
    desc: "Use for register permanent account for normal user",
  },
  registerAnonymous: {
    route: "/register/anonymous/",
    desc: "Use for register temporary account for user and maybe a bot!",
  },
  verify: {
    route: "/verify/",
    desc: "Use for verify login (normal account) and register (both mode)",
  },
  logoutNormal: {
    route: "/logout/normal",
    desc: "Use for logout user from normal account",
  },
  logoutAnonymous: {
    route: "/logout/anonymous",
    desc: "Use for burn user anonymous account (every footprint)",
  },
}