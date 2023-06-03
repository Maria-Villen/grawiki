import classes from "./loginForm.module.sass";
import { Link } from "react-router-dom";
import { LayoutCardForm, CheckInput, BasicButton, MsgError } from "../../../ui";
import useLoginDataForm from "./useLoginDataForm";
import { EmailChamp, PassChamp } from "../champs";
import { useAppDispatch } from "../../../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { reset } from "../../../redux/slices/auth/authSlice";

/**
 * Login Form Component
 */
const LoginForm = () => {
  const {
    handleSubmit,
    errors,
    touched,
    getFieldProps,
    rememberThisDevice,
    user,
    loading,
    error,
    persist,
  } = useLoginDataForm();

  const location = useLocation();
  const dispatch = useAppDispatch();

  const resetStates = () => {
    dispatch(reset());
  };

  if (user) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  } else if (error.message) {
    return (
      <MsgError
        message={error.message}
        label="Aceptar"
        link="/login"
        cb={resetStates}
      />
    );
  }

  return (
    <LayoutCardForm withLogo>
      <p>Inicia sesión para ingresar tu cuenta</p>
      <form className={classes.loginForm_form} onSubmit={handleSubmit}>
        <div className={classes.loginForm_content}>
          <EmailChamp
            className={classes.loginForm_group}
            placeholder="E-mail"
            isTouched={touched.email}
            isError={errors.email}
            {...getFieldProps("email")}
            autoComplete={persist === "true" ? "on" : "off"}
          />
          <PassChamp
            className={classes.loginForm_group}
            placeholder="Contraseña"
            isTouched={touched.password}
            isError={errors.password}
            {...getFieldProps("password")}
            autoComplete={persist === "true" ? "on" : "off"}
          />
        </div>
        <div className={classes.loginForm_politics}>
          <label htmlFor="rememberMe" className={classes.checkbox}>
            <CheckInput
              id="rememberMe"
              onChange={rememberThisDevice}
              checked={persist === "true" ? true : false}
            />
            Recordarme
          </label>
          <Link to="/recover">Olvidé mi contraseña</Link>
        </div>
        <BasicButton
          category="primary"
          type="submit"
          fluid
          label="Iniciar Sesión"
        />
      </form>
      {loading && <p>Loading</p>}
    </LayoutCardForm>
  );
};

export default LoginForm;
