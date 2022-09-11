const Card = (props) => {
  const classes = `-space-y-px rounded-md ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
