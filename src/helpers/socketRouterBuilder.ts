const socketRouterBuilder = (routes) => (socket) =>
  Object.values(routes).forEach((item) => {
    const params = [
      item.name,
      (data, callback, ...args) =>
        item.handler(socket, data, callback, ...args),
    ].filter(Boolean);
    socket[item.method](...params);
  });

export { socketRouterBuilder };
