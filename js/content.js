function loadContent() {
  // var ua = navigator.userAgent.toLowerCase();
  // var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
  // if (isAndroid) {
  //   document.documentElement.requestFullscreen();
  // }
  // var contentDiv = document.getElementById("cardkiri");
  document.getElementById("listPorto").innerHTML = "";
  var divHome = document.getElementById("home");
  var divAbout = document.getElementById("about");
  var divPortfolio = document.getElementById("portfolio");
  var divContact = document.getElementById("contact");

  var navHome = document.getElementById("navHome");
  var navAbout = document.getElementById("navAbout");
  var navPortfolio = document.getElementById("navPortfolio");
  var navContact = document.getElementById("navContact");

  var fragmentId = location.hash.substring(1);
  switch (fragmentId) {
    case "home":
      navHome.classList.add("nav_active");
      navAbout.classList.remove("nav_active");
      navPortfolio.classList.remove("nav_active");
      navContact.classList.remove("nav_active");

      divHome.classList.add("load");
      divHome.classList.remove("outContent");
      divAbout.classList.add("outContent");
      divPortfolio.classList.add("outContent");
      divContact.classList.add("outContent");

      break;
    case "about":
      navHome.classList.remove("nav_active");
      navAbout.classList.add("nav_active");
      navPortfolio.classList.remove("nav_active");
      navContact.classList.remove("nav_active");

      divHome.classList.add("outContent");
      divAbout.classList.remove("outContent");
      divAbout.classList.add("load");
      divPortfolio.classList.add("outContent");
      divContact.classList.add("outContent");
      break;
    case "portfolio":
      navHome.classList.remove("nav_active");
      navAbout.classList.remove("nav_active");
      navPortfolio.classList.add("nav_active");
      navContact.classList.remove("nav_active");

      divHome.classList.add("outContent");
      divAbout.classList.add("outContent");
      divPortfolio.classList.remove("outContent");
      divPortfolio.classList.add("load");
      divContact.classList.add("outContent");
      cekPorto();
      break;
    case "contact":
      navHome.classList.remove("nav_active");
      navAbout.classList.remove("nav_active");
      navPortfolio.classList.remove("nav_active");
      navContact.classList.add("nav_active");

      divHome.classList.add("outContent");
      divAbout.classList.add("outContent");
      divPortfolio.classList.add("outContent");
      divContact.classList.remove("outContent");
      divContact.classList.add("load");
      break;
    default:
      navHome.classList.add("nav_active");
      navAbout.classList.remove("nav_active");
      navPortfolio.classList.remove("nav_active");
      navContact.classList.remove("nav_active");

      divHome.classList.add("load");
      divHome.classList.remove("outContent");
      divAbout.classList.add("outContent");
      divPortfolio.classList.add("outContent");
      divContact.classList.add("outContent");
      break;
  }
}
window.addEventListener("hashchange", () => {
  loadContent();
});
if (!location.hash) {
  location.hash = "#home";
}

loadContent();

function gantiGambar(pathImg, url) {
  var gambar = document.getElementById(pathImg + "gUtama");
  gambar.src = url;
}

async function cekPorto() {
  try {
    const res = await fetch("/gambar/project.json");
    const result = await res.json();
    // console.log(result);
    result.map((data) => {
      document.getElementById("listPorto").insertAdjacentHTML(
        "beforeend",
        `<div
          class="bg-gray-800 bg-opacity-80 shadow-xl p-3 rounded-xl cursor-pointer transition-all duration-300 hover:opacity-80 relative porto inline-block h-[70vh] w-[79vw] md:w-auto overflow-hidden"
          onclick="openModal('${data.url}','${data.type}','${data.glength}')"
        >
          <div class="h-[65vh] w-auto">
            <img
              src="${data.url}1.${data.type}"
              class="w-full h-full object-cover object-top rounded-md"
              alt="${data.url}"
            />
          </div>
          <div class="transition-all duration-300 rounded-b-xl p-2 porto_ket bg-black bg-opacity-80">
            <h1 class="font-bold text-md">
              ${data.judul}
              ${
                data.app !== "Android"
                  ? `<i class="fa-solid fa-earth-asia"></i>`
                  : `<i class="fa-solid fa-mobile"></i>`
              }
            </h1>
            <table>
              <tbody>
                <tr>
                  <td>Bahasa Pemrograman</td>
                  <td>:</td>
                  <td>${data.bahasa}</td>
                </tr>
                ${
                  data.framework !== undefined
                    ? `<tr>
                    <td>Framework</td>
                    <td>:</td>
                    <td>${data.framework}</td>
                  </tr>`
                    : ""
                }
                ${
                  data.frontend !== undefined
                    ? `<tr>
                    <td>Front-end</td>
                    <td>:</td>
                    <td>${data.frontend}</td>
                  </tr>`
                    : ""
                }
                ${
                  data.backend !== undefined
                    ? `<tr>
                    <td>Back-end</td>
                    <td>:</td>
                    <td>${data.backend}</td>
                  </tr>`
                    : ""
                }
                ${
                  data.db
                    ? `<tr>
                    <td>Database</td>
                    <td>:</td>
                    <td>${data.db}</td>
                  </tr>`
                    : `<tr>
                    <td>API</td>
                    <td>:</td>
                    <td>${data.api}</td>
                  </tr>`
                }
              </tbody>
            </table>
          </div>
        </div>`
      );
      document.getElementById("listPorto").insertAdjacentHTML(
        "beforeend",
        `<div
        id="${data.url}"
        class="fixed top-0 bottom-0 left-[-1] right-0 flex flex-col items-center justify-between max-h-screen invisible z-20"
      >
        <div
          class="absolute bg-black top-0 bottom-0 left-0 right-0 bg-opacity-50 z-0 cursor-pointer"
          onclick="closeModal('${data.url}')"
        ></div>
        <div
          class="flex-[0.85] flex items-center justify-between w-full text-white"
        >
          <button
            class="transition-all duration-300 hover:bg-slate-600 hover:bg-opacity-50 p-4 rounded-full z-10"
            onclick="arahGambar('${data.url}',-1,'${data.type}','${data.glength}')"
          >
            <i class="fa-solid fa-angle-left fa-3x"></i>
          </button>
          <img
            id="${data.url}gUtama"
            src="${data.url}1.${data.type}"
            class="transition-all duration-300 h-[80vh] rounded-md z-10 object-contain"
            alt="Img Utama"
            onclick="closeModal('${data.url}')"
          />
          <button
            class="transition-all duration-300 hover:bg-slate-600 hover:bg-opacity-50 p-4 rounded-full z-10"
            onclick="arahGambar('${data.url}',1,'${data.type}','${data.glength}')"
          >
            <i class="fa-solid fa-angle-right fa-3x"></i>
          </button>
        </div>
        <div
          id="${data.url}img_list"
          class="flex-[0.15] flex items-center space-x-1 p-2 z-10 scroll_on"
        ></div>
      </div>`
      );
    });
    // imgLength = result.length;
  } catch (e) {
    console.log(e);
  }
}

async function arahGambar(pathImg, num, type, imgLength) {
  var gambar = document.getElementById(pathImg + "gUtama");
  var nama = gambar.getAttribute("src");
  var setNum =
    parseInt(nama.slice(pathImg.length, pathImg.length + 2)) + parseInt(num);
  // console.log(setNum);
  // console.log();
  // var imgLength = 20;
  // try {
  //   const res = await fetch(pathImg + "list.json");
  //   const result = await res.json();
  //   imgLength = result.length;
  // } catch (e) {
  //   console.log(e);
  // }
  if (setNum > 0 && setNum <= imgLength) {
    fetch(pathImg + setNum + "." + type).then((res) => {
      if (res.status === 200) {
        gambar.src = pathImg + setNum + "." + type;
      } else {
        gambar.src = pathImg + setNum - 1 + "." + type;
      }
    });
  }
}

async function openModal(pathImg, type, imgLength) {
  document.getElementById(pathImg).classList.remove("outModal");
  document.getElementById(pathImg).classList.remove("invisible");
  document.getElementById(pathImg).classList.add("loadModal");
  if (imgLength < 8) {
    document
      .getElementById(pathImg + "img_list")
      .classList.add("md:justify-center");
  }

  for (let i = 1; i <= imgLength; i++) {
    document
      .getElementById(pathImg + "img_list")
      .insertAdjacentHTML(
        "beforeend",
        `<img src="${pathImg}${i}.${type}" class="h-[15vh] rounded-md transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer" alt="Img chooce" onclick="gantiGambar('${pathImg}','${pathImg}${i}.${type}','${imgLength}')"/>`
      );
  }
}

async function closeModal(pathImg) {
  document.getElementById(pathImg).classList.add("outModal");
  document.getElementById(pathImg).classList.add("invisible");
  document.getElementById(pathImg).classList.remove("loadModal");
  document.getElementById(pathImg + "img_list").innerHTML = "";
}
