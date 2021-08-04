import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const toaster = new Notyf({
  position: { y: "top", x: "right" },
  duration: 5000,
  dismissible: true,
});
