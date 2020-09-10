import { helper } from "@ember/component/helper";

export default helper(function violationForRule(params) {
  const [violationRule] = params;

  const violations = {
    no_helmet: "Brak kasku",
    no_glasses: "Brak okularów",
    no_temperature_to_high: "Temperatura powyżej 37.5 st.",
  };

  return violations[violationRule];
});
