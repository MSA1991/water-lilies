import { PageSectionsId } from '../types/PageSections';
import lily from '../assets/images/lily.svg';

export const About = () => {
  return (
    <section
      className="section-py bg-secondary-light"
      id={PageSectionsId.About}
    >
      <div className="container relative z-10">
        <h2 className="section-title mb-5 text-center">Про Німфеї</h2>

        <div className="mx-auto max-w-screen-lg text-center md:text-xl">
          <p>
            Німфеї, або, як їх ще називаю, водяні лілії - це багаторічні водні
            рослини, які прекрасно почувають себе в штучних водоймах і є
            справжніми королевами водойм. Кожна квітка, коли цвіте, тримається
            на поверхні кілька днів, після чого її змінюють нові. Ці дивовижні
            рослини не тільки прикрашають водну поверхню, а й відіграють важливу
            роль в екосистемі, забезпечуючи тінь і захист для водних мешканців.
          </p>
          <br />
          <p>
            З правильним доглядом німфеї стануть справжньою прикрасою вашої
            водойми і подарують вам безліч яскравих моментів протягом усього
            сезону, створюючи унікальну атмосферу спокою та гармонії.
          </p>
        </div>

        <img
          src={lily}
          alt="водяна лілія"
          className="absolute left-1/2 top-1/2 -z-10 max-w-80 -translate-x-1/2 -translate-y-1/2 opacity-70 lg:max-w-96"
        />
      </div>
    </section>
  );
};
