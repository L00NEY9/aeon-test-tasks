import {IconBolt, IconBookmark, IconBulb, IconStack2, IconTarget} from "@tabler/icons";
import React from "react";

interface NestingLeveLColorSchema {
  borderColor: string;
  backgroundColor: string;
}

export const nestingLevelColorsSchemes: NestingLeveLColorSchema[] = [
  {
    borderColor: "#497CF6",
    backgroundColor: "#E2EBFF"
  },
  {
    borderColor: "#FFA530",
    backgroundColor: "#FFF2E0"
  },
  {
    borderColor: "#2DB77B",
    backgroundColor: "#CFF0D6"
  },
  {
    borderColor: "#2DB77B",
    backgroundColor: "#CFF0D6"
  },
  {
    borderColor: "#FFA530",
    backgroundColor: "#FFF2E0"
  },
]

export const nestingLevelIcons = [
  React.createElement(IconStack2, {
    color: "#8754F6",
    size: 20
  }),
  React.createElement(IconBulb, {
    color: "#2DB77B",
    size: 20
  }),
  React.createElement(IconBookmark, {
    color: "#F0C752",
    size: 20
  }),
  React.createElement(IconTarget, {
    color: "#BE385E",
    size: 20
  }),
  React.createElement(IconBolt, {
    color: "#8754F6",
    size: 20
  })
]
