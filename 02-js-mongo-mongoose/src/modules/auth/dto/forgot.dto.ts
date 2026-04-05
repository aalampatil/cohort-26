import { type } from "arktype";
import BaseDTO from "../../../common/dto/dto.js";

class ForgotPasswordDTO extends BaseDTO {
  static schema = type({
    email: "string.email",
    role: type("'customer' | 'admin'").default("customer"),
  });
}

export default ForgotPasswordDTO;
