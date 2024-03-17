const columns = [
  { name: "ID", uid: "serialNo" },
  { name: "NAME", uid: "name", sortable: true },
  { name: "PREFIX", uid: "prefix" },
  { name: "EMAIL", uid: "email" },
  { name: "PHONE", uid: "phoneNo" },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const users = [
  {
    serialNo: "1",
    name: "Samraj Samuel",
    prefix: "Dear",
    nickName: "Samraj",
    email: "arjunsanrose@gmail.com",
    phoneNo: "",
  },
  {
    serialNo: "2",
    name: "Lincy John",
    prefix: "Dear",
    nickName: "Lincy",
    email: "arjunsanrose@gmail.com",
    phoneNo: "8123456789",
  },
  {
    serialNo: "3",
    name: "Deepak",
    prefix: "Dear",
    nickName: "Deepak",
    email: "arjunsanrose@gmail.com",
    phoneNo: "8123456789",
  },
];

export { columns, users, statusOptions };
