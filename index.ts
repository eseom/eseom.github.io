import * as R from "ramda";

const extras = {
  "000a": "\\n",
  "000d": "\\r",
  "0020": "\\s",
};

const trans = (v) => v.charCodeAt(0).toString(16).padStart(4, "0");
const table$ = <HTMLInputElement>document.getElementById("table");

(<HTMLInputElement>document.getElementById("check")).onclick = () =>
  (table$.innerHTML = R.pipe(
    R.map((chunk: string[]) => [
      `<tr>`,
      R.pipe(
        R.map((v: string) => `<td>${extras[trans(v)] || v}</td>`),
        R.join("")
      )(chunk),
      `</tr><tr>`,
      R.pipe(
        R.map((v) => {
          const code = trans(v);
          return `<td><a href="https://www.fileformat.info/info/unicode/char/${code}/index.htm" target="code">${code}</a></td>`;
        }),
        R.join("")
      )(chunk),
      `</tr>`,
      `<tr><td></td></tr>`,
    ]),
    R.flatten,
    R.join("")
  )(
    R.pipe(
      R.split(""),
      R.ifElse(
        (v: string[]) => R.lt(16, R.length(v)),
        R.splitEvery(16),
        (v: string[]) => [v]
      )
    )(
      (<HTMLInputElement>document.getElementById("content")).value
    ) as string[][]
  ));
