import axios from "axios";
import { toast } from "react-toastify";
import { errorConfig, successConfig } from "../../../config/toasts";
import { useNavigate } from "react-router-dom";

export default function useDeleteContest(id: string) {
  const navigate = useNavigate();

  const deleteContest = () => {
    const toastID = toast.loading("Proszę czekać...");

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/contests/?id=${id}`, {
        withCredentials: true,
      })
      .then((data) => {
        if (data.status !== 200) throw new Error();
        toast.update(toastID, successConfig("Konkurs usunięty pomyślnie."));
        navigate("/contests");
      })
      .catch((err) =>
        toast.update(
          toastID,
          errorConfig("Wystąpił bład podczas usuwania konkursu.")
        )
      );
  };

  return { deleteContest };
}
