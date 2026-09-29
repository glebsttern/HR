import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Условия были отдельной страницей, теперь это раздел «Работы с нами».
   * Старый адрес не бросаем — уводим на тот же раздел.
   */
  redirects() {
    return Promise.resolve([
      { source: "/terms", destination: "/about-us#terms", permanent: true },
    ]);
  },
};

export default nextConfig;
