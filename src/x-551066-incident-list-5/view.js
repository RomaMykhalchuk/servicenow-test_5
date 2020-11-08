import "@servicenow/now-template-card";
import "@servicenow/now-modal";
import "@servicenow/now-loader";
import "@servicenow/now-icon";
import "@servicenow/now-label-value";
import "@servicenow/now-dropdown";

const filterCards = (items, filter) => {
	if (filter === "Show All") {
		return items;
	}
	return items.filter((card) => card.incident_state === filter);
};

const getIncidentsList = (incidentsList, isLoading, isModalOpened, filters) => {
	const preparedFilters = filters.status.map((f) => {
		return {
			id: f,
			label: f,
		};
	});

	if (incidentsList.length === 0 && !isLoading) {
		return (
			<div className="no-data">
				<now-icon icon="circle-info-outline" size="xl"></now-icon>
				<h2>No data Available</h2>
			</div>
		);
	}

	return (
		<section className="incidents">
			<ul className="incidents__list">
				{incidentsList.map((i) => (
					<li className="incidents__list-item" key={i.sys_id}>
						<now-template-card-assist
							tagline={{ icon: "tree-view-long-outline", label: "Process" }}
							actions={[
								{ id: "open", label: "Open Record" },
								{ id: "delete", label: "Delete" },
							]}
							heading={{ label: i.description }}
							content={[
								{
									label: "State",
									value: { type: "string", value: i.incident_state },
								},
								{
									label: "Assigned",
									value: {
										type: "string",
										value: i.assigned_to.display_value,
									},
								},
								{
									label: "Priority",
									value: { type: "string", value: "Low" },
								},
								{
									label: "SLA",
									value: {
										type: "string",
										value: i.assignment_group.display_value || "No group",
									},
								},
								{
									label: "Number",
									value: { type: "string", value: i.number },
								},
							]}
							contentItemMinWidth="300"
							footerContent={{ label: "Updated", value: i.sys_updated_on }}
							configAria={{}}
						></now-template-card-assist>
						<now-modal
							size="md"
							manage-open
							opened={isModalOpened}
							headerLabel="Incident Card"
							content={i.description}
							footerActions={[
								{
									label: "Delete",
									variant: "primary-negative",
									clickActionType: "DELETE_ITEM",
								},
							]}
						></now-modal>
					</li>
				))}
			</ul>
			<now-dropdown
				className="filters"
				items={preparedFilters}
				select="single"
				placeholder="Filter by Status"
				variant="secondary"
				size="md"
			></now-dropdown>
		</section>
	);
};

export default (state) => {
	const {
		incidentsList,
		isLoading,
		isModalOpened,
		filters,
		selectedFilter,
	} = state;

	const filteredData = filterCards(incidentsList, selectedFilter);
	return (
		<section className="incidents">
			<h2 className="incidents__title">Incidents</h2>
			{isLoading ? (
				<now-loader label="Loading..." size="lg"></now-loader>
			) : (
				getIncidentsList(filteredData, isLoading, isModalOpened, filters)
			)}
		</section>
	);
};
