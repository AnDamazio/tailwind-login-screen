const Input = (props) => {
  const { className, label, ...args } = props;
  return (
    <>
      <label
        htmlFor={props.id}
        className={`${label.className} ${props.srOnly && "sr-only"}`}
      >
        {label.name}
      </label>
      <input className={className} {...args} />
    </>
  );
};

export default Input;
