import "./styles.css";
import { greeting } from "./greeting.ts";
import dummyImg from "./dummy.jpg";

console.log(greeting);

const image = document.createElement("img");
image.src = dummyImg;

document.body.appendChild(image);
