const Collapse = (props) => {
  return (
    <div tabIndex={0} className="collapse group">
      <div className="collapse-title bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content rounded-t-md">
        {props.content}
      </div>
      <div className="collapse-content bg-primary text-primary-content group-focus:bg-secondary group-focus:text-secondary-content">
        {props.children}
      </div>
    </div>
  );
};

export default Collapse;
