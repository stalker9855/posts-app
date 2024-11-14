import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const user = authService.getUser()


  if (user) {
    if (state.url === "/login" || state.url === "/register") {
      router.navigate(["/main"]);
      return false;
    }
    return true;
  } else {
    router.navigate(["/login"]);
    return false;
  }
};
