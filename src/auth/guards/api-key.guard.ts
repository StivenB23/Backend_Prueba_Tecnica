import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header("Authorization");
    // Verifica si authHeader está presente y contiene "Bearer "
    if (authHeader && authHeader.includes("Bearer ")) {
      const token = authHeader.split(" ").pop();
      if (token) {
        // Simulación de validación del token
        const isAuth = token === "1234"; // Cambia esto con tu lógica de validación real

        if (!isAuth) {
          throw new UnauthorizedException("Not allowed");
        }
        
        return true; // Token válido
      }
    }

    // Si authHeader es undefined o no contiene "Bearer ", o si token es undefined
    throw new UnauthorizedException("Not allowed");
  }
}
