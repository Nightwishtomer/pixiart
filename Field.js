export class Field {
  constructor() {
    console.log("Class Field is Load");
    this.data = {};

    this.imageMap;
  }
  get(){
    console.log("get Class Field");
  }

    // возвращает двумерный массив X*Y, с картой картинки
    createImageMap(data, width, height){
      //console.log(data);
      let counter = 0;
      let imageMap = [];
      for(let y = 0; y < height; y++ ){
        imageMap[y] = [];
        for(let x = 0; x < width; x++ ){
          imageMap[y][x] = {
            type : false,
            number: data[counter],
          };
          counter++;
        }
      }
      return imageMap;
    }




    
  // получение данных ячейки
  getCellData({x, y}){
    return this.imageMap[y][x];
  }

  // Получение значения цвета ячейки
  getColorCell({x, y}){
    return this.getCellData({x, y}).number;
  }

}