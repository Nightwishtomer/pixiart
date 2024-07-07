import { settings } from "./index.js"; // Рендер. Работа с рендером



export class Rendering {
  constructor() {
    console.log("Class Rendering is Load" );

    



    this.canvas = document.getElementById(settings.canvasElementById);
    this.ctx = this.canvas.getContext(settings.ctxContext);

  }
  get(){
    console.log("get Class Rendering");
  }


  // очитска игрового поля
  clearPlayingField(){
    return this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /*
  // отрисовать картинку. входные данные: картинка (myImageData)
  renderingImage(imageData, posWidth, posHeight){
    this.cRendering.ctx.putImageData(imageData, posWidth, posHeight); 
  }
  */

  //iniCanvas() {
    //console.log(this.canvasElementById);
   // this.canvas = document.getElementById("myCanvas");
    //this.ctx = this.canvas.getContext("2d");
  //}

  drawImage(image, width, height){
    this.ctx.drawImage(image, width, height);
  }


 
  getImageData(posX, posY, width, height){
    return this.ctx.getImageData(posX, posY, width, height);//this.myImageData = ctx.getImageData(left, top, width, height);
  }



  // не сделанно
  // смена масштаба поля
  // change of scale field
  changeScaleField(scale){
    settings.cell.size.x *= scale;
    settings.cell.size.y *= scale;
    settings.cell.size.fontStyle *= scale;
  }












}