import UnderConstruction from "../assets/underConstruction.svg?react";

function UnderDevelopment() {
  return (
    <div className="my-10 mx-auto text-center">
      <div className="mx-auto w-1/2 md:w-2/5 text-end">
        <UnderConstruction />
        <a
          href="https://storyset.com/work"
          className="opacity-30 text-xs"
        >
          Work illustrations by Storyset
        </a>
      </div>
      <div className="my-10">
        <h1>This part of our application is still under development.</h1>
        <h2>Please try again soon.</h2>
      </div>
    </div>
  );
}

export default UnderDevelopment;
