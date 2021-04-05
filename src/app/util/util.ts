export class Util {

  static nomeConcat(items: any[]) {
    return items.map(x => x.course.name).join(', ');
  }

  static removeDuplicate(items: any[]){
    var result: any[] = [];
    items.forEach(x => {
      if (result.length == 0) {
        result.push(x);
      } else {
        result.forEach(i => {
          if (i.course.name != x.course.name) result.push(x);
        });
      }
    });
    return result;
  }

}
