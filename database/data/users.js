const users = [
  {
    email: "admin@main.com",
    password: "123456",
    name: "Ruth Smith",
    createdAt: {
      $date: {
        $numberLong: "1673098166103",
      },
    },
    address: {
      street: "23 Commercial Street",
      postcode: "SE11 4GB",
      city: "London",
      country: "uk",
    },
    isAdmin: true,
  },
  {
    email: "user@mail.com",
    password: "123456",
    name: "Peter Crafter",
    createdAt: {
      $date: {
        $numberLong: "1673098166103",
      },
    },
    address: {
      street: "12 Grove Street",
      postcode: "NH4 4TH",
      city: "London",
      country: "uk",
    },
  },
  {
    email: "user2@mail.com",
    password: "123456",
    name: "Hazel Nut",
    createdAt: {
      $date: {
        $numberLong: "1673098166103",
      },
    },
    address: {
      street: "28 Church Road",
      postcode: "SW25 8KM",
      city: "London",
      country: "uk",
    },
  },
];

module.exports = users;
