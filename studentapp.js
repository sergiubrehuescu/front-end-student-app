let controller;
let slideScene;
let maindescription = document.querySelector('.main-description');

let dashboard = document.querySelector("#dashboard");
let students = document.querySelector("#students");

dashboard.addEventListener("click",() =>{
    dashboard.setAttribute("href", `http://127.0.0.1:5500/dashboard.html`);
})

students.addEventListener("click",() => {
    students.setAttribute("href", `http://127.0.0.1:5500/students.html`);
})

function animateSlides(){
    //Init Controller
    controller = new ScrollMagic.Controller();
    //Select some things
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //Loop over each slide
    sliders.forEach(slide =>{
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        //GSAP
        const slideTl = gsap.timeline({defaults: {duration:1,ease:'power2.inOut'}})
        slideTl.fromTo(revealImg,{x:'0%'},{x:'100%'});
        slideTl.fromTo(img,{scale:2},{scale:1},'-=1');
        slideTl.fromTo(revealText,{x:'0%'},{x:'100%'},'-=0.75');
        slideTl.fromTo(nav,{y:'-100%'},{y:"0%"},'-=0.5');
        //Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement:main-description,
            triggerHook:0.25,
        })
        .setTween(slideTl)
        .addIndicators({colorStart:'white',colorTrigger:'white',name:'slide'})
        .addTo(controller)
    }); 
}

animateSlides();