// change local storage theme key as selected by user
type TTheme = "light" | "dark";

function switchTheme(selectedTheme: TTheme) {
  if (selectedTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

export default switchTheme;
