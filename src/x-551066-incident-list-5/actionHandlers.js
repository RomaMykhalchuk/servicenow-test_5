import {
	FETCH_LATEST_INCIDENTS,
	FETCH_LATEST_INCIDENTS_SUCCEEDED,
	INCIDENTS_FETCH_FAILED,
} from "./constants";
import { actionTypes } from "@servicenow/ui-core";
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

import { getHttpEffect } from "./getHttpEffect";

export default {
	[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
		const { dispatch, updateState } = coeffects;
		updateState({ isLoading: true });
		dispatch(FETCH_LATEST_INCIDENTS, {
			sysparm_display_value: true,
		});
	},
	FETCH_LATEST_INCIDENTS: getHttpEffect({
		successActionType: FETCH_LATEST_INCIDENTS_SUCCEEDED,
		errorActionType: INCIDENTS_FETCH_FAILED,
	}),
	FETCH_LATEST_INCIDENTS_SUCCEEDED: (coeffects) => {
		const { action, updateState, state } = coeffects;
		const { result } = action.payload;

		let set = new Set(result.map((card) => card.incident_state));
		updateState({
			path: "filters.status",
			value: Array.from(set),
			operation: "concat",
		});
		updateState({ incidentsList: result, isLoading: false });
	},
	INCIDENTS_FETCH_FAILED: ({ updateState }) => {
		updateState({ isLoading: false });
	},
	"NOW_DROPDOWN_PANEL#ITEM_CLICKED": (coeffects) => {
		const { updateState } = coeffects;
		const clickedBtn = coeffects.action.payload.item.id;
		if (clickedBtn === "open") {
			updateState({ isModalOpened: true });
		}
	},
	"NOW_MODAL#OPENED_SET": (coeffects) => {
		const { updateState } = coeffects;
		updateState({ isModalOpened: false });
	},
	"NOW_DROPDOWN#ITEM_CLICKED": (coeffects) => {
		const filter = coeffects.action.payload.item.id;
		const { updateState } = coeffects;
		updateState({ selectedFilter: filter });
	},
};
