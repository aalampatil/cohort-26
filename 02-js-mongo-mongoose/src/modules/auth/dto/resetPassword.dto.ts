import { type } from "arktype";
import BaseDTO from "../../../common/dto/dto.js";

class ResetPasswordDTO extends BaseDTO {
  static schema = type({
    password: "string >= 6",
  });
}

export default ResetPasswordDTO;
