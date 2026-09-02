const translations = {
  de: {
    demoTape:'DEMOANSICHT · SIE KÖNNEN HIER NUR DE / EN AUSWÄHLEN', statsDemoTape:'DEMOANSICHT · SIE KÖNNEN HIER NUR DE / EN AUSWÄHLEN · BEISPIEL / EXAMPLE', eyebrow:'Open Art Register', title:'Ein Fundort für künstlerische Praxis.',
    subtitle:'Ein zweisprachiges, nicht-kommerzielles Künstlerregister für Selbstauskunft, Sichtbarkeit, Suche und geschützte Statistik künstlerischer Praxis.',
    ctaSearch:'Register', ctaRules:'Betriebshinweise', ctaRegister:'Profil bearbeiten', login:'Anmelden', createAccount:'Registrieren',
    accountLoggedOut:'Du bist noch nicht angemeldet. Du kannst öffentliche Inhalte ansehen und deine Angaben vorbereiten.', loginQuestion:'Anmelden?', registerQuestion:'Registrieren?',
    themeDark:'Dunkel', infoBtn:'Info', accessibilityBtn:'Barrierefreiheit', principleKicker:'Leitgedanke', principleTitle:'Das Register entscheidet nicht, wer Künstler-/in ist.',
    pilotPill:'Pilotbetrieb · begrenzte Profilzahl', principleText:'Es dokumentiert künstlerische Praxis auf Basis von Selbstauskunft. Es gibt keine Jury, keine Qualitätsbewertung und keine Aufnahmeprüfung.',
    pOpenTitle:'Offenheit', pOpenText:'Die Registrierung ist kostenlos. In der Pilotphase ist sie ab 16 Jahren möglich; für 16- und 17-Jährige ist die Zustimmung einer sorgeberechtigten Person erforderlich. Ein Geburtsdatum wird dafür nicht erhoben. Registrierte Personen steuern selbst, was sichtbar wird.', pVolTitle:'Freiwilligkeit', pVolText:'Öffentliche Sichtbarkeit, Suche und Statistik können getrennt gesteuert werden.',
    pNoJuryTitle:'Keine Bewertung', pNoJuryText:'Das Register misst nicht Qualität, Erfolg oder Bedeutung.', pResearchTitle:'Schutzlogik', pResearchText:'Statistik erscheint nur aggregiert und erst bei ausreichend großen Gruppen.',
    registerKicker:'1 · Selbstauskunft', registerTitle:'Profil bearbeiten', toggleRegisterOpen:'Selbstauskunft öffnen', demoDisabledHint:'In dieser öffentlichen Demonstration ist die produktive Bedienung deaktiviert.',
    statsKicker:'2 · Empirie', statsTitle:'Aggregierte Übersicht', protectedValue:'Geschützt', statsEligibleProfiles:'Insgesamt zugestimmte Statistikprofile', minForStats:'Mindestprofile für Detailstatistik',
    statsLockedTitle:'Statistik noch geschützt', statsLockedText:'Statistiken werden erst ab 50 zugestimmten Statistikprofilen unterstützt.',
    statsRequestText:'Der Statistikexport ist auf die in der aggregierten Übersicht sichtbaren Daten begrenzt. Weitere statistische Erhebungen werden nur nach begründeter Anfrage zugänglich gemacht.',
    aggregationPolicyText:'Aggregierte öffentliche Statistik erst ab 50 zugestimmten Statistikprofilen; keine Einzelwerte für Gruppen unter 5; nur freigegebene kontrollierte Statistikfelder.',
    directoryKicker:'3 · Fundort', directoryTitle:'Praxis finden', directoryHint:'Öffentliche Profile werden alphabetisch angezeigt. Suche und Filter verfeinern die Liste.', showResults:'Ergebnisse anzeigen', search:'Suchen',
    searchPlaceholder:'Name, Schlagwort, Ort, Disziplin, Praxis oder Kontaktziel …', allLevels:'Alle Praxisformen', allDisciplines:'Alle Disziplinen', allStatus:'Alle Praxisaktivitäten', allOpenTo:'Alle Kontaktziele',
    bookmarkKicker:'4 · Merkliste', bookmarkTitle:'Meine private Merkliste', bookmarkCountLabel:'Einträge', bookmarkHint:'Du kannst bis zu 5 öffentliche Profilkarten für dich merken. Die Merkliste ist privat, geht nicht in Statistik ein und erzeugt keine Bewertung oder Rangliste.',
    bookmarkPrivacyNote:'Ein Eintrag entfernt nur deinen eigenen Merkliste-Bezug. Es wird kein Profil gelöscht, gemeldet, blockiert oder statistisch bewertet.',
    governanceKicker:'5 · Betrieb, Sicherheit und Transparenz', governanceTitle:'Nutzungsbedingungen, Datenschutz und technische Schutzgrenzen',
    gPrivacyTitle:'Nutzungsbedingungen und Datenschutz', gPrivacyText:'Du entscheidest getrennt, was sichtbar wird, was in der Suche erscheint und was nur zusammengefasst in Statistiken eingeht.',
    gResearchTitle:'Forschung', gResearchText:'Die freiwillige Sichtbarmachung künstlerischer Arbeit in statistischer Form ist eine zweite Zielsetzung des Registers.',
    gProjectTitle:'Datenbankbasiertes Register', gProjectText:'Im Mittelpunkt stehen strukturierte Angaben dazu, wie künstlerische Praxis sichtbar und auffindbar wird.',
    gAccessibilityTitle:'Barrierefreiheit', gAccessibilityText:'Diese Version enthält Hinweise für Tastatur, Fokus, Formularlabels und Statusmeldungen.', trustKicker:'Sicherheit und Transparenz', trustTitle:'Technische Schutzgrenzen offen erklärt',
    trustIntro:'Diese Angaben beschreiben den technischen Stand und sind keine unabhängige Zertifizierung.', trustHttpsTitle:'Verschlüsselte Verbindung', trustHttpsText:'Die Website wird über HTTPS übertragen.',
    trustPermissionsTitle:'Rechte bleiben serverseitig', trustPermissionsText:'Der Browser entscheidet keine Rollen oder Zugriffsrechte und greift nicht direkt auf die Datenbank zu.',
    trustChoicesTitle:'Getrennte Freigaben', trustChoicesText:'Öffentliche Sichtbarkeit, Suche und Statistik bleiben getrennte Entscheidungen.', trustEvidenceTitle:'Technische Nachweise', trustEvidenceText:'Diese öffentliche Demo zeigt nur ausdrücklich freigegebene Nachweise und keine produktive Anwendungslogik.',
    footerText:'Open Art Register · Nicht-kommerzielles Künstlerregister.', publicDemoFooter:'© 2026 Jeremias Erdogan · Öffentliche Demo · nur DE/EN bedienbar', exampleFooter:'© 2026 Jeremias Erdogan · synthetische Beispielansicht',
    exampleTitle:'Empirie – vollständige Beispielansicht', exampleIntro:'Die Darstellung folgt der vorgesehenen OAR-Statistikoberfläche, verwendet aber ausschließlich synthetische Beispieldaten.',
    chartNote:'Beispielansicht – in den Schaubildern werden keine echten Open-Art-Register-Daten verwendet.', exampleBadge:'KEINE ECHTEN DATEN',
    publicArtisticDisciplinesTitle:'Statistisch freigegebene künstlerische Disziplinen', publicPracticeAreaTitle:'Verhältnis der Praxisbereiche',
    discPainting:'Malerei / Zeichnung / Grafik', discDigital:'Digitale Kunst / Medienkunst / Code', discText:'Literatur / Schreiben / Text', discSculpture:'Skulptur / Objekt / Installation', discSound:'Klang / Musik / Sound Art', discOther:'Weitere freigegebene Zuordnungen',
    areaArt:'Künstlerische Disziplinen', areaEducation:'Kunst-/Vermittlung', areaCurating:'Kuratieren', areaResearch:'Künstlerische Forschung / Archiv',
    publicDisciplineAssignmentNote:'Mehrfachauswahl ist möglich. Der Disziplinkuchen zeigt statistisch freigegebene künstlerische Disziplinzuordnungen. Der Praxisbereichskuchen fasst die gewöhnlichen Disziplinen als „Künstlerische Disziplinen“ zusammen und zeigt Kunst-/Vermittlung, Kuratieren und Künstlerische Forschung / Archiv einzeln. Jedes Profil zählt höchstens einmal je Praxisbereich; Prozentwerte beziehen sich auf synthetische Beispielzuordnungen, nicht auf eindeutige Personen. Gruppen unter fünf Profilen bleiben unterdrückt.', authenticatedStatisticsHint:'Weitere aggregierte Statistikansichten sind produktiv nur nach Anmeldung sichtbar. Die Schutzgrenzen 50 und 5 bleiben bestehen. In dieser Beispielansicht werden auch diese Fähigkeiten ausschließlich mit synthetischen Werten dargestellt.',
    chartActivity:'Praxisaktivität', activePractice:'Aktiv fortgeführt', pausedPractice:'Pausiert / unregelmäßig', stoppedPractice:'Nicht mehr aktiv',
    chartPracticeScope:'Praxisumfang', fullTime:'Hauptberuflich', partTime:'Teilberuflich', hobby:'Hobby', monthlyTimelineTitle:'Anmeldungen im Zeitverlauf', monthlyTimelineNote:'Anzahl der Anmeldungen pro Monat.',
    aggregationExampleNote:'Synthetische Demonstration: Die Beispielwerte dienen ausschließlich dazu, die statistische Darstellung vollständig sichtbar zu machen. Es findet keine Live-Abfrage statt.'
  },
  en: {
    demoTape:'DEMO VIEW · YOU CAN ONLY SELECT DE / EN HERE', statsDemoTape:'DEMO VIEW · YOU CAN ONLY SELECT DE / EN HERE · EXAMPLE / BEISPIEL', eyebrow:'Open Art Register', title:'A place to find artistic practice.',
    subtitle:'A bilingual, non-commercial artist register for self-declaration, visibility, search and protected statistics on artistic practice.',
    ctaSearch:'Register', ctaRules:'Operating notes', ctaRegister:'Edit profile', login:'Sign in', createAccount:'Register',
    accountLoggedOut:'You are not signed in yet. You can view public content and prepare your information.', loginQuestion:'Sign in?', registerQuestion:'Register?',
    themeDark:'Dark', infoBtn:'Info', accessibilityBtn:'Accessibility', principleKicker:'Core idea', principleTitle:'The register does not decide who is an artist.',
    pilotPill:'Pilot operation · limited profile count', principleText:'It documents artistic practice based on self-declaration. Public information is self-declared; there is no jury, quality rating or admission test.',
    pOpenTitle:'Openness', pOpenText:'Registration is free. During the pilot phase it is available from age 16; users aged 16 or 17 require consent from a person with parental responsibility. No date of birth is collected for this purpose. Registered users decide what becomes visible.', pVolTitle:'Voluntary data', pVolText:'Only technical minimum data is required.', pNoJuryTitle:'No assessment', pNoJuryText:'The register does not measure quality, success or importance.', pResearchTitle:'Protection logic', pResearchText:'Statistics only when groups are large enough.',
    registerKicker:'1 · Self-declaration', registerTitle:'Edit profile', toggleRegisterOpen:'Open self-declaration', demoDisabledHint:'Productive interaction is disabled in this public demonstration.',
    statsKicker:'2 · Empirics', statsTitle:'Aggregated overview', protectedValue:'Protected', statsEligibleProfiles:'Total consented statistics profiles', minForStats:'Minimum profiles for detailed stats',
    statsLockedTitle:'Statistics still protected', statsLockedText:'Statistics are only supported once at least 50 consented statistics profiles have been reached.',
    statsRequestText:'The statistics export is limited to data visible in the aggregated overview. Additional statistical analyses are only made available after a reasoned request.',
    aggregationPolicyText:'Aggregated public statistics only from 50 consented statistics profiles; no single values for groups below 5; only released controlled statistics fields.',
    directoryKicker:'3 · Finder', directoryTitle:'Find practice', directoryHint:'Public profiles are shown alphabetically. Search and filters refine the list.', showResults:'Show results', search:'Search',
    searchPlaceholder:'Name, keyword, place, discipline, practice or contact goal …', allLevels:'All practice forms', allDisciplines:'All disciplines', allStatus:'All activity statuses', allOpenTo:'All contact goals',
    bookmarkKicker:'4 · Saved list', bookmarkTitle:'My private saved list', bookmarkCountLabel:'Entries', bookmarkHint:'You can save up to 5 public profile cards for yourself. The list is private, does not enter statistics and creates no rating or ranking.', bookmarkPrivacyNote:'Removing an entry only removes your own saved-list reference. No profile is deleted, reported, blocked or statistically rated.',
    governanceKicker:'5 · Operations, security and transparency', governanceTitle:'Terms of use, privacy and technical protection boundaries',
    gPrivacyTitle:'Terms of use and privacy', gPrivacyText:'You decide separately what becomes visible, what appears in search and what only enters aggregated statistics.',
    gResearchTitle:'Research', gResearchText:'Voluntary statistical visibility of artistic practice is a second objective of the register.', gProjectTitle:'Database-based register', gProjectText:'The focus is structured information on how artistic practice becomes visible and findable.',
    gAccessibilityTitle:'Accessibility', gAccessibilityText:'This version includes guidance for keyboard use, focus, form labels and status messages.', trustKicker:'Security and transparency', trustTitle:'Technical protection boundaries explained openly', trustIntro:'These statements describe the technical state and are not an independent certification.', trustHttpsTitle:'Encrypted connection', trustHttpsText:'The website is transmitted over HTTPS.', trustPermissionsTitle:'Permissions remain server-side', trustPermissionsText:'The browser does not decide roles or access rights and does not access the database directly.', trustChoicesTitle:'Separate choices', trustChoicesText:'Public visibility, search and statistics remain separate decisions.', trustEvidenceTitle:'Technical evidence', trustEvidenceText:'This public demo contains only explicitly released evidence and no production application logic.',
    footerText:'Open Art Register · Non-commercial artist register.', publicDemoFooter:'© 2026 Jeremias Erdogan · public demo · DE/EN only', exampleFooter:'© 2026 Jeremias Erdogan · synthetic example view',
    exampleTitle:'Empirics – complete example view', exampleIntro:'The presentation follows the intended OAR statistics interface but uses synthetic example data only.', chartNote:'Example view – no real Open Art Register data is used in these charts.', exampleBadge:'NO REAL DATA',
    publicArtisticDisciplinesTitle:'Statistically released artistic disciplines', publicPracticeAreaTitle:'Ratio of practice areas', discPainting:'Painting / drawing / graphics', discDigital:'Digital art / media art / code', discText:'Literature / writing / text', discSculpture:'Sculpture / object / installation', discSound:'Sound / music / sound art', discOther:'Other released assignments', areaArt:'Artistic disciplines', areaEducation:'Art / mediation', areaCurating:'Curating', areaResearch:'Artistic research / archive',
    publicDisciplineAssignmentNote:'Multiple selections are possible. The discipline pie shows statistically released artistic-discipline assignments. The practice-area pie groups the ordinary disciplines as “Artistic disciplines” and shows Art / mediation, curating and artistic research / archive individually. Each profile counts at most once per practice area; percentages refer to synthetic example assignments, not unique people. Groups below five profiles remain suppressed.', authenticatedStatisticsHint:'Additional aggregated statistics are visible in production only after sign-in. The protection thresholds 50 and 5 remain in force. This example view displays those capabilities with synthetic values only.', chartActivity:'Practice activity', activePractice:'Active practice', pausedPractice:'Paused / irregular', stoppedPractice:'No longer active', chartPracticeScope:'Practice scope', fullTime:'Full-time', partTime:'Part-time', hobby:'Hobby', monthlyTimelineTitle:'Registrations over time', monthlyTimelineNote:'Number of registrations per month.', aggregationExampleNote:'Synthetic demonstration: the example values only make the full statistics presentation visible. No live query is performed.'
  }
};

function applyLanguage(language) {
  const lang = language === 'en' ? 'en' : 'de';
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[lang][key]) element.textContent = translations[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (translations[lang][key]) element.setAttribute('placeholder', translations[lang][key]);
  });
  document.querySelectorAll('[data-lang]').forEach((button) => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('langDeBtn')?.addEventListener('click', () => applyLanguage('de'));
  document.getElementById('langEnBtn')?.addEventListener('click', () => applyLanguage('en'));
  applyLanguage('de');
});
