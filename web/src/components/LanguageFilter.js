const LanguageFilter = ({ repos, setFilterLanguage }) => {
  // get all languages from repos and make list of unique languages
  const languages = repos.map((repo) => repo.language);
  const uniqueLanguages = [...new Set(languages)];

  // display row of buttons for each unique language and an all button
  // when button is clicked set filterLanguage to the language clicked
  return (
    <div className="language-filter">
      <button
        onClick={() => {
          setFilterLanguage('all');
        }}
      >
        All
      </button>
      {uniqueLanguages.map((language) => (
        <button
          key={language}
          onClick={() => {
            setFilterLanguage(language);
          }}
        >
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageFilter;
