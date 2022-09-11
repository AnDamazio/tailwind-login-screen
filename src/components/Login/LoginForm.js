/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../../store/auth-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import LockIcon from "../UI/Icons/ClosedLockIcon";
import Form from "../UI/Input/Form";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.includes("@") };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      throw new Error();
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.length > 6 };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.length > 6 };
    default:
      throw new Error();
  }
};

const LoginForm = () => {
  const [formIsValid, setFormIsValid] = useState(true);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const validator = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      clearTimeout(validator);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const rememberChangeHandler = (event) => {
    authCtx.checkRemember(event.target.checked);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    switch (formIsValid) {
      case true:
        authCtx.onLogin(emailState.value, passwordState.value);
        break;
      default:
        break;
    }
  };

  return (
    <Form onSubmit={submitHandler} className="mt-8 space-y-6">
      <Input
        type="hidden"
        name="remember"
        value="true"
        label={{
          name: "remember",
          className: "",
        }}
        srOnly={true}
      />
      <Card className="shadow-sm">
        <Input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          className={`relative block w-full appearance-none
          rounded-none border border-gray-300 px-3 py-2
          text-gray-900 placeholder-gray-500 focus:z-10
          sm:text-sm rounded-t-md
          ${
            emailState.isValid
              ? "focus:border-indigo-500"
              : "focus:border-red-500"
          } focus:outline-none ${
            emailState.isValid ? "focus:ring-indigo-500" : "focus:ring-red-500"
          } ${!emailState.isValid && "border-red-500"}`}
          required
          placeholder="Email address"
          label={{
            name: "Email address",
            className: "",
          }}
          onBlur={validateEmailHandler}
          onChange={emailChangeHandler}
          srOnly={true}
        />
        <Input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          className={`relative block w-full appearance-none
          rounded-none border border-gray-300 px-3 py-2
          text-gray-900 placeholder-gray-500 focus:z-10
           focus:outline-none sm:text-sm rounded-b-md ${
             passwordState.isValid
               ? "focus:border-indigo-500"
               : "focus:border-red-500"
           } focus:outline-none ${
            passwordState.isValid
              ? "focus:ring-indigo-500"
              : "focus:ring-red-500"
          } ${!passwordState.isValid && "border-red-500"}
          ${!emailState.isValid && "border-t-red-500"}`}
          required
          placeholder="Password"
          label={{
            name: "Password",
            className: "",
          }}
          onBlur={validatePasswordHandler}
          onChange={passwordChangeHandler}
          srOnly={true}
        />
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            label={{
              name: "Remember me",
              className: "ml-2 block text-sm text-gray-900 order-last",
            }}
            onChange={rememberChangeHandler}
            srOnly={false}
          />
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={!formIsValid && "opacity-50 cursor-not-allowed"}
          icon={<LockIcon />}
        >
          Sign in
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
