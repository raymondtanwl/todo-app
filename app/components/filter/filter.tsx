import "./filter.scss";

export default function Filter(props: any) {
  {
    props;
  }
  return (
    <div className={"filter " + (props.mobile ? "mobile" : "")}>
      <div
        className={"filter-option " + (props.filter === "All" ? "active" : "")}
        onClick={() => props.setFilter("All")}
      >
        All
      </div>
      <div
        className={
          "filter-option " + (props.filter === "Active" ? "active" : "")
        }
        onClick={() => props.setFilter("Active")}
      >
        Active
      </div>
      <div
        className={
          "filter-option " + (props.filter === "Completed" ? "active" : "")
        }
        onClick={() => props.setFilter("Completed")}
      >
        Completed
      </div>
    </div>
  );
}
