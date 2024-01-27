import React, { useId } from "react";

function Input({label, type = "text", placeholder = "", ...props }, ref) {
  let id = useId();
  return label ? (
    <div>
      <label htmlFor={id}>{label} : </label>
      <input id={id} type={type} placeholder={placeholder} {...props} ref={ref} />
    </div>
  ) : (
    <input id={id} type={type} placeholder={placeholder} {...props} ref={ref}/>
  );
}

export default React.forwardRef(Input);
