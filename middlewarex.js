import { NextResponse } from 'next/server';
import {jwtVerify} from "jose";


export async function middlewarex(req) {
    let res = null;

    const {pathname} = req.nextUrl;
    console.log("=====>",pathname)

    // return NextResponse.next();

    if (pathname.startsWith("/api/")) {


        const token = req.cookies.get("token")?.value;

        if ( token == null ) {

            return NextResponse.redirect(new URL('/', req.url));

        }

        try {

            const  tok= await jwtVerify(token,new TextEncoder().encode("raju"));


            if (tok.payload.role.toLowerCase() === "admin"|| tok.payload.role === "employee"||tok.payload.role === "Agent") {

                req.headers.set('lol', JSON.stringify(tok.payload));

                console.log("===XXXrr==>",tok.payload)





            }else {

              //  return NextResponse.redirect(new URL('/', req.url));
            }




        }catch (e){

            console.log("=====>",e)
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
    matcher: '/api/:path*', // Apply middleware to API routes only
};

