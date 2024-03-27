import { Master } from "../Database/index.js";
import Joi from "joi";
import { Op } from "sequelize";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {};

authController.register = (req, res) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "edu"] },
      }),
    username: Joi.string().alphanum().min(2).required().messages({
      "string.min": `Username should have a minimum length of 2 `,
    }),
    name: Joi.string().min(2).required().messages({
      "string.min": `Name should have a minimum length of 2 `,
    }),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9@_!$&-.]{3,30}$")),
    phoneNumber: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .optional(),
    token: Joi.number(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res
      .status(400)
      .send({ status: 0, message: "Payload error", error: error.details });
  } else {
    console.log(value);
    const salt = bcryptjs.genSaltSync(10);
    const hashed = bcryptjs.hashSync(value.password, salt);
    Master.create({ ...value, password: hashed })
      .then(() => {
        res.status(201).send({ status: 1, message: "User Registered" });
      })
      .catch((e) => {
        // console.log(JSON.parse(JSON.stringify(e)));
        if (e.name === "SequelizeUniqueConstraintError") {
          res.status(409).send({ status: 0, message: "User already exists" });
        } else {
          console.log(e);
          res
            .status(500)
            .send({ status: 0, message: "Some issue while registering user" });
        }
      });
  }
};

authController.login = (req, res) => {
  const { email = "", username = "", password = "" } = req.body;
  Master.findOne({
    attributes: [
      "email",
      "id",
      "name",
      ["password", "hashed"],
      "phoneNumber",
      "token",
      "expireAt",
      "isActive",
    ],
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  })
    .then((response) => {
      if (response) {
        const data = response.toJSON();
        console.log(data);
        const { id, name, email, hashed, isActive } = data;
        const isMatched = bcryptjs.compareSync(password, hashed ? hashed : "");
        if (isActive === true) {
          if (isMatched) {
            //token generation
            const token = jwt.sign(
              {
                id,
                name,
                email,
              },
              process.env.SECRET,
              { expiresIn: "2d" }
            );
            res.send({ message: `Logged in succesfully`, token, status: 1 });
          } else {
            res.send({ message: `Invalid credentials`, status: 0 });
          }
        } else {
          res.send({ message: `Your account is not active yet!`, status: 0 });
        }
      } else {
        res.send({ message: `Invalid credentials`, status: 0 });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: `Trouble signing you in`, error: err, status: 0 });
    });
};
export default authController;
