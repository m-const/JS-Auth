const clients = [
  {
    client_id:
      "c4a0fd61c2ea8f234b4dfde7ff892a9abb9bbb1b625a37fda0b3aad0f5136a2f279334b37312e00ca7af622fd106e687",
    identifyer: "John Smith",
    description: "",
    redirect_uri: {
      name: "Johns Website",
      description: "Johns personal blog",
      expires: 0,
      URI: "http://example.test",
    },

    scope: "admin",
  },
  {
    client_id:
      "c4a0fd61c2ea8f234b4dfde7ff892a9abb9bbb1b625a37fda0b3aad0f5136a2f279334b37312e00ca7af622fd106e687",
    identifyer: "Sarah Walker",
    description: "",
    redirect_uri: {
      name: "ACME",
      description: "ACMEco Web portal",
      expires: 0,
      URI: "http://ACME.test",
    },

    scope: "user",
  },
];

module.exports = {
  clients,
};
