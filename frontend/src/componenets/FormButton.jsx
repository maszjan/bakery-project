

const FormButton = (props) => {
  return (
    <button
      text={props.text}
      onClick={props.onClick}
      className="text-3xl hover:scale-105  hover:mx-12 px-8 transition-all text-center py-2 font-semibold focus:outline-0 text-typo bg-darkest rounded-md"
    >
      {props.text}
    </button>
  );
};

export default FormButton;
