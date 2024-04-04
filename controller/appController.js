import { Master } from "../Database/index.js";

const appController = {};

appController.getProfile = (req, res) => {
  const jwt_id = req.id;
  Master.findOne({
    attributes: [
      "name",
      "email",
      "id",
      "phoneNumber",
      "birthday",
      "gender",
      "title",
      "username",
    ],
    where: {
      id: jwt_id,
    },
  })
    .then((response) => {
      res.send({ data: response, status: 1 });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send({ message: `User not present`, status: 0 });
    });
};

appController.updateProfile = (req, res) => {
  const { name, phoneNumber, birthday, gender, username, title } = req.body;
  const jwt_id = req.id;

  Master.update(
    { name, phoneNumber, birthday, gender, username, title },
    { where: { id: jwt_id } }
  )
    .then((result) => {
      if (result[0] > 0) {
        res.send({
          message: `Profile updated successfully`,
          data: {},
          status: 2,
        });
      } else {
        res.send({ message: `No changes are done`, data: {}, status: 1 });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .send({ message: `Some error while updating profile`, status: 0 });
    });
};

export default appController;
