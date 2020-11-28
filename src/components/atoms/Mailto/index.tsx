//#region > Improts
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//#endregion

//#region > Components
const Mailto = (props: {
  email: string;
  subject: string;
  body: string;
  children: any;
  className?: string;
}) => {
  const { email, subject, body, children, className } = props;
  return (
    <a
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
      className={className}
    >
      {children}
    </a>
  );
};
//#endregion

//#region > Exports
export default Mailto;
//#endregion
