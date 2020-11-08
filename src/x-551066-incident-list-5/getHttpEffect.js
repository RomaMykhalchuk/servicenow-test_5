import { createHttpEffect } from "@servicenow/ui-effect-http";

export const getHttpEffect = ({ successActionType, errorActionType }) => {
	return createHttpEffect("/api/now/table/incident", {
		method: "GET",
		queryParams: ["sysparm_display_value"],
		successActionType,
		errorActionType,
	});
};
