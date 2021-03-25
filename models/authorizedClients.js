const clients = [
  {
    client_id:
      "bafea36f7a90ff41329bc34bf6959b9ff583891f",
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
      "20235ae90dcf88389ccd693f57b622d21d33c24b",
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
