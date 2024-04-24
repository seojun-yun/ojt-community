import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data, req: ExecutionContext) => {
    const request = req.switchToHttp().getRequest();
    return request.user;
});