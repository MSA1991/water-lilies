import lily from "../assets/images/lily.svg";

export const About = () => {
  return (
    <section className="bg-secondary-light py-24">
      <div className="container relative z-10">
        <h2 className="mb-5 text-center text-3xl font-bold">
          Про водяні лілії
        </h2>

        <div className="text-center text-xl">
          <p>
            Водяні лілії, або як їх ще називаю німфеї - це багаторічні водні
            рослини, які прекрасно почувають себе в штучних водоймах. Кожна
            квітка, коли цвіте, тримається на поверхні кілька днів, після чого
            її змінюють нові. Ці дивовижні рослини не тільки прикрашають водну
            поверхню, а й відіграють важливу роль в екосистемі, забезпечуючи
            тінь і захист для водних мешканців.
          </p>
          <br />
          <p>
            З правильним доглядом німфеї стануть справжньою прикрасою вашої
            водойми і подарують вам безліч яскравих моментів протягом усього
            сезону створюючи унікальну атмосферу спокою та гармонії.
          </p>
        </div>

        <img
          src={lily}
          alt="водяна лілія"
          className="absolute left-1/2 top-1/2 -z-10 max-w-96 -translate-x-1/2 -translate-y-1/2 opacity-70"
        />
      </div>
    </section>
  );
};
