import { DrillActions } from "@/types/drill-actions";

export interface IDrillDelete {
  imagePath: string;
  label: string;
  actionType: DrillActions;
  active: boolean;
}

export const drillDelete: IDrillDelete = {
  actionType: DrillActions.delete,
  imagePath: "svgs/drill-curves-svgs/skate-freehand.svg",
  label: "Delete",
  active: false,
};
