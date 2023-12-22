import { ToastOptions, UpdateOptions } from "react-toastify";

export const loadingConfig = (): ToastOptions<{}> => ({
  position: "top-right",
});

const commonConfigs: UpdateOptions<unknown> = {
  type: "success",
  isLoading: false,
  position: "top-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
};

export const successConfig = (text: string): UpdateOptions<unknown> => ({
  ...commonConfigs,
  render: text,
  type: "success",
});

export const errorConfig = (text: string): UpdateOptions<unknown> => ({
  ...commonConfigs,
  render: text,
  type: "error",
});
