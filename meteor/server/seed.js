/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

/**
 * Weather location
 */
if (Locations.find().count() === 0) {

  Locations.insert({
    title: 'Anza Borego',
    description: 'Pank nalista, fli vo zorl athran ma. Erc cree xu qi ozlint su, twock vusp, su quolt yiphras dri morvit gronk fli er. Berot dri qi vo anu, ozlint velar frimba, srung arka dwint morvit athran helk. Galph su korsa cree, er erc berot dri yem velar re zorl rintax. Berot ma nix, ti lamax er tharn srung ti lamax arka re ozlint teng lamax sernag srung nalista berot twock? Sernag gra furng dri quolt galph fli arul, nix morvit gra gronk. Flim athran nalista brul vo erk erc epp, teng ti qi, ozlint relnag berot.',
    latitude: '33.259167',
    longitude: '-116.399167'
  });
  Locations.insert({
    title: 'Imperial Beach',
    description: 'Kurnap harle yem irpsa fli cree lydran zorl, delm morvit ma rintax vusp ewayf ik. Obrikt tharn prinquis urfa. Qi er tharn ma yiphras rhull obrikt ux erk delm, obrikt erk. Rhull kurnap vo yiphras jince tharn jince, fli ju frimba gra? Ux irpsa morvit xu vo ik cree ozlint ux fli, ma tharn er, lydran wex. Galph gra cree urfa yem wex su.',
    latitude: '32.578333',
    longitude: '-117.117222'
  });
  Locations.insert({
    title: 'Julian',
    description: 'Gen sernag quolt kurnap pank anu. Pank menardis vusp nix fli er jince erc kurnap urfa rintax er epp, clum yiphras gen obrikt yem harle, arka pank zorl quolt. La nix vusp athran er lydran. Anu helk prinquis, srung whik irpsa ux la gra berot gra irpsa berot urfa. Ik gronk harle nix ozlint dwint urfa berot nix ma dri, fli wynlarce su, delm dwint. Rhull ozlint, ti nalista athran anu, harle ik twock, zeuhl vusp nalista, kurnap er. Twock su wex ewayf wex. Flim furng irpsa rhull velar erk thung nix vusp gra pank whik er irpsa velar sernag gronk.',
    latitude: '33.070833',
    longitude: '-116.585556'
  });
  Locations.insert({
    title: 'Palomar Mountain',
    description: 'Vusp morvit xi rintax arka velar gronk ux gen twock dwint ti. Ik morvit la brul nalista nix erc ewayf tharn. Arka brul, twock galph xi urfa galph erk, tharn fli er clum anu athran twock sernag? Er vusp dri quolt rhull harle la prinquis, sernag yiphras, xi twock arul delm ti. Kurnap whik ma, jince teng, ju ik, su lamax yem vo. Quolt, wex dri nalista, zeuhl harle kurnap.',
    latitude: '33.363484',
    longitude: '-116.836394'
  });

}

// Fixture data
if (Items.find().count() === 0) {

  Items.insert({
    title: 'Eridanus',
    body: 'Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River.'
  });

  Items.insert({
    title: 'Cassiopeia',
    body: 'Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty.'
  });

  Items.insert({
    title: 'Scorpius',
    body: 'Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac.'
  });

}
