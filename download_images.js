const fs = require("fs");
const https = require("https");
const path = require("path");

// Список URL-адресов изображений
const imageUrls = [
  "https://m.media-amazon.com/images/M/MV5BODZlYmVkZGMtZjMzZS00NTU1LWJhNzQtNTFhMDU0NDI2YjlhXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BYTA4MDdhNjAtMzAwMC00ZjczLTllYzUtM2FmYmM2NzcwZmQ3XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BYTMyZDdkOTAtMjRkMi00Mzk2LWEwYzMtODFhYWE2NGYzZGY2XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BMzM3ZDEyNjctZjliNi00N2ExLWFiOWMtMjBmY2ZhNTQ1ODU4XkEyXkFqcGc@._V1_.jpg",
  "https://avatars.mds.yandex.net/i?id=311340b4ee4313bb15750973b47ba4d3_l-4542725-images-thumbs&n=13",
  "https://static.kinoafisha.info/k/series_episodes/1920x1080/upload/series/episodes/556730748132.jpg",
  "https://images.kinorium.com/movie/shot/2014719/w1500_49503794.jpg",
  "https://m.media-amazon.com/images/M/MV5BNDgyM2EwMmUtMjE1YS00ZTc5LTllOWYtNjdhNGM2MzVhODUyXkEyXkFqcGc@._V1_.jpg",
  "https://static.tildacdn.com/tild3931-6537-4431-b862-303464356265/7.jpg",
  "https://a.ltrbxd.com/resized/sm/upload/d0/la/xg/3f/bad%20travelling-1200-1200-675-675-crop-000000.jpg?v=dd35a0c8b0",
  "https://avatars.dzeninfra.ru/get-zen_doc/5313760/pub_629659ef86137a37ee41a8ac_62965d152640c17a3d951b90/scale_1200",
  "https://cdn.kanobu.ru/editor/images/99/b568b3c7-995d-4c36-828e-02bc7468aeb7.webp",
  "https://m.media-amazon.com/images/M/MV5BYzk1MGQzZTQtZTZjNi00NTZkLWJjMDMtNGFiNzUyNmE2YmZkXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BODIxZGQyOGQtOTJhMy00YjEzLThmMTQtZTQzNGY5OWYzNDg0XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BZWU1ZDQ0OWUtZDEzNC00NTExLTg2NTQtM2IwM2QzYTQyMmNiXkEyXkFqcGc@._V1_.jpg",
  "https://i.playground.ru/e/TQRg2qpCQD0V5_NjjQloyw.png",
  "https://avatars.mds.yandex.net/i?id=a60e93efd15a7ab65c387100dc43e1b1_l-12521528-images-thumbs&n=13",
];

// Создаем папку для сохранения изображений, если её нет
const downloadDir = "./downloaded_images";
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

// Функция для скачивания изображения
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Проверяем статус ответа
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download image: ${url}. Status code: ${response.statusCode}`
            )
          );
          return;
        }

        // Определяем расширение файла из Content-Type или URL
        let extension = ".jpg";
        const contentType = response.headers["content-type"];
        if (contentType) {
          if (contentType.includes("png")) extension = ".png";
          else if (contentType.includes("gif")) extension = ".gif";
          else if (contentType.includes("jpeg") || contentType.includes("jpg"))
            extension = ".jpg";
        } else if (url.includes(".png")) {
          extension = ".png";
        } else if (url.includes(".gif")) {
          extension = ".gif";
        }

        const filePath = path.join(downloadDir, `${filename}${extension}`);
        const fileStream = fs.createWriteStream(filePath);

        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}${extension}`);
          resolve();
        });

        fileStream.on("error", (err) => {
          fs.unlink(filePath, () => {});
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// Скачиваем все изображения последовательно
// Скачиваем все изображения последовательно, начиная с номера 19
async function downloadAllImages() {
  for (let i = 0; i < imageUrls.length; i++) {
    try {
      await downloadImage(imageUrls[i], `episode_${i + 19}`); // Изменено с i+1 на i+19
    } catch (error) {
      console.error(`Error downloading image ${i + 19}:`, error.message); // Также обновлено здесь
    }
  }
  console.log("All downloads completed!");
}

// Запускаем процесс скачивания
downloadAllImages();
