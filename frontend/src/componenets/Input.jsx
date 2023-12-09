const Input = (props) => {
  return (
    <div className="flex flex-row space-x-6 align-middle items-center font-bold">
      <label
        title={props.title}
        className="text-xl text-typo w-[40%] text-start rounded-3xl"
      >
        {props.title}
      </label>
      <input
        diff={props.diff}
        className="md:w-[250px] bg-darkest focus:bg-light focus:outline-0 text-typo font-semibold rounded-md"
        type={props.diff}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Input;
