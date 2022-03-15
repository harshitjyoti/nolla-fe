export const LabelAndTextArea = ({ onChange, textValue, labelText }) => {
  return (
    <div>
      <label className="Twitter-label">{labelText}</label>

      <textarea
        className="Text-field"
        placeholder="Type Here!"
        onChange={onChange}
        value={textValue}
      />
    </div>
  );
};
