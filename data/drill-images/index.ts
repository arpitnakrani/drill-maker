import { CurveTypes, DrillActions } from "@/types/drill-actions";

export interface IDrillImage {
  imagePath: string;
  label: string;
  actionType: DrillActions;
  active: boolean;
}

export const drillUtilityImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/cone.svg",
    label: "Cone",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/tire.svg",
    label: "Tire",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/stick.svg",
    label: "Stick",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/stickhandlingtoll.svg",
    label: "stick Handling toll",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/triangle.svg",
    label: "Triangle",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/border-vertical.svg",
    label: "Border Vertical",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/utility/border-horizontal.svg",
    label: "Border Horizontal",
    active: false,
  },
];

export const drillNetImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/net/net-left.svg",
    label: "Net Left",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/net/net-up.svg",
    label: "Net Up",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/net/net-right.svg",
    label: "Net Right",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/net/net-down.svg",
    label: "Net Down",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/net/net-mini.svg",
    label: "Mini Net",
    active: false,
  },
];

export const drillForwardImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/forward/f1.svg",
    label: "Forward 1",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/forward/f2.svg",
    label: "Forward 2",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/forward/f3.svg",
    label: "Forward 3",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/forward/f4.svg",
    label: "Forward 4",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/forward/f5.svg",
    label: "Forward 5",
    active: false,
  },
];
