import { createParamDecorator } from "@nestjs/common";
import { SignUpDto } from "./dto/signup.dto";


 export const GetUser = createParamDecorator((data,req): SignUpDto => { return req.user; });

//  export const User = createParamDecorator(
//   (data: string, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );