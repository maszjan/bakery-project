

const FormButton = (props) => {
  return (
    <button
      text={props.text}
      onClick={props.onClick}
      className="text-3xl hover:scale-110 px-16 transition-all text-center py-2 font-semibold focus:outline-0 text-darkBrown bg-lightBrown rounded-md"
    >
      {props.text}
    </button>
  );
};

export default FormButton;
