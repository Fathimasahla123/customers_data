let customers = [];
let nextId = 1;

const getAllCustomers = (req, res) => {
  const { name, email, location, page = 1, limit = 10 } = req.query;

  let filteredCustomers = customers;

  if (name) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (email) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  if (location) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  res.status(200).json({
    total: filteredCustomers.length,
    page: parseInt(page),
    limit: parseInt(limit),
    customers: paginatedCustomers,
  });
};

const getCustomerById = (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.status(200).json(customer);
};

const createCustomer = (req, res) => {
  const { name, email, location } = req.body;

  if (!name || !email || !location) {
    return res
      .status(400)
      .json({ message: "Name, email, and location are required" });
  }

  const newCustomer = {
    id: nextId++,
    name,
    email,
    location,
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

const updateCustomer = (req, res) => {
  const customerId = parseInt(req.params.id);
  const { name, email, location } = req.body;

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customer.name = name || customer.name;
  customer.email = email || customer.email;
  customer.location = location || customer.location;

  res.status(200).json(customer);
};

const deleteCustomer = (req, res) => {
  const customerId = parseInt(req.params.id);
  const customerIndex = customers.findIndex((c) => c.id === customerId);

  if (customerIndex === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customers.splice(customerIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
