export function mapMarketSpecifier(tekst, specifier, homeTeam, awayTeam) {
  let returnText = tekst;
  // ako postoji specifier radimo split "|" pa split "="
  // mjenjamo key sa value
  if (specifier && specifier.length > 0) {
    specifier.split("|").forEach((specifierItem) => {
      const specifierValues = specifierItem.split("=");
      if (specifierValues.length === 2) {
        returnText = returnText.replace(
          `{${specifierValues[0]}}`,
          specifierValues[1]
        );
      }
    });
    // console.log("map", tekst, specifier, returnText);
  }
  if (homeTeam) returnText = returnText.replace("!D", homeTeam);
  if (awayTeam) returnText = returnText.replace("!G", awayTeam);
  return returnText;
}
