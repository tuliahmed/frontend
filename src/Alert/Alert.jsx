import Swal from "sweetalert2";

const AlertBody = (type, title, text) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 10000,
    timerProgressBar: true,
    background: "var(--bg-color)",
    color: "var(--text-color",
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "custom-toast",
      closeButton: "toast-close-button",
    },
  });
  Toast.fire({
    icon: `${type}`,
    title: `${title}`,
    text: `${text}`,
  });
};

export const Alert = (type, title, text) => {
  if (type === "success") {
    AlertBody(type, title, text);
  } else {
    AlertBody(type, title, text);
  }
};