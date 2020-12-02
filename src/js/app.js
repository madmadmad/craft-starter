// * Load a JS library
// 1.) In terminal, npm install <package-name>
// 2.) Here, type import PackageName from 'package-name'
// most JS packages will have instructions for instlaling via NPM/Yarn

// * Load a local component file.
// import './components/navigation.js';

// For local development / webpack dev server. 
if(module.hot){
  module.hot.accept();
}

// ! This is just an example of how to dynamically import a module for pages that require it.
// ! In this case, pages that have an element with an ID of "slider-example" will load this JS file.
// ! This is a huge win for performance. No need to load heavy JS libraries on every page if it doesn't need it.
if (document.getElementById("slider-example")) {
  import("./components/sliderExample" /* webpackChunkName: "SliderExample" */).then(instance => {
    instance.initSliderExample();
  });
}