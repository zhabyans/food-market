import { useState } from "react";

const useForm = (init) => {
  const [form, setForm] = useState(init);
  return [
    form,
    (formType, formValue) => {
      if (formType === "reset") {
        return setForm(init);
      }
      return setForm({ ...form, [formType]: formValue });
    },
  ];
};

export default useForm;
