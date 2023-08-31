import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};

export default withAuth(
  async function middleware(req) {
    const url = new URL(req.nextUrl);
    if (url.pathname !== "/" && url.pathname !== "/403") {
      const token = req.nextauth.token;
      // @ts-ignore
      if (token) {
        // @ts-ignore
        if (token.data.is_management) {
          if (url.pathname.startsWith("/admin")) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(new URL("/403", req.url));
          }
        } else {
          return NextResponse.next();
        }
      } else {
        return NextResponse.redirect(new URL("/403", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true;
      },
    },
  }
);
