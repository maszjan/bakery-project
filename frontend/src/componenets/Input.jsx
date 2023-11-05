const Input = (props) => {
  return (
    <div className="flex flex-row space-x-6 align-middle items-center font-bold">
      <label
        title={props.title}
        className="text-xl text-darkBrown w-[40%] text-start rounded-3xl"
      >
        {props.title}
      </label>
      <input
        diff={props.diff}
        className="md:w-[250px] bg-lightBrown  accent-darkerBrown focus:bg-lighterBrown focus:outline-0 text-darkerBrown font-semibold focus:text-darkBrown rounded-md"
        type={props.diff}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default Input;
