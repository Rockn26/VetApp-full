import React from "react";
import "./HomePage.style.css";

const HomePage = () => {
    return (
        <div className="homepage-component">
            <div className="card-component">
                <h1>Veteriner Kliniği Yönetim Sistemine Hoş Geldiniz!</h1>
                <p>
                    Hayvan dostlarımızın sağlığı ve mutluluğu her şeyden önemli.
                    Bu platform, veteriner hizmetlerimizi kolayca yönetebilmeniz
                    ve sevdiklerinizin en iyi bakımı almasını sağlamak için
                    tasarlandı.
                </p>
                <p>
                    İster randevu alın, ister sağlık kayıtlarına göz atın,
                    isterse de tedavi süreçlerini takip edin; tüm
                    ihtiyaçlarınızı karşılamak için buradayız.
                </p>
                <h2>Neler Sunuyoruz?</h2>
                <ul>
                    <li>
                        Çevrimiçi Randevu Sistemi: Randevularınızı planlayın ve
                        yönetin, hiçbir tedaviyi kaçırmayın.
                    </li>
                    <li>
                        Hasta Kayıtları: Hayvan dostlarınızın tüm sağlık
                        geçmişine tek bir yerden ulaşın.
                    </li>
                    <li>
                        Tedavi Takibi: Devam eden tedavileri ve aşı takvimlerini
                        takip edin.
                    </li>
                    <li>
                        Uzman Veterinerler: Alanında uzman veterinerlerimizle
                        tanışın ve danışın.
                    </li>
                </ul>
                <p>
                    Hayvan sağlığına dair her şeyi bir arada bulabileceğiniz bu
                    platformda, sevimli dostlarınızın ihtiyaç duyduğu her şeyi
                    kolayca yönetebilirsiniz. Sağlık, mutluluk ve daha fazlası
                    için doğru yerdesiniz!
                </p>
            </div>
        </div>
    );
};

export default HomePage;
