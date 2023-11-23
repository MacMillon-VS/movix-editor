import React from "react";
import styled from "styled-components";
import { t } from "react-i18nify";
import { Loading } from "../styles/LoadingStyles";

export default function Component({ loading }) {
  return (
    <Loading>
      <div className="loading-inner">
        <img src="/loading.svg" alt="loading" />
        <div>{loading || t("LOADING")}</div>
      </div>
    </Loading>
  );
}
