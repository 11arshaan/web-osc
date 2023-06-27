import "./style.css";
import p5 from "p5";

import createSketch from "./sketch";

let handpose;
let video;
let predictions = [];
let render = createSketch(video, handpose, predictions);

//create instance of p5
let p5canvas = new p5(render, "app");
