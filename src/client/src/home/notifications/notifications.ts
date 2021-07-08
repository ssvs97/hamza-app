import SoundNotification from "../../../audio/notification.mp3";
import SoundError from "../../../audio/error.mp3";

export class Notifications {
  private msgContent: HTMLStyleElement;
  private msgBox: HTMLStyleElement;
  private closeBox: HTMLStyleElement;

  constructor() {
    this.msgBox = document.querySelector(".msgbox-box")!;
    this.msgContent = document.querySelector(".msgbox-content")!;
    this.closeBox = document.querySelector(".msgbox-close")!;

    this.closeBoxHandler();
  }
  errorNotification(msg: string) {
    this.msgBox.classList.add("red");
    this.closeBox.classList.add("red");
    this.send(msg, SoundError);
  }

  notification(msg: string) {
    this.msgBox.classList.remove("red");
    this.closeBox.classList.remove("red");
    this.send(msg, SoundNotification);
  }

  private send(msg: string, audioPath: string) {
    const audio = new Audio(audioPath);
    audio.play();

    this.msgBox.classList.add("msgbox-box-open");
    this.msgContent.innerHTML = msg;
  }

  private closeBoxHandler() {
    this.closeBox.addEventListener("click", () => {
      this.msgBox.classList.remove("msgbox-box-open");
    });
  }
}
