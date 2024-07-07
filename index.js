//import { Settings  } from "./settings.js";
//import { Deck      } from "./Deck.js";  // колода
//import { Card      } from "./Card.js";  // игральная карта
//import { Mouse     } from "./Mouse.js"; // мышка
import { Color } from "./Color.js"; // Цвета. Работа с цветами
import { Field } from "./Field.js"; // Поле. Работа с полем
import { Picture } from "./Picture.js"; // Картинка. Работа с картинкой
import { Rendering } from "./Rendering.js"; // Рендер. Работа с рендером



export let welcome = "Welcome";

export let settings  = {
  imageData : {
    posX : 0,
    posY : 0,
  },
  drawImage : {
    width : 0,
    height : 0,
  },
  canvasElementById : "myCanvas",
  ctxContext: "2d",
  imageUrl : "img.png",
  correctionPositionCursor: {
    x : -2,
    y : -1,
  },
  cell : {
    size : {
      x : 20,
      y : 20, 
    },
    fontStyle : 12,
  },
};

export function start(){
  let game = new Pixiart();
  //console.log(game);
}

export class Pixiart {
  constructor() {


    console.log(welcome);
    this.settings = {


      imageData : {
        posX : 0,
        posY : 0,

      },
      drawImage : {
        width : 0,
        height : 0,
      },


      canvasElementById : "myCanvas",
      ctxContext: "2d",



      imageUrl : "img.png",
      correctionPositionCursor: {
        x : -2,
        y : -1,
      },
      cell : {
        size : {
          x : 20,
          y : 20, 
        },
        fontStyle : 12,
      },
    };




   settings.cell.fontStyle = 20;




    this.cColor   = new Color(); // Цвета. Работа с цветами
    this.cField   = new Field(); // Поле. Работа с полем
    this.cPicture   = new Picture(); // Картинка. Работа с картинкой
    this.cRendering   = new Rendering(); // // Рендер. Работа с рендером
    





    

   

    this.getPictureData();

    this.mouseEvent();

    this.listButtons = "";
    this.buttons = [];


    this.myImageData;
  }




  getPictureData(){

    

   


    this.cPicture.image.addEventListener("load", (e) => {
      this.start();
    });

  }

  // начало игры
  start(){
    this.cRendering.drawImage(this.cPicture.image, this.settings.drawImage.width, this.settings.drawImage.height);
    this.cPicture.myImageData = this.cRendering.getImageData(this.settings.imageData.posX, this.settings.imageData.posY, this.cPicture.getWidth(), this.cPicture.getHeight());//this.myImageData = ctx.getImageData(left, top, width, height);
    this.cField.data = this.cColor.getProcessingImageData(this.cPicture.myImageData.data); // получение данных о пикселях и приведение в нужный формат.
    this.cColor.createColors(this.cField.data); //создание создаем массив всех существующих цветов и присваивание цветам уникальных номеров. и создание массива с серыми цветами.
    this.setColorHTML(); // создаем html с цветами
    this.cColor.setSelected(1); // Установка выбранного цвета
    this.cField.data = this.cColor.changeColorToNumbers(this.cField.data); // меняет цвета на номера в массиве поля
    this.cField.imageMap = this.cField.createImageMap(this.cField.data, this.cPicture.getWidth(), this.cPicture.getHeight()); // возвращает двумерный массив X*Y, с картой картинки
    this.renderingPlayingField(this.cField.imageMap); // отрисовка игрового поля
      
  }

  // создаем html с цветами
  setColorHTML(){
    let textHTML = "";
    for(let number in this.cColor.color){
      let colorObj = this.cColor.convertStringToObj(this.cColor.color[number]);
      let colorRGB = this.cColor.convertObjToRGBA(colorObj);
      textHTML += "<button class='button' id='button_" + number + "' style='background-color: " + colorRGB + ";'>" + number + "</button>";
    }
    this.listButtons = document.getElementById("buttons");
    this.listButtons.innerHTML = textHTML;
    for(let number in this.cColor.color){
      let buttonId = "button_" + number;
      document.getElementById(buttonId).addEventListener('click', (event) => {
        this.cColor.setSelected(number);
      });
    }
  }

  // сравнение цветов
  comparisonColor({x, y}){
    return (this.cField.getColorCell({x, y}) == this.cColor.getSelected()) ? true : false;
  }





  // отрисовка игрового поля
  renderingPlayingField(imageMap){
    this.cRendering.clearPlayingField();
    
    let counter = 0;
    for (let y = 0; y < imageMap.length; y++ ) {
      for (let x = 0; x < imageMap[y].length; x++ ) {
        this.renderingCell({x, y});
        counter++;
      }
    }
    
  }
  
  renderingCell({x, y}){
    let dataCell = this.cField.getCellData({x, y});
    let width = this.settings.cell.size.x;
    let height = this.settings.cell.size.y;
    let posX = this.settings.cell.size.x * x;
    let posY = this.settings.cell.size.y * y;


    //console.log(dataCell.type);
    let color = this.cColor.getColorByNumber(dataCell.number, dataCell.type);
    let colorObj = this.cColor.convertStringToObj(color);
    let inverColor = this.cColor.invertColor(colorObj);

    if(dataCell.type){
      // если уже цветное

      // заливка
      this.cRendering.ctx.fillStyle = this.cColor.convertObjToRGBA(colorObj);
      this.cRendering.ctx.fillRect(posX, posY, width, height);
      this.cRendering.ctx.fill();
    } else {
      // если цб

      // заливка
      this.cRendering.ctx.fillStyle = this.cColor.convertObjToRGBA(colorObj);
      this.cRendering.ctx.fillRect(posX, posY, width, height);
      this.cRendering.ctx.fill();
      
      // рамка
      this.cRendering.ctx.strokeStyle = this.cColor.convertObjToRGBA(inverColor);
      this.cRendering.ctx.strokeRect(posX, posY, width, height);
     
      // текст
      let textPosX = posX + width - (this.settings.cell.fontStyle);
      let textPosY = posY + height - (this.settings.cell.fontStyle/2);
      this.cRendering.ctx.font = this.settings.cell.fontStyle + "px serif";
      this.cRendering.ctx.fillStyle = this.cColor.convertObjToRGBA(inverColor);
      this.cRendering.ctx.fillText(dataCell.number, textPosX, textPosY, this.settings.cell.fontStyle );

    }
  
    
    // заливка
   
  }



  mouseEvent(cursorX, cursorY, cellX, cellY) { // инициализируем работуку мышки. положение, нажатие клавиш
    // левая кнопка
    this.cRendering.canvas.addEventListener('click', (event) => {
      /*
      this.window.clientX = event.offsetX; // координата X относительно элемента, на котором произошло событие
      this.window.clientY = event.offsetY; // координата Y относительно элемента, на котором произошло событие
      this.buttonCell(this.cellSearch().x, this.cellSearch().y); // левая кнопка.
      this.settings.moves++; // Подсчет шагов
      this.outputStepsCounting(); // Вывод колличества шагов в HTML
      this.outputMines(); //вывод колличества мин в HTML
      this.winCheck();
      */

      

      /*
      console.log(this.cColor);
      
      this.imageMap[cellY][cellX].type = true;

      let posX = this.settings.cell.size.x * cellX;
      let posY = this.settings.cell.size.y * cellY;
      this.renderingCell(this.imageMap[cellY][cellX]);
     

      console.log(`***Позиция курсора: x=${cursorX}, y=${cursorY}`);
      console.log(`***Ячейка x=${cellX}, y=${cellY}`);*/

      let cell = this.conversionPositionPixelToCells(event.clientX, event.clientY);
      
      if (this.checkForWorkWithinField(cell.x, cell.y)) { // находиться ли мышка в поле картинки
 

        if (!this.getCellType(cell)) { // проверка ячейки на уже нажатость
          if (this.comparisonColor(cell)){
            this.setCellType(cell); // смена флага ячейки
            this.renderingCell(cell); // отрисовка ячейки


            this.checkingColorReadiness(); //проверка готовности поля 
            this.checkingFieldReadiness(); //проверка  готовности цвета
          
          }
        }



      }




   
    });
    // правая кнопка
    this.cRendering.canvas.oncontextmenu = function (){return false};
    this.cRendering.canvas.addEventListener('contextmenu', (event) => {
      /*
      this.window.clientX = event.offsetX; // координата X относительно элемента, на котором произошло событие
      this.window.clientY = event.offsetY; // координата Y относительно элемента, на котором произошло событие
      this.buttonFlag(this.cellSearch()); // правая кнопка
      this.settings.moves++; // Подсчет шагов
      this.outputStepsCounting(); // Вывод колличества шагов в HTML
      this.outputMines(); //вывод колличества мин в HTML
      */
      console.log("contextmenu");
    });
  }

  // получение типа кдетки. нажата или нет
  getCellType({x, y}){
    return this.cField.imageMap[y][x].type;
  }

  // установка типа кдетки. нажата или нет
  setCellType({x, y}){
    this.cField.imageMap[y][x].type = !this.getCellType({x, y})
    return this.getCellType({x, y});
  }

  // сделать функцияю перевода из позиции пикселей  в ячейку. 
  conversionPositionPixelToCells(clientX, clientY){
    const rect = this.cRendering.canvas.getBoundingClientRect();
    let cursorX = Math.floor(clientX - rect.left + this.settings.correctionPositionCursor.x);
    let cursorY = Math.floor(clientY - rect.top + this.settings.correctionPositionCursor.y);
    let cellX = Math.floor(cursorX / this.settings.cell.size.x);
    let cellY = Math.floor(cursorY / this.settings.cell.size.y);
    return {x:cellX, y:cellY};
  }

  // проверка на работу в пределах поля 
  checkForWorkWithinField(cellX, cellY){
    if ((cellX < (this.cPicture.getWidth() ) ) && (cellY < (this.cPicture.getHeight())) && (cellX >= 0) && (cellY >= 0)) {
      return true;
    }
    return false;
  }
  
  // возвращает позицию курсора return {x:0, y:0}. если нет - false
  getPositionCursor(){
    this.cRendering.canvas.addEventListener('mousemove', (event) => {
      // ищем положение курсора, с учетом масштаба, что бы найти номер клетки
      let cell = this.conversionPositionPixelToCells(event.clientX, event.clientY);
      // проверка на работу в пределах поля 
      if (this.checkForWorkWithinField(cell.x, cell.y)) {
        this.cellSelectionHover(cursorX, cursorY, cell.x, cell.y); // выделение ячейки при наведении
        //this.mouseEvent(cursorX, cursorY, cellX, cellY);
        console.log(`Ячейка x=${cell.x}, y=${cell.y}`);
        return { x : cell.x, y : cell.y };

        //нажатие и проверка цвета
        // активный цвет
        // выбор цветов
        // поверка на выигрыш
           
      }
      return false;      
    });
  }

  // СДЕЛАТЬ!!!! 
  // выделение ячейки при наведении
  cellSelectionHover(){}

  // СДЕЛАТЬ!!!! 
  // проверка готовности поля 
  checkingColorReadiness(){}
  
    // СДЕЛАТЬ!!!! 
  // проверка  готовности цвета
  checkingFieldReadiness(){}

}


start();




let el = document.getElementById("start");
el.addEventListener(
  "click",
  function () {
   console.log("четыре");   
  },
  false,
);
























