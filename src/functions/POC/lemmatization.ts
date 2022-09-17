const lemmatizer = require('node-lemmatizer');

const text = `1) Use of Proceeds
The proceeds of this Green Bond will be used to (re-) finance loans to private costumers, i.e. private
mortgage loans for new residential buildings as well as “green loans” for financing renewable energy and
energy efficiency upgrades on private buildings that are mainly realized by the installation of solar panels
(other upgrades include for example solar heating, heat pumps, boilers as well as insulation materials,
upgrades of windows and doors). The proceeds will also be used to finance commercial real estate loans for
the construction and financing of energy efficient buildings as well as for energy efficiency upgrades on
existing buildings (more information on commercial real estate loans can be found below the following
table). All assets are situated in the Netherlands; some of the assets are ABN AMRO premises.
The following categories have been chosen for allocating the proceeds of this issuance (the percentages
relate to a green bond portfolio of mEUR 500):`;

const regex = /[^A-Za-z0-9]/g;

const lemmatization = (text: string) => {
  const prepareText = text.toLowerCase().replace(regex, ' ').split(/\s/);
  const lemmas = prepareText.map((word) => lemmatizer.lemmas(word));
  return lemmas;
};

// console.log(lemmatizer.lemmas(['buildings', 'plants', 'trees']));

console.log(lemmatization(text));
