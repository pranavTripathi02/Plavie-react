import UnderConstruction from "../assets/underConstruction.svg?react";

function UnderDevelopment() {
  return (
    <div className="mx-auto text-center">
      <div className="mx-auto w-1/2 lg:w-1/3 text-end">
        <UnderConstruction />
        <a
          href="https://storyset.com/work"
          className="opacity-30 text-xs"
        >
          Work illustrations by Storyset
        </a>
      </div>
      <h1>This part of our application is still under development</h1>
    </div>
  );
}

export default UnderDevelopment;
