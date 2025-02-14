import { PageSectionsId } from '../types/PageSections';
import lily from '../assets/images/lily.svg';

export const About = () => (
  <section className="section-bg" id={PageSectionsId.About}>
    <div className="section-py container relative z-0">
      <h2 className="section-title title-mb text-center">Про Німфеї</h2>

      <p className="container-sm text-center font-bold md:text-xl">
        Німфеї, або як їх ще називаю «водяні лілії» - це багаторічні водні
        рослини, які прекрасно почувають себе в штучних водоймах і є справжніми
        королевами ставків. Кожна квітка, коли цвіте, тримається на поверхні
        кілька днів, після чого її змінюють нові. Ці дивовижні рослини не тільки
        прикрашають водну поверхню, а й відіграють важливу роль в екосистемі,
        забезпечуючи тінь і захист для водних мешканців.
        <br />
        <br />З правильним доглядом німфеї стануть справжньою прикрасою вашої
        водойми і подарують вам безліч яскравих моментів протягом усього сезону,
        створюючи унікальну атмосферу спокою та гармонії.
      </p>

      <img
        src={lily}
        alt="водяна лілія"
        loading="lazy"
        className="absolute left-1/2 top-1/2 -z-10 max-w-80 -translate-x-1/2 -translate-y-1/2 opacity-40 lg:max-w-96"
      />
    </div>
  </section>
);
