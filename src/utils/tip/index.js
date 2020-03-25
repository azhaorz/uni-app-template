import config from "@/config";
const { confirmColor, cancelColor } = config.tip;

/**
 * 提示与加载工具类
 */
export default class Tip {
  static isNormalLoading = false;
  static isNavLoading = false;

  /**
   * 弹出提示
   * @param {string} title  提示信息
   * @param {number} duration 关闭延时
   * @param {string} icon 图标
   */
  static toast(title, duration = 1500, icon = "none") {
    uni.showToast({
      title: title,
      icon,
      mask: true,
      duration
    });
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 弹出成功提示
   * @param {string} title  提示信息
   * @param {number} duration 关闭延时
   * @param {string} icon 图标
   */
  static success(title, duration = 1500) {
    uni.showToast({
      title: title,
      icon: "success",
      mask: true,
      duration
    });
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 弹出加载
   * @param {string} title  加载提示信息
   * @param {*} type 加载类型 normal | nav
   */
  static loading(title = "", type = "normal") {
    if (type === "normal") {
      if (Tip.isNormalLoading) return;
      Tip.isNormalLoading = true;
      uni.showLoading({
        title: title,
        mask: true
      });
    } else {
      if (Tip.isNavLoading) return;
      Tip.isNavLoading = true;
      uni.showNavigationBarLoading();
    }
  }

  /**
   * 关闭加载
   * @param {*} type 加载类型 normal | nav
   */
  static loaded(type = "normal") {
    let duration;
    if (type === "normal") {
      if (Tip.isNormalLoading) {
        Tip.isNormalLoading = false;
        uni.hideLoading();
      }
    } else {
      if (Tip.isNavLoading) {
        uni.hideNavigationBarLoading();
      }
    }
    duration = 500;
    // 隐藏动画大约500ms，避免后面直接toast时的显示bug
    return new Promise(resolve => setTimeout(resolve, duration));
  }

  /**
   * 双按钮模态框提示
   * @param {string} content 提示内容
   * @param {string} title 提示标题
   * @param {string} confirmText 确认按钮文字
   * @param {string} cancelText 取消按钮文字
   */
  static double(
    content,
    title = "提示",
    confirmText = "确认",
    cancelText = "取消"
  ) {
    return new Promise((resolve, reject) => {
      uni
        .showModal({
          title,
          content,
          confirmText,
          cancelText,
          confirmColor,
          cancelColor
        })
        .then(([err, res]) => {
          if (err) {
            reject(err);
          } else {
            const { errMsg, confirm } = res;
            if (errMsg !== "showModal:ok") {
              reject(errMsg);
            } else {
              resolve(confirm);
            }
          }
        });
    });
  }

  /**
   * 单按钮模态框提示
   * @param {string} content 提示内容
   * @param {string} title 提示标题
   * @param {string} confirmText 确认按钮文字
   */
  static single(content, title = "提示", confirmText = "知道了") {
    return new Promise((resolve, reject) => {
      uni
        .showModal({
          title,
          content,
          confirmText,
          showCancel: false,
          confirmColor
        })
        .then(([err, res]) => {
          if (err) {
            reject(err);
          } else {
            const { errMsg, confirm } = res;
            if (errMsg !== "showModal:ok") {
              reject(errMsg);
            } else {
              resolve(confirm);
            }
          }
        });
    });
  }
}
