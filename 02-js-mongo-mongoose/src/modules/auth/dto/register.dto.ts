import { type } from "arktype";
import BaseDTO from "../../../common/dto/dto.js";

class RegisterDTO extends BaseDTO {
  static schema = type({
    name: type("string.trim").to("string >= 3"),
    email: "string.email",
    password: "string >= 6",
    role: type("'customer' | 'admin'").default("customer"),
  });
}

export default RegisterDTO;
