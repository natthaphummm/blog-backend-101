import {
    UserCreate,
    UserCreateResponse,
    UserLoginResponse,
} from '../../schemas';

export interface IAuthService {
    register(data: UserCreate): Promise<UserCreateResponse>;
    login(data: UserCreate): Promise<UserLoginResponse>;
    logout(refreshToken: string): Promise<void>;
    refreshToken(
        refreshToken: string,
    ): Promise<{ accessToken: string; newRefreshToken: string }>;
}
