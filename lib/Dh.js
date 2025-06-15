export const dh={
    // ImUrl:"http://localhost:3000/uploads/",
    // api:"http://localhost:3000/api",

    ImUrl:"https://cdn.pratibamicrofinance.com/",
    // //
    api:"https://admin.pratibamicrofinance.com/api",



    role:["Admin","Employer","Manager","Customer","Agent"],

    loadx:(visiblex=false)=>{
      const  ab= document.getElementById("loadingx");

    if (visiblex){
        ab.classList.remove("d-none");
        ab.classList.add("d-flex");
    }else {

            ab.classList.remove("d-flex");
        ab.classList.add("d-none");


    }
    }



}

