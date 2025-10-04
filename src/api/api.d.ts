type ApiDeclaration = {
  counter: {
    get: ["/api/counter/count"];
    post: [
      "/api/counter/increment",
      "/api/counter/decrement",
      "/api/counter/reset"
    ];
  };
};
