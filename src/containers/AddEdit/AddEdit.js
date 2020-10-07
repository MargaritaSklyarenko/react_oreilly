import React, { Component } from "react";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input"
import Breadcrumbs from "../../components/UI/Breadcrumbs/Breadcrumbs"

export class AddEdit extends Component {
    state = {
        addEditForm: {
            title: {
              elementType: "input",
              label: "Title",
              elementConfig: {
                type: "text",
                placeholder: "Enter title"
              },
              value: ""
            },
            description: {
              elementType: "input",
              label: "Description",
              elementConfig: {
                type: "Enter description",
                placeholder: "Enter description"
              },
              value: ""
            },
            creationDate: {
                elementType: "input",
                label: "Creation date",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter creation date"
                },
                value: ""
              },
            duration: {
                elementType: "input",
                label: "Duration",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter duration"
                },
                value: ""
              },
            authors: {
                elementType: "input",
                label: "Authors",
                elementConfig: {
                  type: "text",
                  placeholder: "Enter authors"
                },
                value: ""
              }
          }
    };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addEditForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addEditForm[key]
      });
    }
    let form = (
      <form onSubmit={this.addEditHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            label={formElement.config.label}
            value={formElement.config.value}
            changed={()=>{}}
          />
        ))}
        <div>
            <Button btnType="Regular">Save</Button>
            <Button btnType="Regular">Cancel</Button>
        </div>
      </form>
    );
    return (
      <div >
        <header>
          <Logo height="20%"/>
          <Breadcrumbs />
        </header>
        <main>
            {form}
        </main>
      </div>
    );
  }
}

export default AddEdit;