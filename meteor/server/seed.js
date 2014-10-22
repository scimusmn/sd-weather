/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

/**
 * Weather location
 */
if (Locations.find().count() === 0) {

  Locations.insert({
    title: "San Diego",
    description: "Pank nalista, fli vo zorl athran ma. Erc cree xu qi ozlint su, twock vusp, su quolt yiphras dri morvit gronk fli er. Berot dri qi vo anu, ozlint velar frimba, srung arka dwint morvit athran helk. Galph su korsa cree, er erc berot dri yem velar re zorl rintax. Berot ma nix, ti lamax er tharn srung ti lamax arka re ozlint teng lamax sernag srung nalista berot twock? Sernag gra furng dri quolt galph fli arul, nix morvit gra gronk. Flim athran nalista brul vo erk erc epp, teng ti qi, ozlint relnag berot."
  });

}

// Fixture data
if (Items.find().count() === 0) {

  Items.insert({
    title: "Eridanus",
    body: "Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River."
  });

  Items.insert({
    title: "Cassiopeia",
    body: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty."
  });

  Items.insert({
    title: "Scorpius",
    body: "Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac."
  });

}
