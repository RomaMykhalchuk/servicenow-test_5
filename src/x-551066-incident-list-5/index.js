import { createCustomElement } from "@servicenow/ui-core";
import actionHandlers from "./actionHandlers";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import view from "./view";

createCustomElement("x-551066-incident-list-5", {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		incidentsList: [],
		isLoading: true,
		selectedFilter: "Show All",
		isModalOpened: false,
		filters: {
			status: ["Show All"],
			category: [],
		},
	},
	actionHandlers,
});
