import { toast } from "react-toastify";

export const validateContestForm = (
  formData: FormData,
  { withToasts }: { withToasts?: boolean } = {}
): boolean => {
  const body = {
    name: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("type"),
    entryCategories: JSON.parse(formData.get("participants") as any),
    deadline: formData.get("date") + "T00:00:00.000Z",
    termsAndConditions: JSON.parse(formData.get("urls") as any),
    acceptedFileFormats: JSON.parse(formData.get("formats") as any),
    background: formData.get("backgroundURL"),
  };

  if (body.background === "null") body.background = null;

  const nameMapper = {
    name: "tytułu konkursu",
    description: "opisu konkursu",
    category: "kategorii konkursu",
    entryCategories: "kategorii uczestników",
    deadline: "terminu zgłaszania prac",
    termsAndConditions: "plików z regulaminem i zgód",
    acceptedFileFormats: "akceptowalnych formatów plików",
    background: "tła",
  };

  let isValid = true;

  Object.entries(body).forEach(([key, val]) => {
    if (!val || (val instanceof Array && val.length === 0)) {
      isValid = false;
      if (withToasts) {
        toast.warning(`Nie podano ${(nameMapper as any)[key]}`);
      }
    }
  });

  return isValid;
};
