import { type } from "arktype";
import BaseDTO from "../../../common/dto/dto.js";

class LoginDTO extends BaseDTO {
  static schema = type({
    email: "string.email",
    password: "string >= 6",
    role: type("'customer' | 'admin'").default("customer"),
  });
}

export default LoginDTO;
