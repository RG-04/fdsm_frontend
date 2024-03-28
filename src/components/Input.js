export default ({
  name,
  id,
  label,
  type,
  className = "",
  value,
  onChange,
  placeholder = "",
  required = false,
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type || "text"}
        id={id}
        name={name}
        className="form-input mt-1 block w-full border-b-solid border-b-2 border-gray-300 px-2 py-1 focus:border-blue-500 valid:border-blue-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
