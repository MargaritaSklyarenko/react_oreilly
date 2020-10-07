import React, { Component } from "react";
import "./Login.css";
import classes from "./Login.css";
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button";
import Logo from "../../components/Logo/Logo";

export class Login extends Component {
  state = {
    loginForm: {
      login: {
        elementType: "input",
        emptyLabel: "Login enter",
        invalidLabel: "Login incorrect",
        elementConfig: {
          type: "text",
          placeholder: "Login"
        },
        value: "",
        validation: {
          required: true,
          regexp: /^[a-z]*$/i
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        emptyLabel: "Password enter",
        invalidLabel: "Password incorrect",
        elementConfig: {
          type: "text",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          regexp: /\w/i
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  };

  loginHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
      formData[formElementIdentifier] = this.state.loginForm[
        formElementIdentifier
      ].value;
    }
    this.props.history.push("/courses");
    // console.log(formData);
    /*const login = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      loginData: formData
    };
    axios
      .post("/login.json", login)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));*/
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.regexp) {
      isValid = !!value.match(rules.regexp) && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedLoginForm = { ...this.state.loginForm };
    const updatedFormElement = { ...updatedLoginForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid});
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = (
      <form onSubmit={this.loginHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            label={formElement.config.value === "" ? formElement.config.emptyLabel : (!formElement.config.valid ? formElement.config.invalidLabel : "")}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Enter
        </Button>
        { !this.state.formIsValid &&
          ((!this.state.loginForm.password.valid && this.state.loginForm.password.value !== "") ||
          (!this.state.loginForm.login.valid && this.state.loginForm.login.value !== "")) &&
          <h2>Wrong login or password</h2>
        }
      </form>
    );

    return (
      <div className={classes.Login}>
        <Logo height="20%" />
        <h1>Login</h1>
        {form}
      </div>
    );
  }
}

export default Login;