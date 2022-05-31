import { createParamDecorator } from "@nestjs/common";
import { Userdto } from "./dto/user.dto";


 export const GetUser = createParamDecorator((data,req): Userdto => { return req.user; });

//  export const User = createParamDecorator(
//   (data: string, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );