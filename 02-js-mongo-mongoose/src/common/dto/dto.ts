import { type } from "arktype";

class BaseDTO {
  static schema = type({});

  static getType() {
    return this.schema.infer;
  }

  static parse(data: unknown) {
    return this.schema(data);
  }
}

export default BaseDTO;

// class BaseDTO {
//   static schema = type({});
// }

// export type BaseDTOType = typeof BaseDTO.schema.infer;

// export default BaseDTO;

// const User = type({
// 	name: "string",
// 	platform: "'android' | 'ios'",
// 	"versions?": "(number | string)[]"
// })

// extract the type if needed
