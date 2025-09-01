import './Footer.scss';

export const Footer = () => {
  function scrollPage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__logo">
        <a className="footer-logo__link" href="/">
          <img src="/img/logo/ra_store_logo_v2-removebg.png" alt="logo-ra-store" className="logo-ra-store"/>
        </a>
      </div>
      <div className="footer__links">
        <ul className="footer-list">
          <li className="footer-list__item">
            <a
              className="footer-list__link"
              /* eslint-disable-next-line max-len */
              href="https://github.com/Abdrakhmanov-Renat?tab=overview&from=2025-02-01&to=2025-02-03"
            >
              github
            </a>
          </li>

          <li className="footer-list__item">
            <a
              className="footer-list__link"
              href="mailto:api.test.renat@gmail.com"
            >
              contacts
            </a>
          </li>

          <li className="footer-list__item">
            <a className="footer-list__link" href="/">
              rights
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__button-up">
        <p className="button-up__title">Back to top</p>
        <div onClick={scrollPage} className="button-up__button" />
      </div>
    </footer>
  );
};
