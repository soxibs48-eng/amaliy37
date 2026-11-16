/**
 * CLEANING-X — 37-Amaliy Ish
 * Interaktiv JavaScript moduli: Xonalar tekshiruvi va Onlayn narx kalkulyatori
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoomTabs();
  initQuoteCalculator();
});

// 1. Xonalar ko'rigi (Room Inspector Tabs)
const roomData = {
  bath: {
    title: "Hammom va Sanuzel Tozaligi",
    desc: "Kafel va plitkalarni chuqur dezinfeksiya qilish, kalsiy va suv dog'larini ketkazish, kranlarni yaltiratish.",
    img: "assets/room-bathroom.jpg",
    tasks: [
      "Vanna, dush kabinasi va rakovinalarni maxsus vositalar bilan tozalash",
      "Kafel choklarini mog'or va mikroblardan tozalash",
      "Oynalar va shisha yuzalarni izsiz artish",
      "Sanitariya moslamalarini to'liq antibakterial tozalash"
    ]
  },
  kitchen: {
    title: "Oshxona va Taom Tayyorlash Maydoni",
    desc: "Yog' dog'lari va kuygan izlarni bartaraf etish, plitalar, pechlar va muzlatkich tashqi qismini mukammal yuvish.",
    img: "assets/room-kitchen.jpg",
    tasks: [
      "Gaz yoki elektr plitasi, duxovka va mikroto'lqinli pechni tozalash",
      "Oshxona stollari va fartuk plitkalaridagi yog' qatlamini eritish",
      "Idish yuvish rakovinasi va musor zonasini dezinfeksiya qilish",
      "Pol va plintuslarni xushbo'y antibakterial vositalar bilan yuvish"
    ]
  },
  living: {
    title: "Mehmonxona va Umumiy Dam Olish Xonasi",
    desc: "Chang va allergenlarni 99.9% gacha yo'qotish, mebellarni kimyoviy tozalashga tayyorlash va oynalarni tozalash.",
    img: "assets/cleaner-work.jpg",
    tasks: [
      "Barcha qattiq mebel va javonlar changini tozalash",
      "Yumshoq mebellar va gilamlarni HEPA filtrli changyutgichda tozalash",
      "Eshik tutqichlari, rozetkalar va kalitlarni sterilizatsiya qilish",
      "Pardalar va dekorativ buyumlarni changdan tozalash"
    ]
  },
  bedroom: {
    title: "Yotoqxona va Tinchlik Hududi",
    desc: "Toza, sog'lom va kislorodga boy uyqu muhitini yaratish, to'shak osti va shkaflar orqasini changdan xoli qilish.",
    img: "assets/service-house.jpg",
    tasks: [
      "To'shaklar, matraslar va yostiqlar atrofini chuqur changyutish",
      "Shkaf javonlari va yoritgichlarni nam tozalash",
      "Pol qoplamalarini antiseptik vositalar bilan artish",
      "Xona havosini tozalash va tabiiy xushbo'ylantirish"
    ]
  }
};

function initRoomTabs() {
  const tabs = document.querySelectorAll('.room-tab');
  const titleEl = document.getElementById('roomTitle');
  const descEl = document.getElementById('roomDesc');
  const imgEl = document.getElementById('roomImg');
  const listEl = document.getElementById('roomChecklist');

  if (!tabs.length || !titleEl) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const roomKey = tab.getAttribute('data-room');
      const data = roomData[roomKey];
      if (!data) return;

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      imgEl.src = data.img;

      listEl.innerHTML = data.tasks.map(task => `
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>${task}</span>
        </li>
      `).join('');
    });
  });
}

// 2. Onlayn Narx Kalkulyatori
function initQuoteCalculator() {
  const serviceSelect = document.getElementById('calcService');
  const roomsSelect = document.getElementById('calcRooms');
  const priceDisplay = document.getElementById('calcPrice');
  const form = document.getElementById('cleaningQuoteForm');

  if (!serviceSelect || !roomsSelect || !priceDisplay) return;

  function recalculate() {
    const serviceType = serviceSelect.value;
    const rooms = parseInt(roomsSelect.value, 10);

    let baseRate = 45; // House
    if (serviceType === 'office') baseRate = 75;
    if (serviceType === 'industrial') baseRate = 120;

    const estimatedTotal = baseRate * rooms;
    priceDisplay.textContent = `$${estimatedTotal}.00`;
  }

  serviceSelect.addEventListener('change', recalculate);
  roomsSelect.addEventListener('change', recalculate);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value;
      const phone = form.querySelector('[name="phone"]').value;
      const price = priceDisplay.textContent;
      alert(`Rahmat, ${name}! So'rovingiz qabul qilindi. Taxminiy qiymat: ${price}. Menejerimiz ${phone} raqamiga 15 daqiqa ichida qo'ng'iroq qiladi!`);
      form.reset();
      recalculate();
    });
  }
}

