import { useFieldArray, useForm } from "react-hook-form";
import { default as OrderForm } from "./OrderForm";
import { default as Package } from "./Package";

const OrderMain = () => {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      packages: [
        { qty: "", weight: "", unit: "", length: "", width: "", height: "" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <OrderForm />

      {currentStep > 1 && (
        <Package
          {...{
            control,
            handleSubmit,
            register,
            fields,
            append,
            remove,
            onSubmit,
          }}
        />
      )}
    </>
  );
};
