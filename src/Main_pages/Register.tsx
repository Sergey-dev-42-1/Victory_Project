import { FormOrgReg } from "../Forms/FormOrgReg";
import { FormExpReg } from "../Forms/FormsExpReg";
import { FormParReg } from "../Forms/FormParReg";
import { Footer } from "../Main_components/Footer";
import { RouteComponentProps } from "@reach/router";
import React from "react";
export const Register = (props: RouteComponentProps) => {
  //TODO: Имплементировать выбор формы
  return (
    <React.Fragment>
      <FormOrgReg />
      <Footer />
    </React.Fragment>
  );
};
