import { settings } from "./index.js"; // Рендер. Работа с рендером


//settings.imageUrl






export class Picture {
  constructor() {
    
    //console.log("Class Picture is Load ");
    //console.log(settings);
    //console.log(settings);

    

    this.image = new Image(); // Создаёт новый элемент изображения
    this.image.src = settings.imageUrl; // Устанавливает путь

    this.myImageData;
  }
  get(){
    return this.image;
  }


  getWidth(){
    return this.image.width;
  }

  getHeight(){
    return this.image.height;
  }


  
}