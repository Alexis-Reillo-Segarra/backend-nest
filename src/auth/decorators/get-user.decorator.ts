import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

type data = 'email' | 'fullName' | 'roles';


export const GetUser = createParamDecorator((data: data, ctx: ExecutionContext) => {


    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new InternalServerErrorException('User not found (request)')

    if (data) {
        switch (data) {
            case 'email':
                return user.email;
            case 'fullName':
                return user.fullName;
            case 'roles':
                return user.roles;
            default:
                break
        }
    }

    return user
});