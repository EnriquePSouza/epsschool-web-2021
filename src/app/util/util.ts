export class Util {

  static nomeConcat(items: any[]) {
    return items.map(x => x.nome).join(',');
  }

  static removeDuplicate(items: any[]){
    var result: any[] = [];
    items.forEach(x => {
      if (result.length == 0) {
        result.push(x);
      } else {
        result.forEach(i => {
          if (i.nome != x.nome) result.push(x);
        });
      }
    });
    return result;
  }

}
