import { NextResponse } from 'next/server';
import {jwtVerify} from "jose";


export async function middleware(req) {
    let res = null;

    const {pathname} = req.nextUrl;

    // return NextResponse.next();

    if (pathname.startsWith("/employee")) {


        const token = req.cookies.get("token")?.value;

        if ( token == null ) {

            return NextResponse.redirect(new URL('/', req.url));

        }

        try {

            const  tok= await jwtVerify(token,new TextEncoder().encode("raju"));


            if (tok.payload.role === "admin"|| tok.payload.role === "employee"||tok.payload.role === "Agent") {

                req.headers.lol = JSON.stringify(tok.payload)


            }else {

              //  return NextResponse.redirect(new URL('/', req.url));
            }

            console.log("=====>",tok.payload)





        }catch (e){


        }

    }


    if (req.method === 'OPTIONS') {
        res = new Response(JSON.stringify("reset"), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if (res == null) {
        res = NextResponse.next();
    }

    if (req.headers.get('origin')) {
        res.headers.set('Access-Control-Allow-Origin', req.headers.get('origin'));
        res.headers.set('Access-Control-Allow-Credentials', 'true');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'content-type');

    }


    return res;


}


export const config = {
    matcher: '/:path*', // Apply middleware to API routes only
};

