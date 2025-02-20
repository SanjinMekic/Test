document
  .getElementById("inputForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Uzmi vrijednosti iz forme
    const hoursStudied = parseInt(
      document.getElementById("hoursStudied").value
    );
    const attendance = parseInt(document.getElementById("attendance").value);
    const parentalInvolvement = document.getElementById(
      "parentalInvolvement"
    ).value;
    const accessToResources =
      document.getElementById("accessToResources").value;
    const extracurricularActivities = document.getElementById(
      "extracurricularActivities"
    ).value;
    const sleepHours = parseInt(document.getElementById("sleepHours").value);
    const previousScores = parseInt(
      document.getElementById("previousScores").value
    );
    const motivationLevel = document.getElementById("motivationLevel").value;
    const internetAccess = document.getElementById("internetAccess").value;
    const tutoringSessions = parseInt(
      document.getElementById("tutoringSessions").value
    );
    const familyIncome = document.getElementById("familyIncome").value;
    const teacherQuality = document.getElementById("teacherQuality").value;
    const schoolType = document.getElementById("schoolType").value;
    const peerInfluence = document.getElementById("peerInfluence").value;
    const physicalActivity = parseInt(
      document.getElementById("physicalActivity").value
    );
    const learningDisabilities = document.getElementById(
      "learningDisabilities"
    ).value;
    const parentalEducationLevel = document.getElementById(
      "parentalEducationLevel"
    ).value;
    const distanceFromHome = document.getElementById("distanceFromHome").value;
    const gender = document.getElementById("gender").value;

    // Izračunaj osnovnu procjenu uspješnosti
    let score = 0;

    // Izmijenjen način dodavanja bodova na osnovu unosa
    score += Math.min(hoursStudied, 40) * 0.5; // Maksimalno 20 bodova, 0.5 boda po satu
    score += Math.min(attendance, 100) * 0.2; // Maksimalno 20 bodova, 0.2 boda po postotku prisustva
    score += Math.min(previousScores, 100) * 0.2; // Maksimalno 20 bodova, 0.20 boda po postotku uspjeha
    score += Math.max((sleepHours - 5) * 1, 0); // Svaki dodatni sat sna iznad 5 dodaje 1 bod
    score += Math.min(tutoringSessions, 8) * 1; // Maksimalno 8 boda, 1 boda po času
    score += Math.min(physicalActivity, 6) * 1; // Maksimalno 6 bodova, 1 boda po satu fizičke aktivnosti

    // Uvjetna logika za dodatne bodove
    if (parentalInvolvement === "High") score += 5;
    else if (parentalInvolvement === "Medium") score += 2;
    else if (parentalInvolvement === "Low") score -= 5; // Veće smanjenje za nisku uključenost

    if (accessToResources === "High") score += 10;
    else if (accessToResources === "Medium") score += 5;
    else if (accessToResources === "Low") score -= 10; // Veće smanjenje za nisku dostupnost

    if (extracurricularActivities === "Yes") score -= 10;
    else if (extracurricularActivities === "No") score += 5;

    if (motivationLevel === "High")
      score += 5; // Povećanje za visok nivo motivacije
    else if (motivationLevel === "Medium") score += 2;
    else if (motivationLevel === "Low") score -= 7; // Oduzimanje za nizak nivo motivacije

    if (internetAccess === "Yes") score += 10;
    else if (internetAccess === "No") score -= 20; // Veće oduzimanje za nedostatak pristupa

    if (familyIncome === "High") score += 5;
    else if (familyIncome === "Medium") score += 3;
    else if (familyIncome === "Low") score -= 5; // Oduzimanje za nizak prihod

    if (teacherQuality === "High")
      score += 10; // Veće dodavanje za kvalitetne profesore
    else if (teacherQuality === "Medium") score += 5;
    else if (teacherQuality === "Low") score -= 5; // Veće oduzimanje za nisku kvalitetu

    if (schoolType === "Public") score -= 2;
    else score += 3;

    if (peerInfluence === "Positive") score += 5;
    else if (peerInfluence === "Neutral") score += 0; // Ne dodaje ni oduzima
    else if (peerInfluence === "Negative") score -= 5; // Oduzimanje za negativan uticaj

    if (learningDisabilities === "Yes")
      score -= 20; // Veće oduzimanje za poteškoće u učenju
    else if (learningDisabilities === "No") score += 10;

    if (parentalEducationLevel === "Postgraduate") score += 5;
    else if (parentalEducationLevel === "College") score += 3;
    else if (parentalEducationLevel === "High School") score += 0; // Ne dodaje ni oduzima

    if (distanceFromHome === "Near") score += 10; // Veće dodavanje za blizinu
    else if (distanceFromHome === "Moderate") score += 5;
    else if (distanceFromHome === "Far") score -= 10; // Oduzimanje za daljinu

    if (gender === "Male") score += 0; // Ne dodaje ni oduzima
    else if (gender === "Female") score += 5; // Ovo je samo primjer, možeš prilagoditi

    // Normalizacija rezultata između 0 i 100
    const maxScore = 100; // Postavi maksimalan rezultat
    const normalizedScore = Math.min(
      Math.max((score / maxScore) * 100, 0),
      100
    );

    // Određivanje poruke na osnovu rezultata
    let message = "";

    if (normalizedScore >= 90) {
      message =
        "Izuzetno uspješan student! Velike su šanse da briljirate na fakultetu.";
    } else if (normalizedScore >= 75) {
      message =
        "Vrlo dobar student! Očekuje vas uspjeh, ali nastavite s trudom.";
    } else if (normalizedScore >= 50) {
      message =
        "Prosječan student! Možete poboljšati svoje šanse za uspjeh uz dodatni trud.";
    } else if (normalizedScore >= 30) {
      message =
        "Ispodprosječan student! Preporučuje se dodatni angažman i pomoć u učenju.";
    } else {
      message =
        "Veliki rizik od neuspjeha! Potrebno je značajno poboljšanje u učenju i organizaciji.";
    }

    // Funkcija za prikaz popupa
    function showPopup(score, message) {
      document.getElementById(
        "popup-text"
      ).innerText = `Predviđeni uspjeh učenika na fakultetu: ${score}%\n${message}`;
      document.getElementById("popup").style.display = "block";
    }

    // Zatvaranje popupa na klik dugmeta
    document
      .getElementById("closePopup")
      .addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
      });

    // Zamijeni alert poziv u tvom kodu ovim:
    showPopup(Math.round(normalizedScore), message);
  });
