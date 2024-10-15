export const dh={
    // ImUrl:"http://77.37.44.246:8000/",
    // api:"http://77.37.44.246/"

    ImUrl:"http://localhost:3000/uploads/",
    //
    api:"http://localhost:3000/",

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