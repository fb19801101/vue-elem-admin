import FileSaver from "file-saver";

export default class FileExport {
  /**
   * 导出Excel文件
   * @param {*} res   文件流
   * @param {*} name  文件名
   */
  static getExcel(res, name) {
    let blob = new Blob([res], {
      type: "application/vnd.ms-excel"
    });
    FileSaver.saveAs(blob, name + ".xlsx");
  }

  /**
   * 导出CSV文件
   * @param {*} res   文件流
   * @param {*} name  文件名
   */
  static getCsv(res, name) {
    let blob = new Blob([res], {
      type: "application/vnd.ms-excel"
    });
    FileSaver.saveAs(blob, name + ".csv");
  }

  /**
   * 导出Txt文件
   * @param {*} res   文件流
   * @param {*} name  文件名
   */
  static getTxt(res, name) {
    let blob = new Blob([res], {
      type: "text/plain;charset=utf-8"
    });
    FileSaver.saveAs(blob, name + ".txt");
  }

  /**
   * 导出图片1
   * @param {*} url 图片地址
   * @param {*} name  文件名
   */
  static getImgURLs(url, name) {
    let last = url.substring(url.lastIndexOf("."), url.length);
    FileSaver.saveAs(url, `${name}${last}`);
  }
  /**
   * 导出图片2
   * @param {*} res 文件流
   * @param filename
   */
  static downLoadImg(res, filename) {
    let blob = new Blob([res], {
      type: "image/jpeg"
    });
    FileSaver.saveAs(blob, `${filename}.jpg`);
  }
}
