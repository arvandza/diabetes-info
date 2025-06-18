// public/js/reminder.js

const jadwal = [
    { jam: "06:00", title: "Makan Pagi", body: "Nasi 100gr, daging 40gr, tempe 25gr, sayur 100gr" },
    { jam: "09:00", title: "Snack Pagi", body: "Buah 1 porsi 200gr" },
    { jam: "12:00", title: "Makan Siang", body: "Nasi 140gr, daging 40gr, tempe 25gr, sayur 150gr, buah 100gr" },
    { jam: "15:00", title: "Snack Sore", body: "Buah 100gr" },
    { jam: "18:00", title: "Makan Malam", body: "Nasi 140gr, daging 25gr, tempe 50gr, sayur 100gr, buah 100gr" },
    { jam: "06:30", title: "Olahraga Pagi", body: "Jogging, Renang, Senam, Bersepeda" },
    { jam: "16:00", title: "Olahraga Sore", body: "Jogging, Jalan Santai, Senam" },
  ];
  
  function showNotification(title, body) {
    new Notification(title, {
      body,
      icon: "/images/bell.png" // ganti dengan ikon kamu
    });
  }
  
  function scheduleReminders() {
    setInterval(() => {
      const now = new Date();
      const jam = now.getHours().toString().padStart(2, "0");
      const menit = now.getMinutes().toString().padStart(2, "0");
      const current = `${jam}:${menit}`;
  
      const found = jadwal.find(j => j.jam === current);
      if (found) {
        showNotification(found.title, found.body);
      }
    }, 60000); // cek tiap menit
  }
  
  function initReminder() {
    if (!("Notification" in window)) return;
  
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        scheduleReminders();
      }
    });
  }
  
  window.addEventListener("load", initReminder);
  