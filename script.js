function time_to_seconds(time) {
    const [minute, rest] = time.split(":");
    const [seconds, miliseconds] = rest.split(".");
    const mininsec = Number(minute) * 60;
    const sec = Number(seconds);
    const msinsec = Number(miliseconds) / 1000;
    return mininsec + sec + msinsec;
}

function seconds_to_time(time) {
    const minutes = Math.trunc(time / 60);
    const seconds = Math.trunc(time - minutes * 60);
    const miliseconds = (time - (minutes * 60 + seconds)) * 1000 ;
    return (minutes + ":" + seconds + "." + miliseconds).slice(0,8);
}

function calc_diff(player, wr) {
    const diff = (time_to_seconds(player)) - (time_to_seconds(wr));
    const result =  String(diff).slice(0,5);
    return Number(result);
}

function ochi(diff) {
    const ochi = Math.ceil(diff);
    if (ochi <= 0)
        return 0;
    else return ochi;
}

function ochi_color(ochi) {
    if (ochi === 1) {
        return "#cf0110";
    } else if (ochi === 2) {
        return "#f4e41d";
    } else if (ochi === 3) {
        return "#78cf2f";
    } else if (ochi === 4) {
        return "#448fe2";
    } else if (ochi === 5) {
        return "#bd0ae2";
    } else return "#4d5057";
}


let menu = false;
const menuClick = document.getElementById("menu-btn");
const sidebar = document.getElementById("menu_sidebar");
const overlay = document.getElementById("overlay");


const submitClick = document.getElementById("menu_submit");
const listClick = document.getElementById("menu_list");
const statsClick = document.getElementById("menu_stats");
const deleteClick = document.getElementById("menu_delete");
const profileClick = document.getElementById("menu_profile");

function toggleMenu() {
    menu = !menu;
    if (menu === true) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
        menuClick.classList.add("active");
    } else {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
        menuClick.classList.remove("active");
    }
}

submitClick.addEventListener("click", toggleMenu);
listClick.addEventListener("click", toggleMenu);
statsClick.addEventListener("click", toggleMenu);
deleteClick.addEventListener("click", toggleMenu);
profileClick.addEventListener("click", toggleMenu);
menuClick.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

let mode = "home";


submitClick.addEventListener("click", () => {
    mode = "submit";
})
listClick.addEventListener("click", () => {
    mode = "list";
})
statsClick.addEventListener("click", () => {
    mode = "stats";
})
deleteClick.addEventListener("click", () => {
    mode = "delete";
})
profileClick.addEventListener("click", () => {
    mode = "profile";
})


const TRACK_DATA = {
  "マリオブラザーズサーキット": { "wr": "1:51.442", "url": "https://youtu.be/6oRjkiQrJQw?si=czI1UbYx3drI-klz" },
  "トロフィーシティ": { "wr": "2:09.499", "url": "https://youtu.be/C85D9PcMDrQ" },
  "シュポポコースター": { "wr": "1:47.085", "url": "https://youtu.be/lkrle9QGpwo" },
  "DKうちゅうセンター": { "wr": "1:34.769", "url": "https://drive.google.com/file/d/1S129tze-zRrmNgSI_VRH2Q8KQ_Emzapw/view?usp=share_link" },
  "サンサンさばく": { "wr": "1:35.776", "url": "https://youtu.be/ycaYNqWfqro" },
  "ヘイホーカーニバル": { "wr": "1:53.417", "url": "https://www.youtube.com/watch?v=Zn56fHW7CjI" },
  "ワリオスタジアム": { "wr": "2:05.659", "url": "https://youtu.be/aJzrplY3tI4" },
  "キラーシップ": { "wr": "1:57.518", "url": "https://youtu.be/JVRSthch5F0" },
  "DKスノーマウンテン": { "wr": "2:04.352", "url": "https://youtu.be/YZkL8i54Z_Y" },
  "ロゼッタてんもんだい": { "wr": "2:15.033", "url": "https://youtu.be/POImqFs5Gb4" },
  "アイスビルディング": { "wr": "1:55.656", "url": "https://drive.google.com/file/d/1HQ9e6Ylk7LoiOFiNgEMtG041iHhiuB3N/view?usp=drivesdk" },
  "ワリオシップ": { "wr": "2:21.340", "url": "https://youtu.be/5B6DOIlrRNw" },
  "ノコノコビーチ": { "wr": "1:32.538", "url": "https://youtu.be/cqJcVQcKYxs" },
  "リバーサイドサファリ": { "wr": "2:01.668", "url": "https://www.youtube.com/watch?v=x41Jr9305ss" },
  "ピーチスタジアム": { "wr": "2:20.367", "url": "https://www.youtube.com/watch?v=V-iS4mCIpOM" },
  "ピーチビーチ": { "wr": "1:45.009", "url": "https://youtu.be/PY6KNOhcN48" },
  "ソルティータウン": { "wr": "1:58.302", "url": "https://youtu.be/gLXAQeiQXhM?si=oG8aEcKZxCw4vVXB" },
  "ディノディノジャングル": { "wr": "1:49.849", "url": "https://youtu.be/0RnBSoQEHP4?si=MIcbxM2GoScFNHVu" },
  "ハテナしんでん": { "wr": "2:10.693", "url": "https://www.youtube.com/watch?v=XK9p-oBKAgA" },
  "プクプクフォールズ": { "wr": "1:58.584", "url": "https://youtu.be/MzmZVfbi_hw" },
  "ショーニューロード": { "wr": "2:24.240", "url": "https://youtu.be/MMhu4RlyBgQ?si=ZH0YfzUqYPP0BfyK" },
  "おばけシネマ": { "wr": "2:06.704", "url": "https://www.youtube.com/watch?v=LIOebbJ4N7U" },
  "ホネホネツイスター": { "wr": "2:08.168", "url": "https://www.youtube.com/watch?v=Q8RzbITzNUo" },
  "モーモーカントリー": { "wr": "1:58.825", "url": "https://m.youtube.com/@%E3%81%82%E3%81%8B%E3%81%A4%E3%81%8D-d5x/videos?view=0&sort=dd&shelf_id=2" },
  "チョコマウンテン": { "wr": "2:10.173", "url": "https://youtu.be/oHFyXIeKD7I?si=oZvteB3c_7nXJ12k" },
  "キノピオファクトリー": { "wr": "1:53.579", "url": "https://www.youtube.com/watch?v=lYGNB8l8TEs" },
  "クッパキャッスル": { "wr": "2:14.330", "url": "https://youtu.be/uhFNf1MZws8" },
  "どんぐりツリーハウス": { "wr": "1:58.973", "url": "https://youtu.be/XEkdEFe-5k8?si=LHy0Dgx8cmdOvN7A" },
  "マリオサーキット": { "wr": "1:06.950", "url": "https://youtu.be/1XuH9uM56Rs?si=GzqsDFo2Fj4wvyuv" },
  "レインボーロード": { "wr": "3:58.859", "url": "https://www.youtube.com/watch?v=y313k7wq7Gg" }
};

const SUPABASE_URL = "https://ktsthvumqxopnasqksbp.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0c3RodnVtcXhvcG5hc3Frc2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NzA5NzAsImV4cCI6MjA5MzU0Njk3MH0.o8zPxssojP8Fng1IdNElcv13MYkZWG_3JKdlOH8KF3s";

function getSupabase() {
    if (window._supabaseInstance) {
        return window._supabaseInstance;
    }
    if (window.supabase && typeof window.supabase.createClient === "function") {
        window._supabaseInstance = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        return window._supabaseInstance;
    }
    return null;
}

function applyOchiColors() {
    if (typeof ochi_color !== "function") return;
    for (let i = 1; i <= 6; i++) {
        const badge = document.querySelector(`.ochi_item[data-ochi="${i}"] .ochi_badge`);
        if (badge) {
            badge.style.backgroundColor = ochi_color(i);
        }
    }
}


async function fetchAndRenderDashboardStats(discordUserId) {
    const client = getSupabase();
    if (!client) return;

    const { data: records, error } = await client
        .from('nita_records')
        .select('*')
        .eq('user_id', discordUserId);

    if (error) {
        console.error("データ取得エラー:", error.message);
        return;
    }

    console.log("取得したユーザーデータ:", records);

    const ochiCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    if (records && records.length > 0) {
        records.forEach(record => {
            const trackInfo = TRACK_DATA[record.track];
            if (trackInfo && trackInfo.wr && record.time) {
                const diff = calc_diff(record.time, trackInfo.wr);
                const ochiNum = ochi(diff);

                if (ochiNum >= 6) {
                    ochiCounts[6]++;
                } else if (ochiNum >= 1) {
                    ochiCounts[ochiNum]++;
                }
            }
        });
    }

    for (let i = 1; i <= 6; i++) {
        const item = document.querySelector(`.ochi_item[data-ochi="${i}"] .ochi_value`);
        if (item) {
            item.textContent = `${ochiCounts[i]} コース`;
        }
    }
}

async function updateAuthUI(currentSession = null) {
    const client = getSupabase();
    if (!client || !client.auth) return;

    try {
        let session = currentSession;
        if (!session) {
            const { data } = await client.auth.getSession();
            session = data.session;
        }

        const logoutSection = document.getElementById("log_out");
        const dashboardSection = document.getElementById("user_dashboard");

        if (session) {
            if (logoutSection) logoutSection.style.display = "none";
            if (dashboardSection) dashboardSection.style.display = "block";

            const user = session.user;
            const username = user.user_metadata.full_name || user.user_metadata.name || user.user_metadata.custom_claims?.global_name || "ユーザー";
            const avatarUrl = user.user_metadata.avatar_url || "https://raw.githubusercontent.com/Kamanb85/NITAbot-Website/main/img/nita.png";

            const discordUserId = user.user_metadata.sub || user.user_metadata.provider_id || user.id;

            const nameEl = document.getElementById("user_name");
            const avatarEl = document.getElementById("user_avatar");

            if (nameEl) nameEl.textContent = `@${username}`;
            if (avatarEl) avatarEl.src = avatarUrl;

            applyOchiColors();

            fetchAndRenderDashboardStats(discordUserId);
        } else {
            if (logoutSection) logoutSection.style.display = "block";
            if (dashboardSection) dashboardSection.style.display = "none";
        }
    } catch (err) {
        console.error("UI更新エラー:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const client = getSupabase();

    if (client && client.auth) {
        client.auth.onAuthStateChange((event, session) => {
            updateAuthUI(session);
        });
        updateAuthUI();
    }

    const loginBtn = document.getElementById("login_btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const supabaseClient = getSupabase();
            if (!supabaseClient || !supabaseClient.auth) {
                alert("Supabase SDKの準備が整っていません。");
                return;
            }
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: "discord",
                options: {
                    redirectTo: window.location.href
                }
            });
            if (error) console.error("ログインエラー:", error.message);
        });
    }

    const logoutBtn = document.getElementById("logout_btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            const supabaseClient = getSupabase();
            if (supabaseClient && supabaseClient.auth) {
                await supabaseClient.auth.signOut();
            }
        });
    }

    const dashSubmitBtn = document.getElementById("dash_submit_btn");
    const dashListBtn = document.getElementById("dash_list_btn");

    if (dashSubmitBtn) {
        dashSubmitBtn.addEventListener("click", () => {
            mode = "submit";
            console.log("現在のモード:", mode);
        });
    }

    if (dashListBtn) {
        dashListBtn.addEventListener("click", () => {
            mode = "list";
            console.log("現在のモード:", mode);
        });
    }
});
