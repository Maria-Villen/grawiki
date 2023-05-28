import * as Yup from "yup";
import { IUserRegisterForm, IUserRegister } from "../../../interfaces/auth";
import { userRegister } from "../../../redux/slices/auth/authActions";
import { useAppDispatch } from "../../../redux/store";
import { auth } from "../../../services/useMockServices";
import { useFormik } from "formik";
import { FocusEvent } from "react";

const useRegisterDataForm = () => {
  const dispatch = useAppDispatch();
  const { checkUserName, checkEmailExists } = auth;
  let checkApi = false;

  const initialValues: IUserRegisterForm = {
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("El nombre de usuario es obligatorio.")
      .trim()
      .matches(
        /^[a-zA-Z][a-zA-Z0-9]{2,9}$/,
        "Solo se aceptan letras y números de 3 a 10 caracteres."
      )
      .test(
        "Unique username",
        "El nombre de usuario ya está en uso. Elija otro.", // <- key, message
        async (value) => {
          if (checkApi) {
            try {
              const response = await checkUserName(value);
              checkApi = false;
              return !response;
            } catch (err) {
              checkApi = false;
              return false;
            }
          }
          return true;
        }
      ),
    email: Yup.string()
      .email("Ingrese una dirección de e-mail válida.")
      .required("El e-mail es obligatorio.")
      .test(
        "Unique Email",
        "Ya existe una cuenta con ese email.",
        async (value) => {
          if (checkApi) {
            try {
              const response = await checkEmailExists(value);
              checkApi = false;
              return !response;
            } catch (err) {
              checkApi = false;
              return false;
            }
          }
          return true;
        }
      ),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_+{}[\]:;\\/.]{8,20}$/,
        "Contraseña insegura. Requisitos: 8 caracteres, mayúscula, minúscula y caracter especial."
      )
      .required("La contraseña es obligatoria."),
    confirmPass: Yup.string()
      .required("Repite la contraseña.")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden."),
    terms: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones."
    ),
  });

  const handleBlurWithAction = (e: FocusEvent<HTMLInputElement>) => {
    console.log("onblur");
    checkApi = true;
    console.log("set api check set to true", (checkApi = true));
    handleBlur(e);
  };

  const onSubmit = (values: IUserRegister) => {
    console.log("register");
    dispatch(
      userRegister({
        email: values.email,
        password: values.password,
        userName: values.userName,
      })
    );
  };

  const { handleSubmit, handleBlur, errors, touched, getFieldProps } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return {
    handleSubmit,
    errors,
    touched,
    getFieldProps,
    handleBlurWithAction,
  };
};

export default useRegisterDataForm;
