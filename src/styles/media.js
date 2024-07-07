import React from "react";
import styled, { css } from "styled-components";

const breakpoints = {
    phone: '@media (max-width: 639px)',
    tablet: '@media (max-width: 1047px)',
    desktop: '@media (min-width: 1048px)',
};

export const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
    return {
        ...acc,
        [key]: (first, ...interpolations) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
    };
}, {});