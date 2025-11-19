export class AppScroll {
  static lock() {
    document.body.classList.add("disable-scroll");
  }

  static release() {
    document.body.classList.remove("disable-scroll");
  }
}
