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
export const drillDefenseImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/defense/d1.svg",
    label: "Defense 1",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/defense/d2.svg",
    label: "Defense 2",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/defense/d3.svg",
    label: "Defense 3",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/defense/d4.svg",
    label: "Defense 4",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/defense/d5.svg",
    label: "Defense 5",
    active: false,
  },
];
export const drillRulesImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/forward.svg",
    label: "Forward",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/defense.svg",
    label: "Defense",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/opponent.svg",
    label: "Opponent",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/player-type-1.svg",
    label: "Player Type 1",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/player-type-2.svg",
    label: "Player Type 2",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/rules/player-type-x.svg",
    label: "Player Type X",
    active: false,
  },
];
export const drillPositionImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/center.svg",
    label: "Center",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/left-wing.svg",
    label: "Left wing",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/right-wing.svg",
    label: "Right Wing",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/left-defense.svg",
    label: "Left Defense",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/right-defense.svg",
    label: "Right Defense",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/goalie.svg",
    label: "Goalie",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/position/coach.svg",
    label: "Coach",
    active: false,
  },
];
export const drillNumberImages: IDrillImage[] = [
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/1.svg",
    label: "1",
    active: true,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/2.svg",
    label: "2",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/3.svg",
    label: "3",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/4.svg",
    label: "4",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/5.svg",
    label: "5",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/6.svg",
    label: "6",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/7.svg",
    label: "7",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/8.svg",
    label: "8",
    active: false,
  },
  {
    actionType: DrillActions.draw,
    imagePath: "svgs/drill-image-svgs/number/9.svg",
    label: "9",
    active: false,
  },
];
export const drillTextImage: IDrillImage[] = [
  {
    actionType: DrillActions.text,
    imagePath: "svgs/drill-action-svgs/text.svg",
    label: "Text",
    active: true,
  },
];
