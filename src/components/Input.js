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
  accept = "*",
  showLabel = true,
}) => {
  return (
    <div className={className + " custom-input-" + type}>
      {showLabel ? (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : (
        <></>
      )}
      {type !== "file" ? (
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
      ) : (
        <input
          type="file"
          id={id}
          name={name}
          className="block w-full text-sm mt-1 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-tblack-300 hover:file:bg-gray-300"
          onChange={onChange}
          required={required}
          accept={accept}
        />
      )}
    </div>
  );
};
