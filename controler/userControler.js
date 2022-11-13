const { getUserData, saveUserData } = require("../utils");

module.exports.getRandomUserControler = (req, res) => {
  const { users } = getUserData();

  res.send(users[Math.floor(Math.random() * users.length)]);
  res.end();
};
// get all data
module.exports.getAllUserControler = (req, res) => {
  const { users } = getUserData();
  console.log(users);

  res.send(users);
  res.end();
};
// post data

module.exports.postUserControler = (req, res) => {
  const { users } = getUserData();
  const post = req.body;
  if (
    !post.name ||
    !post.id ||
    !post.address ||
    !post.gender ||
    !post.photUrl ||
    !post.contact
  ) {
    res.status(401).send({ error: true, message: "data are missing" });
  }
  console.log(users);
  if (users.map((data) => data.name).includes(post.name)) {
    res.status(403).send("data already exist");
  }

  users.push(post);
  saveUserData(users);
};

// update user

module.exports.updateUsersControler = (req, res) => {
  const { users } = getUserData();

  const id = req.params.id;

  if (!users.map((user) => user.id).includes(Number(id))) {
    res.status(401).send({ message: "the user does not exist" });
  }
  const updateData = users.map((user) => {
    return {
      ...user,
      name: id == user.id ? req.body.name : user.name,
      photUrl: id == user.id ? req.body.photUrl : user.photUrl,
    };
  });
  saveUserData({ users: updateData });
  res.send(updateData);
  res.end();
};

//bulk update using patch method
module.exports.bulkUpdateUsersControler = (req, res) => {
  const { users } = getUserData();

  // const id = req.params.id;

  // if (!users.map((user) => user.id).includes(Number(id))) {
  //   res.status(401).send({ message: "the user does not exist" });
  // }
  const data = req.body;
  // const updateData = data.forEach((i) =>
  //   users.map((user) => {
  //     return {
  //       ...user,

  //       photUrl: i.id == user.id ? i.photUrl : user.photUrl,
  //     };
  //   })
  // );
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (users[i].id == data[j].id) {
        users[i].name = data[j].name;
      }
    }
  }
  saveUserData({ users: users });
  res.send(users);
  res.end();
};

//  delete user
module.exports.deleteUsers = (req, res) => {
  const { users } = getUserData();

  const id = req.params.id;

  if (!users.map((user) => user.id).includes(Number(id))) {
    res.status(401).send({ message: "the user does not exist" });
  }
  const deletedData = users.filter((user) => user.id != id);
  saveUserData({ users: deletedData });
  res.send(deletedData);
  res.end();
};
