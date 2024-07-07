export class Color {

  constructor() {
    console.log("Class Picture is Load");
    this.color = {};
    this.gray  = {};
    this.selected = null;
  }

  // устанавливаем выбранный цвет
  setSelected(number = 1){
    if(this.checkSelected(number)){
      this.selected = number;
      return true;
    }
    return false;
  }

  // получаем выбранный цвет
  getSelected(){    
    return this.selected;
  }
  
  // проверка выбранного цвета
  checkSelected(number){
    return true;
  }

  // приведение массива Цвета к нужному формату
  convertObjToRGBA({r, g, b}){
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  // разделяем пиксель из строки в обьект
  // 255.0.128.255
  //
  // {"r":255, "g":0, "b":128, "a":255}
  //
  convertStringToObj(data){
    let part = data.split(".");
    return {"r":Number(part[0]), "g":Number(part[1]), "b":Number(part[2]), "a":Number(part[3])};
  }

  // переводим цветной пиксель в чернобелый
  grayscalePixel(data){
    let splits = this.convertStringToObj(data);
    let avg = Math.floor(((splits.r + splits.g + splits.b) / 3) + 100) ;
    return avg + "." + avg + "." + avg + "." + splits.a;
  }

  // инвертирует цвета (для текста и полей)
  // color = {r:255, g:255, b:255, a:255}
  invertColor({r, g, b, a}){ 
    return {
      r : this.invertComparisonUnit(255 - r - 100),
      g : this.invertComparisonUnit(255 - g - 100),
      b : this.invertComparisonUnit(255 - b - 100),
      a : this.invertComparisonUnit(a),
    };
  }

  // grayscaleArray
  grayscaleArray(data) {
    let result = {};
    for(let number in data){
     result[number] = this.grayscalePixel(data[number]);
    }
    return result;
   }
  
  // изменяет значение при инвертировании цветов. что бы инвертированиное значение не было похоже на исходное
  invertComparisonUnit(color){
    if((color >= 115) && (color <= 127)) {
      return 115;
    }
    if((color >= 127) && (color <= 135)) {
      return 135;
    }
    return color;
  }
  
  // получение данных о пикселях и приведение в нужный формат.
  getProcessingImageData(myImageData){
    let count_data = myImageData.length;
    let data = []; // массив с данными картинки
    for (let i = 0; i < count_data; i += 4) {
      let result = myImageData[i] + "." + myImageData[i+1] + "." + myImageData[i+2] + "." + myImageData[i+3];
      data.push(result);
    }
    return  data;
  }

  // возвращает массив, содержащий только уникальные элементы
  unique(data) {
    let temp = [];
    let result = {};
    let number = 1;
    for (let color of data) {
      if (!temp.includes(color)) {
        temp.push(color);
      }
    }    
    for(let color of temp){
      result[number] = color;
      number++;
    }
    
    return this.color = result;
  }




  
  
   
   //создание создаем массив всех существующих цветов и присваивание цветам уникальных номеров. и создание массива с серыми цветами.
  createColors(data){
    this.color = this.unique(data); // создаем массив всех существующих цветов и присваивание цветам уникальных номеров 
    this.gray =  this.grayscaleArray(this.color); // создание массива с серыми цветами.
  }


  // меняет цвета на номера в массиве поля
  changeColorToNumbers(data){
    let result = [];
    for(let pix of data){
      for(let number in this.color){
        if(pix == this.color[number]){
          result.push(number);
        }
      }
    }
    //this.data.pix = result;
    return result;
  }



  // поиск цвета по номеру. (number, type) type: true - цветной, false - чернобелый
  getColorByNumber(number = 1, type = true){
    return (type) ? this.color[number] : this.gray[number];
  }





  /* соеденить с другими классами и сделать */

  // Получение значения цвета ячейки
  getColorCell({x, y}){
    return this.getCellData({x, y}).number;
  }
  /* соеденить с другими классами и сделать */


 



}